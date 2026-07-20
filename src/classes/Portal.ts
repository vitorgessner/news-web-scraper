import * as cheerio from 'cheerio';
import axios from 'axios';
import { citiesRegex, INTERESTING_CITIES } from '../INTERESTING_CITIES';

export abstract class Portal {
    private readonly citiesGlobalRegex = new RegExp(`\\b(${INTERESTING_CITIES.join('|')})\\b`, 'gi');
    constructor(protected url: string) {}

    verifyUrls = async (): Promise<void> => {
      if (!this.url.startsWith("http")) {
        throw new Error("Invalid url");
      }
    
        const { data: html } = await axios.get(this.url, { 
          insecureHTTPParser: true,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        const newsUrls = this.getNewsLinks(html);
        newsUrls.forEach((url) => this.parseNews(url));
    }

    abstract getNewsLinks(html: string): (string | undefined)[]
  
    protected parseNews = async (url: string | undefined): Promise<void> => {
      if (!url) {
        return;
      }

      const { data: html } = await axios.get(url, {
        insecureHTTPParser: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
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
  
    protected checkIfTitleIsInteresting = async (title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(title)) {
        const citiesMentioned = this.getMentionedCities(title);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
    
      return false;
    }
    
    protected checkIfDescriptionIsInteresting = async (description: string, title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(description)) {
        const citiesMentioned = this.getMentionedCities(description);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
      return false;
    }
    
    protected checkIfContentIsInteresting = async (content: string, title: string, url: string): Promise<boolean> => {
      if (this.isInteresting(content)) {
        const citiesMentioned = this.getMentionedCities(content);
        const publishDate = await this.getPublishDate(url);
    
        this.logNews(title, url, citiesMentioned, publishDate);
        return true;
      }
      return false;
    }
    
    private isInteresting = (searchable: string): boolean => {
      return citiesRegex.test(searchable);
    }
    
    private getMentionedCities = (searchable: string): (string | undefined)[] => {
        const matches = searchable.match(this.citiesGlobalRegex);

        return matches ? Array.from(new Set(matches)) : [];
    }

    abstract getPublishDate(url: string): Promise<string>;

    abstract logNews(title: string, url: string, citiesMentioned: (string | undefined)[], publishDate: string): void;
  }