package dev.wenslo.wenslo_page;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Arrays;

@Configuration
@EnableCaching
@EnableScheduling
public class CacheConfiguration {

    @Bean //return val gets injected into Spring Container using dependency injection
    //will talk more about after security section
    public CacheManager cacheManager() {
        ConcurrentMapCacheManager manager = new ConcurrentMapCacheManager();
        manager.setAllowNullValues(false);
        manager.setCacheNames(Arrays.asList("graphQLGitHubCache", "messageBoardCache"));
        return manager;
    }

//    @CacheEvict(value = "gitHubCache", allEntries = true)
//    @Scheduled(fixedDelay = 300000, initialDelay = 0)
//    public void evictGitHubProjectsCache() {System.out.println("Evicting GitHub Cache");}
//
//    @CacheEvict(value = "languagesCache", allEntries = true)
//    @Scheduled(fixedDelay = 300000, initialDelay = 0)
//    public void evictLanguagesCache() {System.out.println("Evicting Languages Cache");}

    @CacheEvict(value = "graphQLGitHubCache", allEntries = true)
    @Scheduled(fixedDelay = 3600000, initialDelay = 0)
    public void evictGitHubProjectsAndLanguagesCache() {System.out.println("Evicting GraphQL GitHub Cache");}

    @CacheEvict(value = "messageBoardCache", allEntries = true)
    @Scheduled(fixedDelay = 3600000, initialDelay = 0)
    public void evictMessageBoardCache() {System.out.println("Evicting Message Board Cache");}
}
