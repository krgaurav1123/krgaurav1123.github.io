#!/bin/bash

# This script starts the portfolio application locally

echo "Starting the portfolio application locally..."

# Start the application with cross-env for better compatibility across platforms
npx cross-env NODE_ENV=development PORT=3000 HOST=localhost tsx server/index.ts