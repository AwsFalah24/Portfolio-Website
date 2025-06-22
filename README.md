# Portfolio Website with Memory Game

This is Aws Falah's portfolio website featuring a React-based memory card game.

## Features

### Portfolio Website
- Responsive design with Bootstrap
- Sections: About, Work Process, Projects, Contact
- Modern UI with smooth animations

### Memory Game (React)
- **Level Selection**: Beginner, Intermediate, Advanced
- **Theme Options**: Numbers, Letters, Symbols
- **Accessibility**: High contrast mode
- **Game Features**:
  - 3x4, 4x4, or 4x5 card grids based on level
  - Progress tracking (pairs found)
  - Attempt counter
  - Real-time feedback
  - Timer and accuracy calculation
  - End game results screen

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the React Development Server**
   ```bash
   npm start
   ```

3. **Open the Game**
   - The React app will open at `http://localhost:3000`
   - Or navigate to `small-game.html` and click "Play Game"

### Building for Production

To create a production build:
```bash
npm run build
```

This will create a `build` folder with optimized files ready for deployment.

## Game Instructions

1. **Select Level**: Choose Beginner (6 pairs), Intermediate (8 pairs), or Advanced (10 pairs)
2. **Choose Theme**: Pick from Numbers, Letters, or Symbols
3. **Optional**: Enable High Contrast Mode for better accessibility
4. **Start Game**: Click "Start Game" to begin
5. **Play**: Click cards to reveal them and find matching pairs
6. **Complete**: Match all pairs to finish the game
7. **Review**: See your results including time, accuracy, and attempts

## File Structure

```
├── index.html              # Main portfolio page
├── small-game.html         # Game landing page
├── styles.css              # Portfolio styles
├── package.json            # React dependencies
├── public/
│   └── index.html          # React app HTML template
└── src/
    ├── index.js            # React app entry point
    ├── MemoryGame.js       # Main game component
    └── MemoryGame.css      # Game styles
```

## Technologies Used

- **Frontend**: React 18, HTML5, CSS3
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Bootstrap Icons, Font Awesome
- **Fonts**: Comic Sans MS, Times New Roman

## Browser Support

The game works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Accessibility Features

- High contrast mode for better visibility
- Large, clear buttons and text
- Keyboard navigation support
- Screen reader friendly
- Responsive design for mobile devices

## License

This project is part of Aws Falah's portfolio and is for demonstration purposes. 