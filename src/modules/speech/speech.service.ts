import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';

@Injectable()
export class SpeechService {




  generateSubtitles(filepath: string) {
    console.log("hite where")
   
     const data =  new Promise((resolve, reject) => {

      // Convert to absolute path
      const absolutePath = join(process.cwd(), filepath);

      const py = spawn('python3', ['whisper_script.py', absolutePath]);
   
      let data = '';
      let error = '';

      py.stdout.on('data', (chunk) => (data += chunk));
      py.stderr.on('data', (chunk) => (error += chunk));

      py.on('close', () => {
        if (error) {
          console.log('Whisper error:', error);
          console.log("---------error--------")
          return reject(error);
        }

        if (!data.trim()) {
          console.log('Empty output from whisper');
          console.log("---------no data--------")
          return resolve([]);
        }

        try {
          console.log('Whisper output:', data);
          resolve(JSON.parse(data));
        } catch (e) {
          console.log('Invalid JSON from Whisper:', data);
          resolve([]);
        }
      });
    });
    return data
  }
}
