import axios from "axios";
import { Portal } from "./Portal";
import * as cheerio from "cheerio";

export class BombeiroMilitarPortal extends Portal {
    constructor(url: string) {
        super(url);
    }

    getNewsLinks(html: string): (string | undefined)[] {
            const $ = cheerio.load(html);
            const length = $("h2.eb-post-title > a", html).length;
            const newsUrls = [];
            for (let i = 0; i < length; i++) {
            newsUrls.push('https://portal.cbm.sc.gov.br' +  $("h2.eb-post-title > a", html)[i]?.attribs.href);
            }
        
            return newsUrls;
        }
    
        getTitle($: cheerio.CheerioAPI): string {
            return $("h1.eb-entry-title").text().trim().toLowerCase();
        }
    
        getDescription($: cheerio.CheerioAPI): string {
            let description = "";
            $("div.ebd-block p em").each((i, el) => {
                description += " " + $(el).text().trim().toLowerCase();
            });
            return description;
        }
    
        getContent($: cheerio.CheerioAPI): string {
            let content = "";
            $("div.ebd-block p").each((i, el) => {
                content += " " + $(el).text().trim().toLowerCase();
            });
            return content;
        }
    
        async getPublishDate(url: string): Promise<string> {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const publishDate = $('div.eb-post-date time.eb-meta-date').text().trim().toLowerCase();
            return publishDate;
        }
    
        logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void {
            console.log("------------------------------------------------------------");
            console.log(BombeiroMilitarPortal.name);
            console.log(' ');
            // console.log(i++ + ".");
            console.log(`INTERESTING NEWS FOUND, TITLE: ${title}`);
            console.log(`AVAILABLE IN: ${url}`);
            console.log(`CITIES MENTIONED: ${citiesMentioned.join(", ")}`);
            console.log(`PUBLISH DATE: ${publishDate}`);
            console.log("------------------------------------------------------------");
        }
}