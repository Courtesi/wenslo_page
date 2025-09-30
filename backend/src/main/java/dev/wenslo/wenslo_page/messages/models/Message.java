//package dev.wenslo.wenslo_page.messages.models;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.CreationTimestamp;
//
//import java.util.Date;
//import java.util.UUID;
//
//@Entity
//@Data
//@Table(name = "messages")
//public class Message {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @JsonProperty("id")
//    private UUID id;
//
//    @JsonProperty("name")
//    private String name;
//
//    @JsonProperty("email")
//    private String email;
//
//    @JsonProperty("message_text")
//    private String message_text;
//
//    @CreationTimestamp // ✅ Auto-set date on insert (no need for manual assignment)
//    @Temporal(TemporalType.TIMESTAMP) // ✅ Store as timestamp
//    @Column(nullable = false, updatable = false)
//    @JsonProperty("date")
//    private Date date;
//
//    public UUID getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getMessage_text() {
//        return message_text;
//    }
//
//    public Date getDate() {
//        return date;
//    }
//}
