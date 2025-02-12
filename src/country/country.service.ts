import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CountryScraper } from '../utils'
import { CountryRepo } from 'src/repo';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(
    private readonly countryRepo: CountryRepo,
  ) { }

  async scrapeAndCreate() {
    this.logger.log('Scraping countries...');

    try {
      const countries = await CountryScraper.scrapeCountries();

      if (countries.length === 0) {
        this.logger.warn('No countries scraped.');
        return [];
      }

      await this.countryRepo
        .createQueryBuilder()
        .insert()
        .into('country')
        .values(countries)
        .orIgnore()
        .execute();

      this.logger.log(`Saved or ignored ${countries.length} countries.`);
      return countries;
    } catch (error) {
      this.logger.error(`Failed to scrape and save countries: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    this.logger.log('Fetching all countries...');
    try {
      const countries = await this.countryRepo.find();
      this.logger.log(`Fetched ${countries.length} countries.`);

      return countries;
    } catch (error) {
      this.logger.error(`Failed to fetch countries: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }

}
