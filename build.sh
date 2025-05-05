#!/bin/sh
sudo chmod +x mvnw
sudo mvn clean install
sudo mkdir -p target/dependency && (cd target/dependency; sudo jar -xf ../*.jar)
sudo docker build -t springio/wenslo-page .
sudo ./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=springio/wenslo-page
sudo docker run -p 8080:8080 -t springio/wenslo-page