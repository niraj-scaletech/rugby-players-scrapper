import { PuppeteerUtils } from './puppeteer.utils';

export class PlayerScraper {
    static async scrapePlayersByCountry(countrySlug: string): Promise<{ name: string; slug: string }[]> {
        const browser = await PuppeteerUtils.launchBrowser();
        const page = await PuppeteerUtils.createPage(browser);

        await page.goto(`https://all.rugby/players/${countrySlug}`, { waitUntil: 'domcontentloaded' });

        const players = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.grid-4.has-gutter .bloc.jou a')).map((el) => {
                const lastName = el.querySelector('b')?.textContent?.trim() || '';
                const firstName = el.childNodes[2]?.textContent?.trim() || '';
                const slug = el.getAttribute('href')?.replace('/player/', '') || '';

                return {
                    name: `${firstName} ${lastName}`.trim(),
                    slug,
                };

            });
        });

        await browser.close();
        return players;
    }
}
