# Use a lightweight JDK base image
FROM eclipse-temurin:21-jdk-alpine

# Install dependencies required to run Maven Wrapper
RUN apk add --no-cache curl tar bash

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (faster build caching)
COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw ./

RUN ./mvnw dependency:go-offline

# Copy the rest of the project
COPY src ./src

# Package the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Expose the port used in your app-prod.properties
EXPOSE 4040

# Run the app with the prod profile
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "target/AtlasStay-0.0.1-SNAPSHOT.jar"]
