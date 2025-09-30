//package dev.wenslo.wenslo_page.github;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import dev.wenslo.wenslo_page.Command;
//import dev.wenslo.wenslo_page.github.models.ProjectDTO;
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
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class GetProjectsAndLanguagesService implements Command<Void, List<ProjectDTO>> {
//
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Value("${githubApiKey}")
//    private String apiKey;
//
//    @Override
//    @CachePut(value = "githubProjectsCache", key = "'myGitHubProjectsAndLanguagesCacheKey'")
//    public ResponseEntity<List<ProjectDTO>> execute(Void input) {
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
//        ResponseEntity<String> response = restTemplate.exchange(
//                uri,
//                HttpMethod.GET,
//                entity,
//                String.class
//        );
//
//        try {
//            JsonNode rootNode = objectMapper.readTree(response.getBody());
//            List<ProjectDTO> projectDTOs = new ArrayList<>();
//
//            for (JsonNode node : rootNode) {
//                ProjectDTO projectDTO = new ProjectDTO();
//                projectDTO.setName(node.get("name").asText());
//                projectDTO.setHtml_url(node.get("html_url").asText());
//                projectDTO.setDescription(node.get("description").asText());
//
//                String repoLanguagesUrl = String.format("https://api.github.com/repos/%s/%s/languages", username, projectDTO.getName());
//                URI languageUri = UriComponentsBuilder
//                        .fromHttpUrl(repoLanguagesUrl)
//                        .build()
//                        .toUri();
//
//                ResponseEntity<String> languages = restTemplate.exchange(
//                        languageUri,
//                        HttpMethod.GET,
//                        entity,
//                        String.class
//                );
//
//                JsonNode languageNode = objectMapper.readTree(languages.getBody());
//
//                Map<String,Integer> result = objectMapper.convertValue(languageNode, new TypeReference<Map<String, Integer>>(){});
//                projectDTO.setLanguages(result);
//
//                projectDTOs.add(projectDTO);
//            }
//
//            return ResponseEntity.ok(projectDTOs);
//
//        } catch (Exception e) {
//            throw new RuntimeException("Error parsing JSON", e);
//        }
//
//    }
//}
