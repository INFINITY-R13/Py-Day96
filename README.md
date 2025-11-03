# NASA Space Explorer 🚀

A custom website built using NASA's Open APIs to explore space imagery and data.

## Features

- **Astronomy Picture of the Day (APOD)**: View NASA's daily featured space image with detailed explanations
- **Mars Rover Photos**: Browse real photos taken by NASA's Mars rovers (Curiosity, Opportunity, Spirit)
- Beautiful space-themed UI with gradient effects and smooth animations
- Responsive design that works on all devices

## APIs Used

1. **NASA APOD API**: Displays the astronomy picture of the day
2. **NASA Mars Rover Photos API**: Fetches real images from Mars rovers

## Setup

1. Open `index.html` in your web browser
2. The site uses NASA's DEMO_KEY which has rate limits (30 requests per hour, 50 per day)
3. For unlimited access, get your free API key at https://api.nasa.gov/ and replace `DEMO_KEY` in `script.js`

## How to Use

- The Astronomy Picture of the Day loads automatically
- Select a Mars rover from the dropdown menu
- Click "Get Random Photos" to fetch new Mars rover images
- Click on any Mars photo to view it in full size
- Hover over Mars photos to see additional information

## Technologies

- HTML5
- CSS3 (with gradients, animations, and backdrop filters)
- Vanilla JavaScript (Fetch API, async/await)
- NASA Open APIs

## Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # API calls and interactivity
└── README.md       # Documentation
```

## API Rate Limits

The DEMO_KEY has the following limits:
- Hourly Limit: 30 requests per IP address per hour
- Daily Limit: 50 requests per IP address per day

Get your own free API key for higher limits!

## Future Enhancements

- Add more NASA APIs (Near Earth Objects, Earth Imagery, etc.)
- Implement date picker for historical APOD images
- Add favorites/bookmarking functionality
- Include more rover cameras and filtering options

---

Built for Day 96 of Python Challenge - Custom Website with API Integration
