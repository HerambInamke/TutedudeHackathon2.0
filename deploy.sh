#!/bin/bash

# Deployment script for Chotu application
set -e

echo "🚀 Starting deployment process..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
mkdir -p server/logs
mkdir -p data/mongodb

# Copy environment files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server .env file from example..."
    cp server/.env.example server/.env
    echo "⚠️  Please update server/.env with your actual values"
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client .env file from example..."
    cp client/.env.example client/.env
    echo "⚠️  Please update client/.env with your actual values"
fi

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service health..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Server is running at http://localhost:5000"
else
    echo "❌ Server health check failed"
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Client is running at http://localhost:3000"
else
    echo "❌ Client health check failed"
fi

echo "🎉 Deployment completed!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   MongoDB:  mongodb://localhost:27017"
echo ""
echo "📝 Next steps:"
echo "   1. Update environment variables in server/.env and client/.env"
echo "   2. Configure your domain and SSL certificates for production"
echo "   3. Set up monitoring and logging"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"