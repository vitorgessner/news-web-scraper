import * as cheerio from "cheerio";
import { Portal } from "./Portal";
import axios from "axios";

export class PoliciaFederalPortal extends Portal {
    constructor(url: string) {
        super(url);
    }

    getNewsLinks(html: string): (string | undefined)[] {
        const $ = cheerio.load(html);
        const length = $(".tileHeadline > a", html).length;
        const newsUrls = [];
        for (let i = 0; i < length; i++) {
        newsUrls.push($(".tileHeadline > a", html)[i]?.attribs.href);
        }
    
        return newsUrls;
    }

    getTitle($: cheerio.CheerioAPI): string {
        return $("h1.documentFirstHeading").text().trim().toLowerCase();
    }

    getDescription($: cheerio.CheerioAPI): string {
        return $("div.documentDescription").text().trim().toLowerCase();
    }

    getContent($: cheerio.CheerioAPI): string {
        let content = "";
        $("div#content-core p").each((i, el) => {
            content += " " + $(el).text().trim().toLowerCase();
        });
        return content;
    }

    async getPublishDate(url: string): Promise<string> {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const publishDate = $('span.documentPublished span.value').text().trim().toLowerCase();
        return publishDate;
    }

    logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void {
        console.log("------------------------------------------------------------");
        console.log(PoliciaFederalPortal.name);
        console.log(' ');
        // console.log(i++ + ".");
        console.log(`INTERESTING NEWS FOUND, TITLE: ${title}`);
        console.log(`AVAILABLE IN: ${url}`);
        console.log(`CITIES MENTIONED: ${citiesMentioned.join(", ")}`);
        console.log(`PUBLISH DATE: ${publishDate}`);
        console.log("------------------------------------------------------------");
    }
    
}