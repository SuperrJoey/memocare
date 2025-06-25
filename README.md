# MemoCare

A compassionate memory tracking application designed to help individuals manage their memories and daily information with the support of caregivers and family members.

## Features

- **Smart Memory Management**: Store and organize memories by type (relationships, medications, appointments, locations)
- **Intelligent Search**: Query your memories using natural language
- **Voice Support**: Speak to add memories and get responses
- **Caregiver Mode**: Family members and caregivers can help manage memories
- **Accessibility Features**: High contrast mode, adjustable font sizes
- **Quick Prompts**: Pre-built helpful questions and reminders
- **Privacy First**: All data is stored locally on your device

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd memocare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx  # Welcome screen
│   ├── MemoryInput.tsx  # Add new memories
│   ├── MemoryList.tsx   # Display memories
│   ├── QueryInterface.tsx # Search interface
│   ├── QuickPrompts.tsx # Helpful prompts
│   ├── Settings.tsx     # App settings
│   └── VoiceButton.tsx  # Voice input
├── hooks/               # Custom React hooks
│   ├── useMemoryStorage.ts # Memory management
│   └── useVoice.ts      # Voice recognition
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

## Usage

### Adding Memories
- Use the "Add Memory" tab to store new information
- Choose from different memory types: relationships, medications, appointments, locations, or general notes
- Voice input is available for hands-free operation

### Searching Memories
- Use natural language queries to find information
- The search interface provides confidence scores and related memories

### Settings
- Adjust font size for better readability
- Enable high contrast mode for visual accessibility
- Toggle voice features on/off
- Switch to caregiver mode for assisted memory management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
