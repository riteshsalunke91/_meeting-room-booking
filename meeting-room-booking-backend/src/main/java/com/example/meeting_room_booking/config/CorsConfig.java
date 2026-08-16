// config/CorsConfig.java
package com.example.meeting_room_booking.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:5173",
                "http://localhost:5174",  // ← your React runs on 5174
                "http://localhost:3000"
            )
            .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(false)
            .maxAge(3600);
    }
}