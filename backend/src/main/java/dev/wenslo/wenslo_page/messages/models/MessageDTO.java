//package dev.wenslo.wenslo_page.messages.models;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import lombok.Data;
//
//import java.util.Date;
//import java.util.UUID;
//
//@Data
//public class MessageDTO {
//
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
//    @JsonProperty("date")
//    private Date date;
//
//    public MessageDTO(Message message) {
//        this.id = message.getId();
//        this.name = message.getName();
//        this.email = message.getEmail();
//        this.message_text = message.getMessage_text();
//        this.date = message.getDate();
//    }

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
//}
