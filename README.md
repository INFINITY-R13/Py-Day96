# NASA Space Explorer 🚀

A stunning, modern website built using NASA's Open APIs to explore the cosmos with real space data and imagery.

![NASA Space Explorer](https://img.shields.io/badge/NASA-API-blue?style=for-the-badge&logo=nasa)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

## ✨ Features

### 🌌 Astronomy Picture of the Day (APOD)
- View NASA's daily featured space image or video
- Detailed explanations and copyright information
- High-resolution imagery with smooth loading
- Support for both images and embedded videos

### 🔴 Mars Rover Gallery
- Browse real photos from 4 Mars rovers:
  - **Curiosity** (2012-Present)
  - **Perseverance** (2021-Present)
  - **Opportunity** (2004-2018)
  - **Spirit** (2004-2010)
- Random photo fetching from different Martian days (SOLs)
- Camera information and capture dates
- Click to view full-resolution images

### ☄️ Near Earth Objects (NEO)
- Real-time asteroid tracking for today
- Asteroid size, velocity, and distance data
- Hazard assessment indicators
- Live data from NASA's NEO database

### 🎨 Modern UI/UX
- Animated starfield background with 3 layers
- Smooth gradient effects and hover animations
- Custom space-themed fonts (Orbitron & Space Grotesk)
- Fully responsive design for all devices
- Glass-morphism cards with backdrop blur
- Interactive elements with visual feedback

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Advanced animations, gradients, and effects
- **Vanilla JavaScript** - ES6+, Fetch API, async/await
- **NASA Open APIs** - Real space data
- **Google Fonts** - Custom typography

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in any modern web browser
3. **Explore the cosmos!** All data loads automatically

```bash
# No installation required - just open the file!
open index.html
```

## 🔑 API Configuration

The site uses NASA's `DEMO_KEY` which has rate limits:
- **30 requests per hour** per IP address
- **50 requests per day** per IP address

### Get Your Own API Key (Free & Unlimited!)

1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Sign up for a free API key (takes 30 seconds)
3. Replace `DEMO_KEY` in `script.js`:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

## 📁 Project Structure

```
nasa-space-explorer/
│
├── index.html          # Main HTML structure with semantic markup
├── style.css           # Complete styling with animations
├── script.js           # API integration and interactivity
└── README.md           # Documentation (you are here!)
```

## 🌐 APIs Used

| API | Purpose | Endpoint |
|-----|---------|----------|
| **APOD** | Astronomy Picture of the Day | `/planetary/apod` |
| **Mars Rover Photos** | Real Mars imagery | `/mars-photos/api/v1/rovers` |
| **NEO Feed** | Near Earth Objects tracking | `/neo/rest/v1/feed` |

## 💡 How to Use

1. **APOD Section**: Loads automatically on page load
2. **Mars Rover Photos**: 
   - Select a rover from the dropdown
   - Click "Get Random Photos" to fetch new images
   - Click any photo to view full-size in a new tab
   - Hover over photos to see metadata
3. **NEO Section**: Displays today's near-Earth asteroids automatically

## 🎯 Key Features Explained

### Error Handling
- Graceful error messages with helpful suggestions
- Automatic retry for empty Mars photo results
- Console logging for debugging

### Performance
- Lazy loading for images
- Optimized API calls
- Smooth animations with CSS transforms
- Minimal JavaScript footprint

### Accessibility
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- High contrast text

## 🔮 Future Enhancements

- [ ] Date picker for historical APOD images
- [ ] Favorites/bookmarking system with localStorage
- [ ] More rover camera filters
- [ ] Earth imagery from NASA's EPIC API
- [ ] International Space Station location tracker
- [ ] Search functionality for Mars photos
- [ ] Dark/light theme toggle
- [ ] Share buttons for social media

## 🐛 Troubleshooting

**Issue**: "Failed to load" errors
- **Solution**: Check internet connection or try refreshing the page

**Issue**: Rate limit exceeded
- **Solution**: Get your own free API key from NASA

**Issue**: No Mars photos loading
- **Solution**: The script automatically retries with different dates

## 📝 License

This project uses public NASA APIs and imagery. All NASA content is in the public domain unless otherwise noted.

## 🙏 Credits

- **Data**: NASA Open APIs
- **Fonts**: Google Fonts (Orbitron, Space Grotesk)
- **Built for**: Day 96 - Python Challenge (Custom Website with API Integration)

## 🔗 Useful Links

- [NASA API Documentation](https://api.nasa.gov/)
- [Mars Rover Photos API](https://github.com/chrisccerami/mars-photo-api)
- [NASA Image and Video Library](https://images.nasa.gov/)

---

**Made with ❤️ and curiosity about the universe**

*"The cosmos is within us. We are made of star-stuff." - Carl Sagan*
