#!/bin/sh

# Build and run with Docker Compose
echo "Building and starting services with Docker Compose..."

# Copy production properties if needed
# if [ -f "../application-prod.properties" ]; then
#     sudo cp ../application-prod.properties backend/src/main/resources/
# fi

# Build and start all services
sudo docker-compose down
sudo docker-compose build
sudo docker-compose up -d

# Show logs
echo ""
echo "Services started! View logs with: docker-compose logs -f"
echo "Frontend: http://localhost"
echo "Backend:  http://localhost:8080"
