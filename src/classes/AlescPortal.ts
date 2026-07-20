// import * as cheerio from "cheerio";
// import { Portal } from "./Portal";
// import axios from "axios";

// export class Alesc extends Portal {
//     constructor(url: string) {
//         super(url);
//     }

//     getNewsLinks(html: string): (string | undefined)[] {
//         const $ = cheerio.load(html);
//         const length = $("article.lab-card-blog a", html).length;
//         console.log($('main div#ajax-load-more', html).html());
//         const newsUrls = [];
//         for (let i = 0; i < length; i++) {
//         newsUrls.push($("article.lab-card-blog a", html)[i]?.attribs.href);
//         }
    
//         return newsUrls;
//     }

//     getTitle($: cheerio.CheerioAPI): string {
//         return $("h1.lab-title-big span").text().trim().toLowerCase();
//     }

//     getDescription($: cheerio.CheerioAPI): string {
//         return '';
//     }

//     getContent($: cheerio.CheerioAPI): string {
//         let content = "";
//         $("div.blog-content p").each((i, el) => {
//             content += " " + $(el).text().trim().toLowerCase();
//         });
//         return content;
//     }

//     async getPublishDate(url: string): Promise<string> {
//         const { data: html } = await axios.get(url);
//         const $ = cheerio.load(html);
//         const publishDate = $('div.row.gx-2 div.col p.lab-text-red i').text().trim().toLowerCase();
//         return publishDate
//     }

//     logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void {
//         console.log("------------------------------------------------------------");
//         console.log(Alesc.name);
//         console.log(' ');
//         // console.log(i++ + ".");
//         console.log(`INTERESTING NEWS FOUND, TITLE: ${title}`);
//         console.log(`AVAILABLE IN: ${url}`);
//         console.log(`CITIES MENTIONED: ${citiesMentioned.join(", ")}`);
//         console.log(`PUBLISH DATE: ${publishDate}`);
//         console.log("------------------------------------------------------------");
//     }
    
// }