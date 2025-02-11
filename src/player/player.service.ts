import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PlayerDetailScraper, PlayerScraper, PuppeteerUtils } from '../utils';
import { PlayerRepo, CountryRepo } from '../repo';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    private readonly playerRepo: PlayerRepo,
    private readonly countryRepo: CountryRepo,
  ) { }

  async scrapeAllPlayers() {
    const countries = await this.countryRepo.find();

    for (const country of countries) {
      this.logger.log(`Scraping players for ${country.name}...`);

      try {
        const scrapedPlayers = await PlayerScraper.scrapePlayersByCountry(country.slug);
        const existingPlayers = await this.playerRepo.find({
          where: { country },
          select: ['slug']
        });

        const existingSlugs = new Set(existingPlayers.map(player => player.slug));

        const newPlayers = scrapedPlayers.filter(player => !existingSlugs.has(player.slug))
          .map(player => ({
            name: player.name,
            slug: player.slug,
            country: country
          }));

        if (newPlayers.length > 0) {
          await this.playerRepo
            .createQueryBuilder()
            .insert()
            .into('players')
            .values(newPlayers)
            .orIgnore()
            .execute();

          this.logger.log(`Added ${newPlayers.length} new players for ${country.name}`);
        } else {
          this.logger.log(`No new players for ${country.name}`);
        }
      } catch (error) {
        this.logger.error(`Failed to scrape players for ${country.name}: ${error.message}`);
        throw new InternalServerErrorException(error)
      }
    }
  }

  async scrapePlayersByCountry(countrySlug: string) {
    this.logger.log(`Scraping players for ${countrySlug}...`);

    try {
      const country = await this.countryRepo.findOne({ where: { slug: countrySlug } });
      if (!country) {
        this.logger.warn(`Country with slug '${countrySlug}' not found.`);
        throw new NotFoundException(`Country with slug '${countrySlug}' not found.`);
      }

      const scrapedPlayers = await PlayerScraper.scrapePlayersByCountry(countrySlug);
      const existingPlayers = await this.playerRepo.find({
        where: { country },
        select: ['slug']
      });

      const existingSlugs = new Set(existingPlayers.map(player => player.slug));

      const newPlayers = scrapedPlayers.filter(player => !existingSlugs.has(player.slug))
        .map(player => ({
          name: player.name,
          slug: player.slug,
          country: country
        }));

      if (newPlayers.length > 0) {
        await this.playerRepo
          .createQueryBuilder()
          .insert()
          .into('players')
          .values(newPlayers)
          .orIgnore()
          .execute();

        this.logger.log(`Added ${newPlayers.length} new players for ${country.name}`);
      } else {
        this.logger.log(`No new players for ${country.name}`);
      }
    } catch (error) {
      this.logger.error(`Failed to scrape players for ${countrySlug}: ${error.message}`);
      throw new InternalServerErrorException(error)
    }
  }

  async scrapeAndSavePlayerDetails(playerSlug: string) {
    this.logger.log(`Scraping details for player: ${playerSlug}`);

    try {
      const browser = await PuppeteerUtils.launchBrowser();
      const page = await PuppeteerUtils.createPage(browser);

      const playerDetails = await PlayerDetailScraper.scrapePlayerDetails(playerSlug, page);
      await browser.close();

      if (!playerDetails) {
        this.logger.warn(`No details found for player: ${playerSlug}`);
        return;
      }

      await this.playerRepo.update({ slug: playerSlug }, playerDetails);
      this.logger.log(`Updated details for player: ${playerSlug}`);
    } catch (error) {
      this.logger.error(`Failed to scrape details for player ${playerSlug}: ${error.message}`);
      throw new InternalServerErrorException(error)
    }
  }

}
