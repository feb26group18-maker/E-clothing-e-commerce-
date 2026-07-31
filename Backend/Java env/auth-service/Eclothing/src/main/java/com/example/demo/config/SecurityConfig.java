package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import com.example.demo.jwt.JwtFilter;

@Configuration
public class SecurityConfig {
	@Autowired
	private JwtFilter jwtFilter;
	
    // Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    // Security Configuration
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//            // Disable CSRF
//            .csrf(csrf -> csrf.disable())
//
//            // Enable CORS
//            .cors(Customizer.withDefaults())
//
//            // No Session
//            .sessionManagement(session ->
//                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//
//            // Authorization
//            .authorizeHttpRequests(auth -> auth
//
//                // Public APIs
//                .requestMatchers(
//                    "/auth/**"
//                ).permitAll()
//
//                // All other APIs require login
//                .anyRequest().authenticated()
//            )
//            
//            .addFilterBefore(
//                    jwtFilter,
//                    UsernamePasswordAuthenticationFilter.class
//                );
//
//        return http.build();
//    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http
            .csrf(csrf -> csrf.disable())


            .cors(Customizer.withDefaults())


            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )


            .authorizeHttpRequests(auth -> auth

            	    // Allow login/register APIs
            	    .requestMatchers("/auth/**").permitAll()


            	    // Allow browser preflight requests
            	    .requestMatchers(
            	        HttpMethod.OPTIONS,
            	        "/**"
            	    ).permitAll()


            	    // All remaining APIs need JWT
            	    .anyRequest().authenticated()

            	)


            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );


        return http.build();

    }
}
