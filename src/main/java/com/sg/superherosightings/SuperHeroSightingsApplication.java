package com.sg.superherosightings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.sg.superherosightings.Data")
@SpringBootApplication
public class SuperHeroSightingsApplication {
	public static void main(String[] args) {
		SpringApplication.run(SuperHeroSightingsApplication.class, args);
	}

}
