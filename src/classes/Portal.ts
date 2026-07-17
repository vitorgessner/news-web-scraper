import * as cheerio from 'cheerio';
import axios from 'axios';
import { INTERESTING_CITIES } from '../INTERESTING_CITIES';

export abstract class Portal {
    constructor(private url: string) {}

    verifyUrls = async (): Promise<void> => {
      if (!this.url.startsWith("http")) {
        throw new Error("Invalid url");
      }
    
      const { data: html } = await axios.get(this.url);
      const $ = cheerio.load(html);
      const newsUrls = this.getNewsLinks(html);
    
      newsUrls.forEach((url) => this.parseNews(url));
    }

    abstract getNewsLinks(html: string): (string | undefined)[]
  
    private parseNews = async (url: string | undefined): Promise<void> => {
      if (!url) {
        return;
      }

      const { data: html } = await axios.get(url);
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

    abstract getTitle($: cheerio.CheerioAPI): string;
    abstract getDescription($: cheerio.CheerioAPI): string;
    abstract getContent($: cheerio.CheerioAPI): string;
  
    private checkIfTitleIsInteresting = async (title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(title)) {
        const citiesMentioned = this.getMentionedCities(title);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
    
      return false;
    }
    
    private checkIfDescriptionIsInteresting = async (description: string, title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(description)) {
        const citiesMentioned = this.getMentionedCities(description);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
      return false;
    }
    
    private checkIfContentIsInteresting = async (content: string, title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(content)) {
        const citiesMentioned = this.getMentionedCities(content);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
      return false;
    }
    
    private isInteresting = (searchable: string): boolean => {
      const isInterestingArray = this.lookForCitiesOnSearchable(searchable);
    
      return isInterestingArray.some((isInteresting) => isInteresting === true);
    }
    
    private getMentionedCities = (searchable: string): (string | undefined)[] => {
        const isInterestingArray = this.lookForCitiesOnSearchable(searchable);
    
      return isInterestingArray
        .map((isInteresting, i) => {
          if (isInteresting === true) {
            return INTERESTING_CITIES[i];
          }
          return undefined;
        })
        .filter((city) => city);
    }
    
    private lookForCitiesOnSearchable = (searchable: string): boolean[] => {
        return INTERESTING_CITIES.map((city) =>
            searchable.includes(city),
          );
    }

    abstract getPublishDate(url: string): Promise<string>;

    abstract logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void;
  }