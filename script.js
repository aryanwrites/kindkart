function toggleDropbox(element, event) {
  // Prevent clicks on child elements (like buttons or labels) from retriggering the toggle
  if (event && event.target.closest(".dropbox")) return;

  // Close all other dropboxes
  const allItems = document.querySelectorAll(".subcategory-item");
  allItems.forEach((item) => {
    const dropbox = item.querySelector(".dropbox");
    if (item !== element) {
      item.classList.remove("active");
      if (dropbox) dropbox.style.display = "none";
    }
  });

  // Toggle current dropbox
  const dropbox = element.querySelector(".dropbox");
  const isActive = element.classList.toggle("active");
  if (dropbox) dropbox.style.display = isActive ? "block" : "none";

  // Setup file input trigger only once
  const fileInput = element.querySelector(".file-input");
  const uploadLabel = element.querySelector(".upload-label");
  if (uploadLabel && fileInput && !uploadLabel.dataset.bound) {
    uploadLabel.addEventListener("click", function (e) {
      e.stopPropagation();
      fileInput.click();
    });
    uploadLabel.dataset.bound = "true";
  }
}

//   // Toggle dropbox display
//   function toggleDropbox(element) {
//     // Close all other dropboxes first
//     const allItems = document.querySelectorAll('.subcategory-item');
//     allItems.forEach(item => {
//         if (item !== element && item.classList.remove('active')) {
//             item.classList.remove('active');
//         }
//     });

//     // Toggle current dropbox
//     element.classList.toggle('active');

//     // Find the file input and connect it to the label
//     const fileInput = element.querySelector('.file-input');
//     const uploadLabel = element.querySelector('.upload-label');

//     if (uploadLabel && fileInput) {
//         uploadLabel.addEventListener('click', function(e) {
//             e.stopPropagation();
//             fileInput.click();
//         });
//     }
// }

// Preview uploaded image
function previewImage(input) {
  const previewImg = input.parentElement.querySelector(".preview-image");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };

    reader.readAsDataURL(input.files[0]);
  }
}


// Detect user location <----------->
function detectLocation(element) {
  const locationInfo = element.querySelector(".location-info");

  if (navigator.geolocation) {
    locationInfo.textContent = "Detecting your location...";
    locationInfo.style.display = "block";

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=7a6213f4c3944a728f6bb18ea6669230`
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.features.length) {
              const formattedAddress = result.features[0].properties.formatted;

              const locationDetails = `
                            Address: ${formattedAddress}
                            `;

                locationInfo.innerHTML = `

                                  ${formattedAddress}
                              `;
                console.log("above js ")
              let parms = {
                location_info : locationDetails,
              }
              emailjs.send("service_h6scupt","template_pinpwi9", parms)
                .then(() => {
                  alert("Location info emailed successfully!");
                })
                .catch((error) => {
                  console.error("EmailJS error:", error);
                  error("Failed to send email please rty again.");
                });
            } else {
              locationInfo.textContent = "No address found.";
            }
          })
          .catch((error) => {
            console.error(error);
            locationInfo.textContent = "Error fetching address.";
          });
      },
      function (error) {
        switch (error.code) {
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
    locationInfo.style.display = "block";
  }
}

// Add dropboxes to all other category items
document.addEventListener("DOMContentLoaded", function () {
  // Connect all file input buttons to their labels
  const allFileInputs = document.querySelectorAll(".file-input");
  allFileInputs.forEach((input) => {
    const label = input.nextElementSibling;
    if (label) {
      label.addEventListener("click", function (e) {
        e.stopPropagation();
        input.click();
      });
    }
  });

  // Make categories clickable to show their sections
  const categoryCards = document.querySelectorAll(".category-card");
  const sections = {
    Clothing: "clothing",
    Education: "education",
    "Health Care": "healthcare",
    "Pure Food": "purefood",
    Miscellaneous: "miscellaneous",
  };

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardTitle = card.querySelector("h3").textContent;
      const sectionId = sections[cardTitle];

      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
