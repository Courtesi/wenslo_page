package dev.wenslo.wenslo_page.github;

import dev.wenslo.wenslo_page.github.models.ProjectDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GitHubController {

    GetProjectsService getProjectsService;
    GetLanguagesService getLanguagesService;
    public GitHubController(GetProjectsService getProjectsService, GetLanguagesService getLanguagesService) {
        this.getProjectsService = getProjectsService;
        this.getLanguagesService = getLanguagesService;
    }

    @GetMapping("/projects")
    public ResponseEntity<String> getGitHubProjects() {
        return getProjectsService.execute(null);
    }

    @GetMapping("/projects/{repo}/languages")
    public ResponseEntity<String> getGitHubLanguages(@PathVariable String repo) {
        return getLanguagesService.execute(repo);
    }
}
