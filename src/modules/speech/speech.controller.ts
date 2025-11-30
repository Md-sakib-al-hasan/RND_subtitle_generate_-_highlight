import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SpeechService } from './speech.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('speech')
export class SpeechController {
  constructor(private speechService: SpeechService) {}

  @Post('upload')
@UseInterceptors(
  FileInterceptor('audio', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const name = Date.now();
        cb(null, `${name}${extname(file.originalname)}`);
      },
    }),
  }),
)
async upload(@UploadedFile() file: Express.Multer.File) {
  console.log('hite controller where')

  const subtitles = await this.speechService.generateSubtitles(file.path);
   console.log('--------------------------------------------------------------------');                                          

  return {
    audioUrl: `http://localhost:3001/${file.path}`, // ex: uploads/1234.webm
    subtitles,
  };
}

}
