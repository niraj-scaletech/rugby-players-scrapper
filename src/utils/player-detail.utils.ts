
export class PlayerDetailScraper {
    static async scrapePlayerDetails(playerSlug: string, page: any): Promise<{ name: string; nationality: string; height: string; weight: string; age: number }> {
        try {
            await page.goto(`https://all.rugby/player/${playerSlug}`, { waitUntil: 'networkidle2' });

            const playerDetails = await page.evaluate(() => {
                const h1Element = document.querySelector('h1');
                const fullText = h1Element?.textContent?.trim() || '';

                const nameMatch = document.querySelector('p b')?.textContent?.trim();
                const name = nameMatch || '';

                const ageMatch = fullText.match(/(\d+)\s*years/);
                const age = ageMatch ? parseInt(ageMatch[1], 10) : 0;

                const nationalityImg = h1Element?.querySelector('img');
                const nationality = nationalityImg?.getAttribute('alt')?.replace(' Flag', '').trim() || '';

                const heightMatch = document.querySelector('p')?.innerText.match(/standing at ([\d.]+)\s*m/);
                const height = heightMatch ? heightMatch[1] : null;

                const weightMatch = document.querySelector('p')?.innerText.match(/weighing in at (\d+)\s*kg/);
                const weight = weightMatch ? weightMatch[1] : null;

                return { name, age, nationality, height, weight };
            });

            return playerDetails;
        } catch (error) {
            console.error(`Failed to scrape ${playerSlug}: ${error.message}`);
            return null;
        }
    }
}
