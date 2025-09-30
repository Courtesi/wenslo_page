package dev.wenslo.wenslo_page;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class WensloPageApplication {

	public static void main(String[] args) {
		SpringApplication.run(WensloPageApplication.class, args);
	}

}
