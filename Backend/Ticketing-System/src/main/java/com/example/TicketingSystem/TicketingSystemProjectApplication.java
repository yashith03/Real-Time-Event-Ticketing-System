//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\TicketingSystemProjectApplication.java

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

	@Bean
public WebMvcConfigurer corsConfigurer() {
  return new WebMvcConfigurer() {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/api/**")
          .allowedOrigins(
              "http://localhost:3000",
              "http://localhost:3001",
              "http://localhost:3002",
              "https://<your-frontend-domain>" // add your deployed frontend origin here
          )
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
  };
};
}
