import axios from "axios";
import { Portal } from "./Portal";
import * as cheerio from "cheerio";
import { execSync } from "child_process";

export class SantaCatarina extends Portal {
  constructor(url: string) {
    super(url);
  }

  verifyUrls = async (): Promise<void> => {
    if (!this.url.startsWith("http")) {
      throw new Error("Invalid url");
    }

    const html = execSync(`curl -L -s "${this.url}"`, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });
    const newsUrls = this.getNewsLinks(html);
    newsUrls.forEach((url) => this.parseNews(url));
  }

  protected parseNews = async (url: string | undefined): Promise<void> => {
    if (!url) {
            return;
          }
    
          const html = execSync(`curl -L -s "${url}"`, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });

          const $ = cheerio.load(html);
        
          const title = this.getTitle($);
        
          if (await this.checkIfTitleIsInteresting(title, url)) {
            return;
          }
        
          if (await this.checkIfDescriptionIsInteresting(this.getDescription($), title, url)) {
            return;
          }
        
          if (await this.checkIfContentIsInteresting(this.getContent($), title, url)) {
            return;
          }
  }

  getNewsLinks(html: string): (string | undefined)[] {
    const $ = cheerio.load(html);
    const length = $("h3.upk-title a", html).length;
    const newsUrls = [];
    for (let i = 0; i < length; i++) {
      newsUrls.push($("h3.upk-title a", html)[i]?.attribs.href);
    }

    return newsUrls;
  }

  getTitle($: cheerio.CheerioAPI): string {
    return $("h1.elementor-heading-title").text().trim().toLowerCase();
  }

  getDescription($: cheerio.CheerioAPI): string {
    let description = "";
    $("p.wp-block-paragraph em").each((i, el) => {
      description += " " + $(el).text().trim().toLowerCase();
    });
    return description;
  }

  getContent($: cheerio.CheerioAPI): string {
    let content = "";
    $("p.wp-block-paragraph").each((i, el) => {
      content += " " + $(el).text().trim().toLowerCase();
    });
    return content;
  }

  async getPublishDate(url: string): Promise<string> {
    const html = execSync(`curl -L -s "${url}"`, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 });

    const $ = cheerio.load(html);
    const publishDate =
      $("span.elementor-icon-list-text time").text().trim().toLowerCase() +
      " " +
      $("");
    return publishDate;
  }

  logNews(
    title: string,
    url: string,
    citiesMentioned: (string | undefined)[],
    publishDate: string,
  ): void {
    console.log("------------------------------------------------------------");
    console.log(SantaCatarina.name);
    console.log(" ");
    // console.log(i++ + ".");
    console.log(`INTERESTING NEWS FOUND, TITLE: ${title}`);
    console.log(`AVAILABLE IN: ${url}`);
    console.log(`CITIES MENTIONED: ${citiesMentioned.join(", ")}`);
    console.log(`PUBLISH DATE: ${publishDate}`);
    console.log("------------------------------------------------------------");
  }
}
