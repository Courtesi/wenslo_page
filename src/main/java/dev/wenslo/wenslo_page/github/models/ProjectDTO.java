package dev.wenslo.wenslo_page.github.models;

import lombok.Data;
import lombok.Getter;

@Data
public class ProjectDTO {
    //getter for name
    private String name;

    private String html_url;

    private String description;

    private String languages_url;
}
