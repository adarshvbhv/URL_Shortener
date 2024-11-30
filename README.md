# URL Shortener Service

## Overview

This project is a URL Shortener service that allows users to shorten long URLs with Time to Live functionality and retrieve access counts for shortened URLs. The service consists of a Flask backend and a React frontend.

## Approach

### Frontend

- **Technology Stack**: 
  - React for building the user interface.
  - Bootstrap for styling and responsive design.

- **Key Features**:
  - **Shorten URL**: Users can input a long URL and an optional time-to-live (TTL) value to receive a shortened URL.
  - **Access Count**: Users can check how many times a shortened URL has been accessed.

### Backend

- **Technology Stack**: 
  - Flask for building the RESTful API.
  - Flask-CORS to enable Cross-Origin Resource Sharing.

- **Key Features**:
  - **Validation**: Validate input to ensure the URL is valid.
  - **URL Shortening**: Generates a unique shortened URL for a provided long URL.
  - **Time to Live**: Allow users to enter time period for which they wants the link to be valid.
  - **Redirection**: Redirects users to the original long URL when accessing the shortened URL.
  - **Access Count Tracking**: Tracks the number of times a shortened URL has been accessed.

## Design Decisions

1. **Choice of Frameworks**:
   - Flask was chosen for the backend due to its simplicity and flexibility in developing RESTful APIs.
   - React was chosen for the frontend for its component-based architecture and ease of managing state.

2. **State Management**:
   - The frontend uses React's built-in state management to handle user inputs and display results.

3. **API Design**:
   - The backend API is designed with RESTful principles, providing endpoints for URL shortening, redirection, and access count retrieval.

## Challenges Faced

- **URL Validation**: Ensuring that URLs are valid before shortening them required careful regex crafting.
- **Error Handling**: Implementing robust error handling in both the frontend and backend to manage user inputs and server responses effectively.
- **CORS Issues**: Configuring CORS correctly to allow the frontend to communicate with the backend without any security errors.

## Future Improvements

- **Database Integration**: Implementing a persistent database to store URLs and their metadata instead of in-memory storage for better scalability.
- **User Authentication**: Adding user accounts for tracking individual user URLs and access counts.
- **Analytics Dashboard**: Creating an analytics dashboard to visualize access counts and trends over time.

