import { PuppeteerUtils } from './puppeteer.utils';

export class CountryScraper {
    static async scrapeCountries(): Promise<{ name: string; slug: string; }[]> {
        const browser = await PuppeteerUtils.launchBrowser();
        const page = await PuppeteerUtils.createPage(browser);

        await page.goto('https://all.rugby/players/', { waitUntil: 'domcontentloaded' });

        const countries = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.grid-4.has-gutter .bloc.dra a')).map((el) => {
                const name = el.textContent?.trim() || '';
                const slug = el.getAttribute('href')?.replace('/players/', '').replace('/', '') || '';
                return { name, slug };
            });
        });

        await browser.close();
        return countries;
    }
}
