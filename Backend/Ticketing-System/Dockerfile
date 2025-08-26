# syntax=docker/dockerfile:1.7
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml ./
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests dependency:go-offline

COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests package && \
    cp target/*-SNAPSHOT.jar /app/app.jar

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
ENV SERVER_PORT=8081
EXPOSE 8081
COPY --from=build /app/app.jar /app/app.jar
ENTRYPOINT ["sh","-c","java -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -jar /app/app.jar"]
