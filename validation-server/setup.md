# Validation Server Setup Guide

Follow these steps to get started with the validation server for your project.

## Prerequisites

- **Python** (for TensorFlow, FastAPI, and Uvicorn)
- **Node.js** (for running the Node.js server)

## Step-by-Step Instructions

### 1. Set Up Python Environment

1. **Create a Virtual Environment:**
   Run the following command in your terminal to create a new Python virtual environment:
   ```bash
   python -m venv [env_name]
   ```

2. **Activate the Virtual Environment:**
   Activate the virtual environment using:
   - On Windows:
     ```bash
     [env_name]\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source [env_name]/bin/activate
     ```

3. **Install Dependencies:**
   Install the necessary Python packages by running:
   ```bash
   pip install tensorflow uvicorn fastapi
   ```

### 2. Start the Python Server

1. **Run Uvicorn:**
   In a new terminal, start the Python server using one of the following commands:
   ```bash
   uvicorn main:app --reload
   ```
   Or, if you want to specify a different host and port:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### 3. Start the Node.js Server

1. **Run Nodemon:**
   In a new terminal, use the following command to start the Node.js server:
   ```bash
   nodemon index.js
   ```

## Stopping the Servers

### 1. Deactivate Python Environment

Before closing your project, deactivate the virtual environment by running:
```bash
deactivate
```

### 2. Stop the Node.js Server

Stop the Node.js server by pressing `Ctrl + C` in the terminal where Nodemon is running.

### 3. Stop the Uvicorn Server

To stop the Uvicorn server, first find the running process using:
```bash
ps | grep uvicorn
```
Then kill the process using the following command:
```bash
taskkill /PID [task_pid] /F
```

## Additional Resources

For more detailed information on setting up a Python virtual environment, refer to this [guide](https://www.linkedin.com/pulse/setting-up-python-virtual-environment-your-project-prince-odoi/).

---
