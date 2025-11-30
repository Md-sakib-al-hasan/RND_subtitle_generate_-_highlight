import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechModule } from './modules/speech/speech.module';

@Module({
  imports: [
    SpeechModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
