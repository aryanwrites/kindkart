  // Toggle dropbox display
  function toggleDropbox(element) {
    // Close all other dropboxes first
    const allItems = document.querySelectorAll('.subcategory-item');
    allItems.forEach(item => {
        if (item !== element && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current dropbox
    element.classList.toggle('active');
    
    // Find the file input and connect it to the label
    const fileInput = element.querySelector('.file-input');
    const uploadLabel = element.querySelector('.upload-label');
    
    if (uploadLabel && fileInput) {
        uploadLabel.addEventListener('click', function(e) {
            e.stopPropagation();
            fileInput.click();
        });
    }
}

// Preview uploaded image
function previewImage(input) {
    const previewImg = input.parentElement.querySelector('.preview-image');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}


// Detect user location
function detectLocation(element) {
    const locationInfo = element.querySelector('.location-info');

    if (navigator.geolocation) {
        locationInfo.textContent = "Detecting your location...";
        locationInfo.style.display = 'block';

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Call Geoapify API
                fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=YOUR_API_KEY`)
                    .then(response => response.json())
                    .then(result => {
                        if (result.features.length) {
                            const formattedAddress = result.features[0].properties.formatted;

                            locationInfo.innerHTML = `
                                <strong>Location detected:</strong><br>
                                Latitude: ${latitude.toFixed(6)}<br>
                                Longitude: ${longitude.toFixed(6)}<br>
                                <strong>Address:</strong><br>
                                ${formattedAddress}
                            `;
                        } else {
                            locationInfo.textContent = "No address found.";
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        locationInfo.textContent = "Error fetching address.";
                    });
            },
            function(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        locationInfo.textContent = "You denied location permission.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationInfo.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        locationInfo.textContent = "Location request timed out.";
                        break;
                    default:
                        locationInfo.textContent = "An unknown error occurred.";
                        break;
                }
            }
        );
    } else {
        locationInfo.textContent = "Geolocation is not supported by this browser.";
        locationInfo.style.display = 'block';
    }
}


// Add dropboxes to all other category items
document.addEventListener('DOMContentLoaded', function() {
    // Connect all file input buttons to their labels
    const allFileInputs = document.querySelectorAll('.file-input');
    allFileInputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label) {
            label.addEventListener('click', function(e) {
                e.stopPropagation();
                input.click();
            });
        }
    });
    
    // Make categories clickable to show their sections
    const categoryCards = document.querySelectorAll('.category-card');
    const sections = {
        'Clothing': 'clothing',
        'Education': 'education',
        'Health Care': 'healthcare',
        'Pure Food': 'purefood',
        'Miscellaneous': 'miscellaneous'
    };
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = card.querySelector('h3').textContent;
            const sectionId = sections[cardTitle];
            
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});