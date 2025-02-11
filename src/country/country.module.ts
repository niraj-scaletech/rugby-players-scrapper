import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryRepo } from 'src/repo';

@Module({
  controllers: [CountryController],
  providers: [CountryService, CountryRepo],
})
export class CountryModule {}
