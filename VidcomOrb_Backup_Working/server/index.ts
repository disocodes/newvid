import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';
import { CameraService } from './services/cameraService.js';

const app = express();
app.use(cors());

// Stream endpoint for network cameras
app.get('/api/camera/stream', async (req, res) => {
  const { url } = req.query;
  
  if (!url || typeof url !== 'string') {
    return res.status(400).send('URL parameter is required');
  }

  try {
    // Set response headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Use ffmpeg to handle the stream
    const ffmpegCommand = ffmpeg(url)
      .format('mp4')
      .videoCodec('libx264')
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        if (!res.headersSent) {
          res.status(500).send('Stream error');
        }
      });

    // Pipe the stream to response
    ffmpegCommand.pipe(res, { end: true });

    // Handle client disconnect
    req.on('close', () => {
      ffmpegCommand.kill('SIGKILL');
    });
  } catch (error) {
    console.error('Stream error:', error);
    if (!res.headersSent) {
      res.status(500).send('Failed to start stream');
    }
  }
});

// Camera stream endpoint
app.get('/api/stream', (req, res) => {
  const url = req.query.url as string;
  
  if (!url) {
    res.status(400).json({ error: 'URL parameter is required' });
    return;
  }

  try {
    const cameraService = CameraService.getInstance();
    cameraService.streamCamera(url, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start stream' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
