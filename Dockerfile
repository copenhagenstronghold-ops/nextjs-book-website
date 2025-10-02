# Use the official Python base image for a clean start
FROM python:3.11-slim

# Set the working directory for all subsequent commands
WORKDIR /app

# 1. Copy the requirements file and install dependencies
# This step is cached separately, speeding up subsequent builds if only the code changes.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Copy the rest of your application code
# This copies your src/, config/, tests/, etc.
# Copy only the necessary application code directory
COPY src /app/src
# 3. Cloud Run/GCP expects the service to listen on the $PORT environment variable
# We set the default port to 8080.
ENV PORT 8080

# 4. Define the command to run your application
# The script is in src/main.py and Flask runs the app (named 'app' in main.py)
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:8080 src.main:app"]