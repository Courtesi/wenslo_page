package dev.wenslo.wenslo_page.github.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("html_url")
    private String html_url;

    @JsonProperty("description")
    private String description;

    @JsonProperty("languages")
    private Map<String, Integer> languages;

    @JsonProperty("updated_at")
    private Date updated_at;

    //getters and setters

    //setters for class attributes
    public void setName(String name) {
        this.name = name;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLanguages(Map<String, Integer> languages) {
        this.languages = languages;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    //getters for class attributes
    public String getName() {
        return name;
    }

    public String getHtml_url() {
        return html_url;
    }

    public String getDescription() {
        return description;
    }

    public Map<String, Integer> getLanguages() {
        return languages;
    }

    public Date getUpdated_at() {
        return updated_at;
    }
}
