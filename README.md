# Sheet Grabber

Sheet Grabber is an Express.js application designed to fetch data from Google Sheets using Google Sheets API. It provides a secure way to access the contents of specific spreadsheets by requiring an API key for operations.

## Features

- **API Key Authentication:** Ensures that only requests with a valid API key can access the Google Sheets data.
- **Google Sheets API Integration:** Leverages the Google Sheets API to read spreadsheet data dynamically based on requests.
- **Environment Variables:** Uses environment variables to handle sensitive data securely.

## Prerequisites

Before you can run the application, make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

Additionally, you will need:
- A Google Cloud Platform account.
- Access to the Google Sheets API.
- A service account on Google Cloud with permission to access Google Sheets, and its corresponding JSON key file.

## Installation

Follow these steps to get the application running:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/saintpetejackboy/sheet-grabber.git
   cd sheet-grabber
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory of the project.
   - Add the following content to the `.env` file:
     ```
     API_KEY=your_api_key_here
     GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
     ```

## Usage

To start the server, run:
```bash
npm start
```
This will launch the server on the port specified in your environment variables (default is 3987). You can interact with the API as follows:

- **GET /**
  - Description: Basic endpoint to check if the server is running.
  - Response: Returns a simple message indicating that the server is operational.

- **POST /sheet**
  - Description: Fetches data from a specified Google Sheet.
  - Required Headers:
    - `x-api-key`: Your API key for authentication.
  - Required Body:
    ```json
    {
      "spreadsheetId": "your_spreadsheet_id",
      "sheetName": "your_sheet_name"
    }
    ```
  - Response: Returns the data from the specified range within the Google Sheet.

## Contributing

Contributions to Sheet Grabber are welcome! Please adhere to the following guidelines:
- Fork the repository.
- Create a new branch for each feature or improvement.
- Send a pull request from each feature branch to the main branch.


