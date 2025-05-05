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

//    GetProjectsService getProjectsService;
//    GetLanguagesService getLanguagesService;
//    GetProjectsAndLanguagesService getProjectsAndLanguagesService;
    GitHubGraphQLService gitHubGraphQLService;

    public GitHubController(GitHubGraphQLService gitHubGraphQLService) {
//        this.getProjectsService = getProjectsService;
//        this.getLanguagesService = getLanguagesService;
//        this.getProjectsAndLanguagesService = getProjectsAndLanguagesService;
        this.gitHubGraphQLService = gitHubGraphQLService;
    }

//    @GetMapping("/projects")
//    public ResponseEntity<String> getGitHubProjects() {
//        return getProjectsService.execute(null);
//    }
//
//    @GetMapping("/projects/{repo}/languages")
//    public ResponseEntity<String> getGitHubLanguages(@PathVariable String repo) {
//        return getLanguagesService.execute(repo);
//    }
//
//    @GetMapping("/projects-all")
//    public ResponseEntity<List<ProjectDTO>> getGitHubProjectsAll() {
//        return getProjectsAndLanguagesService.execute(null);
//    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getGitHubTest() {
        return gitHubGraphQLService.execute("Courtesi");
    }
}
