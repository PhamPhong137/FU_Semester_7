# Project Setup Instructions

Follow these steps to set up and run the project on your local environment:

### Step 1: Clone the Repository

First, clone the repository from GitHub:
```bash
git clone https://github.com/PhamPhong137/template-pe-sdn302.git
```

After cloning, open the project folder in VSCode:
- You can do this by running the following command or using the VSCode interface:
```bash
cd template-pe-sdn302 && code .
```

### Step 2: Install Dependencies

Install the required packages using `npm`:
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory of the project. Fill in the required database information, such as:
```
MONGO_URI = 'mongodb://127.0.0.1/db-name'
```

Ensure all the necessary database connection information is added to `.env`.

### Step 4: Start the Project

Start the application using the following command:
```bash
npm start
```

The application should now be running on your local server.

---

Feel free to reach out if you encounter any issues during the setup process.

