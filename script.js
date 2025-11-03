// NASA API Key (DEMO_KEY has rate limits, get your own at https://api.nasa.gov/)
const API_KEY = 'DEMO_KEY';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const MARS_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;
const NEO_URL = `https://api.nasa.gov/neo/rest/v1/feed`;

// Fetch Astronomy Picture of the Day
async function fetchAPOD() {
    const container = document.getElementById('apod-container');

    try {
        const response = await fetch(APOD_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        container.innerHTML = `
            <div class="apod-content">
                ${data.media_type === 'image'
                ? `<img src="${data.url}" alt="${data.title}" class="apod-image" loading="lazy">`
                : `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-image" style="aspect-ratio: 16/9; height: 500px;"></iframe>`
            }
                <div class="apod-info">
                    <h3>${data.title}</h3>
                    <p class="apod-date">📅 ${formatDate(data.date)}</p>
                    <p class="apod-explanation">${data.explanation}</p>
                    ${data.copyright ? `<p style="margin-top: 1.5rem; color: #b8c1ec; font-size: 0.95rem;">📸 © ${data.copyright}</p>` : ''}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('APOD Error:', error);
        container.innerHTML = `
            <div style="text-align: center; color: #ff6b6b; padding: 2rem;">
                <h3 style="margin-bottom: 1rem;">⚠️ Failed to load Astronomy Picture</h3>
                <p style="font-size: 0.95rem; color: #b8c1ec;">Error: ${error.message}</p>
                <p style="font-size: 0.9rem; color: #888; margin-top: 1rem;">Try refreshing the page or check your internet connection</p>
            </div>
        `;
    }
}

// Fetch Mars Rover Photos
async function fetchMarsPhotos(rover = 'curiosity') {
    const container = document.getElementById('mars-container');
    const button = document.getElementById('fetch-mars-btn');

    container.innerHTML = '<div class="loading"><div class="spinner"></div><p class="loading-text">Fetching Mars photos...</p></div>';
    button.disabled = true;

    try {
        // Different rovers have different active periods
        const roverSolRanges = {
            'curiosity': { min: 1000, max: 3500 },
            'perseverance': { min: 1, max: 800 },
            'opportunity': { min: 1000, max: 5000 },
            'spirit': { min: 500, max: 2200 }
        };

        const range = roverSolRanges[rover] || { min: 100, max: 1000 };
        const randomSol = Math.floor(Math.random() * (range.max - range.min) + range.min);
        const url = `${MARS_URL}/${rover}/photos?sol=${randomSol}&api_key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.photos || data.photos.length === 0) {
            // Try another random sol if no photos found
            button.disabled = false;
            return fetchMarsPhotos(rover);
        }

        // Display up to 12 random photos
        const photos = data.photos.slice(0, 12);

        container.innerHTML = photos.map(photo => `
            <div class="mars-photo" onclick="window.open('${photo.img_src}', '_blank')">
                <img src="${photo.img_src}" alt="Mars photo from ${photo.rover.name}" loading="lazy">
                <div class="mars-photo-info">
                    <p><strong>${photo.rover.name}</strong></p>
                    <p>📷 ${photo.camera.full_name}</p>
                    <p>🌅 Sol ${photo.sol}</p>
                    <p>📅 ${photo.earth_date}</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Mars Photos Error:', error);
        container.innerHTML = `
            <div style="text-align: center; color: #ff6b6b; padding: 2rem;">
                <h3 style="margin-bottom: 1rem;">⚠️ Failed to load Mars Rover photos</h3>
                <p style="font-size: 0.95rem; color: #b8c1ec;">Error: ${error.message}</p>
                <p style="font-size: 0.9rem; color: #888; margin-top: 1rem;">Try selecting a different rover or refresh the page</p>
            </div>
        `;
    } finally {
        button.disabled = false;
    }
}

// Fetch Near Earth Objects (Asteroids)
async function fetchNEO() {
    const container = document.getElementById('neo-container');

    try {
        const today = new Date().toISOString().split('T')[0];
        const url = `${NEO_URL}?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const neos = data.near_earth_objects[today] || [];

        if (neos.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: #b8c1ec; padding: 2rem;">
                    <p>No near-Earth objects detected today</p>
                </div>
            `;
            return;
        }

        // Display up to 6 NEOs
        const displayNeos = neos.slice(0, 6);

        container.innerHTML = `
            <div class="neo-grid">
                ${displayNeos.map(neo => {
            const closeApproach = neo.close_approach_data[0];
            const diameter = neo.estimated_diameter.meters;
            const isHazardous = neo.is_potentially_hazardous_asteroid;

            return `
                        <div class="neo-item">
                            <h3>${neo.name}</h3>
                            <p>📏 Diameter: ${Math.round(diameter.estimated_diameter_min)} - ${Math.round(diameter.estimated_diameter_max)} meters</p>
                            <p>🚀 Velocity: ${Math.round(parseFloat(closeApproach.relative_velocity.kilometers_per_hour)).toLocaleString()} km/h</p>
                            <p>📍 Distance: ${Math.round(parseFloat(closeApproach.miss_distance.kilometers)).toLocaleString()} km</p>
                            <p>🌍 Orbiting: ${closeApproach.orbiting_body}</p>
                            <span class="${isHazardous ? 'hazardous' : 'safe'}">
                                ${isHazardous ? '⚠️ Potentially Hazardous' : '✅ Safe'}
                            </span>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

    } catch (error) {
        console.error('NEO Error:', error);
        container.innerHTML = `
            <div style="text-align: center; color: #ff6b6b; padding: 2rem;">
                <h3 style="margin-bottom: 1rem;">⚠️ Failed to load Near Earth Objects</h3>
                <p style="font-size: 0.95rem; color: #b8c1ec;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Event Listeners
document.getElementById('fetch-mars-btn').addEventListener('click', () => {
    const rover = document.getElementById('rover-select').value;
    fetchMarsPhotos(rover);
});

// Initial load
console.log('🚀 NASA Space Explorer initialized');
fetchAPOD();
fetchMarsPhotos('curiosity');
fetchNEO();
