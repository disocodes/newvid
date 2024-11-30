import ffmpeg from 'fluent-ffmpeg';
import { Response } from 'express';

export class CameraService {
  private static instance: CameraService;

  private constructor() {}

  public static getInstance(): CameraService {
    if (!CameraService.instance) {
      CameraService.instance = new CameraService();
    }
    return CameraService.instance;
  }

  public streamCamera(url: string, res: Response): void {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = ffmpeg(url)
      .inputOptions([
        '-re',
        '-rtsp_transport tcp',
        '-stimeout 5000000'
      ])
      .outputOptions([
        '-f mp4',
        '-movflags frag_keyframe+empty_moov+default_base_moof',
        '-vcodec libx264',
        '-preset ultrafast',
        '-tune zerolatency',
        '-profile:v baseline',
        '-level 3.0',
        '-pix_fmt yuv420p',
        '-r 30'
      ])
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        res.end();
      });

    stream.pipe(res, { end: true });

    res.on('close', () => {
      stream.kill('SIGKILL');
    });
  }
}
