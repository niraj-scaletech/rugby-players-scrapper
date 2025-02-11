import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('country')
@ApiTags('Country Module')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }

  @ApiOperation({ summary: 'Scrap all country data' })
  @ApiOkResponse({
    description: 'Success',
  })
  @Post()
  public async scrapeAndCreate() {
    return this.countryService.scrapeAndCreate();
  }

  @ApiOperation({ summary: 'Get country data' })
  @ApiOkResponse({
    description: 'Success',
  })
  @Get()
  public async findAll() {
    return await this.countryService.findAll();
  }
}
