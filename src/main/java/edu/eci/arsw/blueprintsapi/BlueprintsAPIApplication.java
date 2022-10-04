package edu.eci.arsw.blueprintsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.Collections;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.blueprints"})
public class BlueprintsAPIApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(BlueprintsAPIApplication.class);
		app.setDefaultProperties(Collections
				.singletonMap("server.port", "8080"));
		app.run(args);
	}
}
