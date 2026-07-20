import * as cheerio from "cheerio";
import { Portal } from "./Portal";
import axios from "axios";

export class Trf4 extends Portal {
    constructor(url: string) {
        super(url);
    }

    getNewsLinks(html: string): (string | undefined)[] {
        const $ = cheerio.load(html);
        const length = $("ul#ulListaNoticiasPortal li a", html).length;
        const newsUrls = [];
        for (let i = 0; i < length; i++) {
        newsUrls.push('https://www.trf4.jus.br/trf4/' + $("ul#ulListaNoticiasPortal li a", html)[i]?.attribs.href);
        }
    
        return newsUrls;
    }

    getTitle($: cheerio.CheerioAPI): string {
        return $("div#divCorpoNoticia h2.Noticia").text().trim().toLowerCase();
    }

    getDescription($: cheerio.CheerioAPI): string {
        return '';
    }

    getContent($: cheerio.CheerioAPI): string {
        let content = "";
        $("div#divTextoNoticia p").each((i, el) => {
            content += " " + $(el).text().trim().toLowerCase();
        });
        return content;
    }

    async getPublishDate(url: string): Promise<string> {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const publishDate = $('div.DataNoticia').html()?.split((/<br\s*\/?>/i));
        return publishDate?.[0]?.trim().toLowerCase() ?? $('div.DataNoticia').text().trim().toLowerCase();;
    }

    logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void {
        console.log("------------------------------------------------------------");
        console.log(Trf4.name);
        console.log(' ');
        // console.log(i++ + ".");
        console.log(`INTERESTING NEWS FOUND, TITLE: ${title}`);
        console.log(`AVAILABLE IN: ${url}`);
        console.log(`CITIES MENTIONED: ${citiesMentioned.join(", ")}`);
        console.log(`PUBLISH DATE: ${publishDate}`);
        console.log("------------------------------------------------------------");
    }
    
}