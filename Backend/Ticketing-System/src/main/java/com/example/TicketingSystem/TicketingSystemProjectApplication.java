package com.example.TicketingSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TicketingSystemProjectApplication {
	public static void main(String[] args) {
		SpringApplication.run(TicketingSystemProjectApplication.class, args);
	}

	// Enable CORS for all API endpoints
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**") // Apply to all /api endpoints
						.allowedOrigins("http://localhost:3001, http://localhost:3000, http://localhost:3002") // Update with your frontend URL
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");

			}
		};
	}
}
