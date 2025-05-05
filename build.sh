#!/bin/sh
sudo cp ../application-prod.properties src/main/resources/
sudo chmod +x mvnw
sudo mvn clean install
sudo mkdir -p target/dependency && (cd target/dependency; sudo jar -xf ../*.jar)
sudo docker build -t wenslo-page .
#sudo ./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=wenslo-page
sudo docker run -p 8080:8080 -d wenslo-page
