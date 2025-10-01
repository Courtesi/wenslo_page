package dev.wenslo.wenslo_page.github;

import dev.wenslo.wenslo_page.github.models.ProjectDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
public class GitHubController {

    GitHubGraphQLService gitHubGraphQLService;

    public GitHubController(GitHubGraphQLService gitHubGraphQLService) {
        this.gitHubGraphQLService = gitHubGraphQLService;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getGitHubTest() {
        return gitHubGraphQLService.execute("Courtesi");
    }
}
