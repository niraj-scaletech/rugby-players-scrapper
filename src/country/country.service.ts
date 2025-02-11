import { Injectable, Logger } from '@nestjs/common';
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

    const countries = await CountryScraper.scrapeCountries();

    await this.countryRepo.save(countries);
    this.logger.log(`Saved ${countries.length} countries.`);

    return countries;

  }

  async findAll() {
    return await this.countryRepo.find();
  }

}
