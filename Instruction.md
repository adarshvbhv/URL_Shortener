# Instructions to Run the URL Shortener Service

## Prerequisites

Before running the service, ensure you have the following installed:

- [Node.js] (version 14 or higher)
- [npm] (comes with Node.js)
- [Python] (version 3.6 or higher)
- [pip] (Python package installer)

## Setup

### Set Up the Backend

1. **Navigate to the main directory (where `app.py` is located)**:
    ```bash
    cd URL_Shortener  # Replace with your actual repository name
    ```

2. **Install required Python packages**:
    ```bash
    pip install flask flask-cors
    ```

### Set Up the Frontend

1. **Navigate to the frontend directory**:
    ```bash
    cd url_frontend
    ```

2. **Install required Node packages**:
    ```bash
    npm install
    ```

## Running the Service

### Start the Backend

1. **Open a terminal in the main directory (where `app.py` is located)**:
    ```bash
    python app.py
    ```
   - The backend will run on `http://localhost:5000`.

### Start the Frontend

1. **Open a new terminal and navigate back to the frontend directory**:
    ```bash
    cd url_frontend
    ```

2. **Start the React application**:
    ```bash
    npm start
    ```
   - The frontend will run on `http://localhost:3000`.

## Accessing the Application

- Open your browser and go to `http://localhost:3000` to use the URL Shortener service.

## Testing

- **Testing the API**: You can use tools like [Postman] to test the API endpoints directly.
- **Frontend Testing**: The frontend can be tested by interacting with the UI in a web browser.

## Troubleshooting

- **CORS Issues**: If you face CORS-related errors, ensure that both the frontend and backend servers are running and properly configured.
- **Port Conflicts**: If the specified ports (5000 for backend and 3000 for frontend) are in use, change the ports in the respective configuration files.

If you encounter any issues, please refer to the error messages in the terminal for guidance or check the console in your browser for frontend-related errors.
