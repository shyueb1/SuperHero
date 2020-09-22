package com.sg.superherosightings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.sg.superherosightings.Data")
@SpringBootApplication
public class SuperherosightingsApplication {
	public static void main(String[] args) {
		SpringApplication.run(SuperherosightingsApplication.class, args);
	}

}
