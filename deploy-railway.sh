#!/bin/bash

# Quick Railway Deployment Script
# This script helps you deploy the backend to Railway via CLI

echo "🚂 Jeremy Crawford Portfolio - Backend Deployment"
echo "=================================================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    echo "Run: npm install -g @railway/cli"
    echo "Or visit: https://docs.railway.app/develop/cli"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Login to Railway
echo "📝 Please login to Railway..."
railway login

echo ""
echo "🚀 Deploying backend..."
cd backend
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://railway.app/dashboard"
echo "2. Click on your project"
echo "3. Add environment variables (MONGO_URL, DB_NAME)"
echo "4. Generate a domain in Settings → Networking"
echo "5. Copy the URL and update your frontend's REACT_APP_BACKEND_URL"
echo ""
