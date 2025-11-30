import { Module } from '@nestjs/common';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';

@Module({
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
