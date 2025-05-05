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
//public class GetLanguagesService implements Command<String, String> {
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    @Value("${githubApiKey}")
//    private String apiKey;
//
//    @Override
//    @CachePut(value = "languagesCache", key = "#repoName + '/languages'")
//    public ResponseEntity<String> execute(String repoName) {
//        String username = "Courtesi";
//        String repoLanguagesUrl = String.format("https://api.github.com/repos/%s/%s/languages", username, repoName);
//        URI uri = UriComponentsBuilder
//                .fromHttpUrl(repoLanguagesUrl)
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
