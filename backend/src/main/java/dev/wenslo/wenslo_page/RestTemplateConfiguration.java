package dev.wenslo.wenslo_page;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@org.springframework.context.annotation.Configuration
public class RestTemplateConfiguration {

    @Bean
    //Beans get injected into spring container
    //will cover this in dependency injection
    //bean gives us access to rest template throughout the app
    public RestTemplate restTemplate() {
        //configure your rest template options
        return new RestTemplate();
    }
}
