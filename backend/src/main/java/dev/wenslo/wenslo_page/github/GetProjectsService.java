//package dev.wenslo.wenslo_page.github;
//
//import dev.wenslo.wenslo_page.Command;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cache.annotation.CachePut;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.net.URI;
//
//@Service
//public class GetProjectsService implements Command<Void, String> {
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    @Value("${githubApiKey}")
//    private String apiKey;
//
//    @Override
//    @CachePut(value = "gitHubCache", key = "'myGitHubCacheKey'")
//    public ResponseEntity<String> execute(Void input) {
//
//        String username = "Courtesi";
//        String reposUrl = String.format("https://api.github.com/users/%s/repos", username);
//        URI uri = UriComponentsBuilder
//                .fromHttpUrl(reposUrl)
//                .build()
//                .toUri();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer " + apiKey);
//        headers.set("Accept", "application/vnd.github.v3+json");
//        headers.set("X-GitHub-Api-Version", "2022-11-28");
//
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        return restTemplate.exchange(
//                uri,
//                HttpMethod.GET,
//                entity,
//                String.class
//        );
//    }
//}
