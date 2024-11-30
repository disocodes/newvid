# VidcomOrb Vision AI Dashboard

VidcomOrb is a comprehensive Vision AI Dashboard that allows you to build and customize vision processing workflows using a drag-and-drop interface.

## Features

- Drag-and-drop widget builder
- Live camera feed support (webcam and IP cameras)
- Vision AI model integration (OpenCV, YOLO, TensorFlow)
- Real-time video processing
- Customizable workflow configuration
- Docker containerization

## Prerequisites

- Node.js 18+
- Docker
- FFmpeg

## Installation

1. Clone the repository:
```bash
git clone https://github.com/disocodes/VidcomOrb.git
cd VidcomOrb
```

2. Install dependencies:
```bash
npm install
```

3. Build and run with Docker:
```bash
docker build -t vidcomorb .
docker run -p 3000:3000 -p 80:80 vidcomorb
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Access the application:
- Frontend: http://localhost
- Backend: http://localhost:3000

## Project Structure

```
VidcomOrb/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── nodes/         # Vision processing nodes
│   │   ├── modals/        # Modal components
│   │   └── WidgetBuilder/ # Workflow builder components
│   └── main.tsx           # Application entry point
├── server/                 # Backend server
│   ├── services/          # Backend services
│   └── index.ts           # Server entry point
├── public/                 # Static assets
└── docker/                # Docker configuration
```

## Camera Support

The application supports two types of camera inputs:
1. Webcam - Access local camera devices
2. IP Camera - Connect to RTSP/HTTP streams

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - See LICENSE file for details

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/disocodes/VidcomOrb)