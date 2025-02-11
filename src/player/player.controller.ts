import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PlayerService } from './player.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('player')
@ApiTags('Player Module')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @ApiOperation({ summary: 'Scrap all country players' })
  @ApiOkResponse({
    description: 'Success',
  })
  @Get()
  async scrapeAllPlayers() {
    return await this.playerService.scrapeAllPlayers();
  }

  @ApiOperation({ summary: 'Scrap players by countrySlug' })
  @ApiOkResponse({ description: 'Success' })
  @ApiParam({
    name: 'countrySlug',
    description: 'countrySlug',
    type: 'string',
    required: true,
  })
  @Get(':countrySlug')
  async scrapePlayersByCountry(@Param('countrySlug') countrySlug: string) {
    return await this.playerService.scrapePlayersByCountry(countrySlug);
  }

  @ApiOperation({ summary: 'Scrap players details by playerSlug' })
  @ApiOkResponse({ description: 'Success' })
  @ApiParam({
    name: 'playerSlug',
    description: 'playerSlug',
    type: 'string',
    required: true,
  })
  @Get('details/:playerSlug')
  async scrapePlayerDetails(@Param('playerSlug') playerSlug: string) {
    return this.playerService.scrapeAndSavePlayerDetails(playerSlug);
  }

}
