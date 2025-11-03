// NASA API Key (DEMO_KEY has rate limits, get your own at https://api.nasa.gov/)
const API_KEY = 'DEMO_KEY';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const MARS_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers`;

// Fetch Astronomy Picture of the Day
async function fetchAPOD() {
    const container = document.getElementById('apod-container');
    
    try {
        const response = await fetch(APOD_URL);
        const data = await response.json();
        
        container.innerHTML = `
            <div class="apod-content">
                ${data.media_type === 'image' 
                    ? `<img src="${data.url}" alt="${data.title}" class="apod-image">`
                    : `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-image" style="aspect-ratio: 16/9;"></iframe>`
                }
                <div class="apod-info">
                    <h3>${data.title}</h3>
                    <p class="apod-date">${data.date}</p>
                    <p class="apod-explanation">${data.explanation}</p>
                    ${data.copyright ? `<p style="margin-top: 1rem; color: #a0a0a0; font-size: 0.9rem;">© ${data.copyright}</p>` : ''}
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div style="text-align: center; color: #ff6b6b;">
                <p>Failed to load Astronomy Picture of the Day</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Fetch Mars Rover Photos
async function fetchMarsPhotos(rover = 'curiosity') {
    const container = document.getElementById('mars-container');
    container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        // Get a random sol (Martian day)
        const randomSol = Math.floor(Math.random() * 1000);
        const url = `${MARS_URL}/${rover}/photos?sol=${randomSol}&api_key=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.photos.length === 0) {
            // Try another random sol if no photos found
            return fetchMarsPhotos(rover);
        }
        
        // Display up to 12 random photos
        const photos = data.photos.slice(0, 12);
        
        container.innerHTML = photos.map(photo => `
            <div class="mars-photo">
                <img src="${photo.img_src}" alt="Mars photo from ${photo.rover.name}">
                <div class="mars-photo-info">
                    <p><strong>${photo.rover.name}</strong></p>
                    <p>Camera: ${photo.camera.full_name}</p>
                    <p>Sol: ${photo.sol} | Earth Date: ${photo.earth_date}</p>
                </div>
            </div>
        `).join('');
        
        // Add click to open full image
        document.querySelectorAll('.mars-photo img').forEach(img => {
            img.addEventListener('click', () => {
                window.open(img.src, '_blank');
            });
        });
        
    } catch (error) {
        container.innerHTML = `
            <div style="text-align: center; color: #ff6b6b;">
                <p>Failed to load Mars Rover photos</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Event Listeners
document.getElementById('fetch-mars-btn').addEventListener('click', () => {
    const rover = document.getElementById('rover-select').value;
    fetchMarsPhotos(rover);
});

// Initial load
fetchAPOD();
fetchMarsPhotos('curiosity');
