import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { CountryRepo, PlayerRepo } from '../repo';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PlayerRepo, CountryRepo],
})
export class PlayerModule { }
