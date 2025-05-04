# KindKart - Donate Reusable Items

## Overview

KindKart is a web platform designed to connect individuals who have reusable items they wish to donate with those in need. The platform categorizes donations (Clothing, Education, Health Care, Pure Food, Miscellaneous) to make the process organized and efficient. Users can indicate the type and quantity of items they want to donate and optionally share their location to facilitate potential pickups or coordination.

This project includes a user login and signup system using Firebase Authentication, ensuring a secure and personalized experience.

## Features

* **User Authentication:** Secure login and signup using Firebase Email/Password authentication.
* **Donation Categories:** Clear categorization of reusable items for easy selection.
* **Subcategory Details:** Ability to specify the type of item within each category.
* **Image Upload:** Option to upload photos of the items being donated.
* **Quantity Selection:** Indicate the number of items being donated.
* **Location Detection:** Users can detect and share their location.
* **Email Notification:** Sends the detected location and/or donation details via email using EmailJS.
* **Responsive Design:** Layout adapts to different screen sizes.

## Technologies Used

* **HTML:** Structure and content of the web pages.
* **CSS:** Styling and layout.
* **JavaScript:** Interactivity, form handling, location detection, and EmailJS integration.
* **Firebase:** Backend-as-a-service for user authentication.
![image](https://github.com/user-attachments/assets/0787dc54-13c9-49e5-b5dd-ef5f2975fc67)

* **EmailJS:** Service for sending emails directly from the frontend.
* **OpenStreetMap Nominatim API:** For reverse geocoding (converting coordinates to an address).


## Usage

1.  **Login/Sign Up:** New users can sign up for an account on the `login.html` page. Existing users can log in.
2.  **Browse Categories:** After successful login, users are redirected to the donation page (`donate.html`) where they can see different categories of items.
3.  **Select Subcategory:** Clicking on a category card will smoothly scroll to the corresponding subcategory section.
4.  **Provide Donation Details:** Within a subcategory, users can:
    * Toggle a subcategory item to reveal more options.
    * Upload a photo of the item (optional).
    * Select the quantity of the item.
    * Detect their location by clicking "Detect My Location." The detected address will be displayed.
    * Click "Send Location" (next to "Detect My Location") to send their detected location to the specified email address.
    * Click the "Donate Now (Category)" button at the end of each subcategory section to send an email with the category and the detected location (if available).
5.  **Navigation:** The header provides links to Home, About, Donate, and Contact pages (these might be placeholders in the current version). The footer includes quick links, category links, and contact information.

## File Structure

KindKart/
├── index.html
├── donate.html
├── login.css
├── style.css
├── login.js
└── script.js
* `index.html`: Contains the login and signup forms.
* `donate.html`: The main page for browsing categories and providing donation details.
* `login.css`: Styles for the login and signup pages.
* `style.css`: General styles for the donation page.
* `login.js`: JavaScript for handling login and signup functionality (Firebase integration).
* `script.js`: JavaScript for the donation page, including location detection and email sending.

## Contributing

Contributions to the KindKart project are welcome. Please feel free to fork the repository, make your changes, and submit a pull request.
