package dev.wenslo.wenslo_page.github;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.wenslo.wenslo_page.Command;
import dev.wenslo.wenslo_page.exceptions.GitHubParsingException;
import dev.wenslo.wenslo_page.github.models.ProjectDTO;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.text.SimpleDateFormat;

import java.util.*;

@Service
public class GitHubGraphQLService implements Command<String, List<ProjectDTO>> {

    private static final String GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

    @Value("${githubApiKey}")
    private String GITHUB_TOKEN;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GitHubGraphQLService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    @Cacheable(value = "graphQLGitHubCache", key = "'myGraphQLGitHubProjects'")
    public ResponseEntity<List<ProjectDTO>> execute(String username) {
        // 1️⃣ Define GraphQL Query (Now includes `updatedAt`)
        String graphqlQuery = "{ \"query\": \"{ user(login: \\\"" + username + "\\\") { repositories(first: 100) { nodes { name url description updatedAt languages(first: 10) { edges { size node { name } } } } } } }\" }";

        // 2️⃣ Make API Request
        ResponseEntity<String> response = makeApiCall(graphqlQuery);

        // 3️⃣ Parse JSON Response
        return ResponseEntity.ok(parseResponse(response.getBody()));
    }

    private ResponseEntity<String> makeApiCall(String graphqlQuery) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + GITHUB_TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(graphqlQuery, headers);
        return restTemplate.exchange(GITHUB_GRAPHQL_URL, HttpMethod.POST, entity, String.class);
    }

    private List<ProjectDTO> parseResponse(String jsonResponse) {
        List<ProjectDTO> projects = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode repositories = rootNode.path("data").path("user").path("repositories").path("nodes");

            for (JsonNode repo : repositories) {
                ProjectDTO project = new ProjectDTO();
                project.setName(repo.get("name").asText());
                project.setHtml_url(repo.get("url").asText());
                project.setDescription(repo.has("description") ? repo.get("description").asText() : "");

                // ✅ Extract and parse `updatedAt`
                String updatedAtStr = repo.get("updatedAt").asText();
                Date updatedAt = dateFormat.parse(updatedAtStr);
                project.setUpdated_at(updatedAt);

                // ✅ Parse Languages
                Map<String, Integer> languages = new HashMap<>();
                for (JsonNode langEdge : repo.path("languages").path("edges")) {
                    String language = langEdge.path("node").path("name").asText();
                    int size = langEdge.path("size").asInt();
                    languages.put(language, size);
                }
                project.setLanguages(languages);

                projects.add(project);
            }

        } catch (Exception e) {
            throw new GitHubParsingException();
        }

        return projects;
    }
}
