import puppeteer, { Browser, Page } from 'puppeteer';

export class PuppeteerUtils {
    static async launchBrowser(): Promise<Browser> {
        return await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: '/usr/bin/google-chrome-stable',
            headless: true,
        });
    }

    static async createPage(browser: Browser): Promise<Page> {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
        return page;
    }
}
