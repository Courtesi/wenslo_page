//package dev.wenslo.wenslo_page.messages;
//
//import dev.wenslo.wenslo_page.messages.models.Message;
//import dev.wenslo.wenslo_page.messages.models.MessageDTO;
//import dev.wenslo.wenslo_page.ratelimit.WithRateLimitProtection;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.web.csrf.CsrfToken;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.logging.Logger;

//@RestController
//@RequestMapping("/api")
//public class MessageBoardController {

//    private static final Logger logger = Logger.getLogger(MessageBoardController.class.getName());
//
//    GetAllMessagesService getAllMessagesService;
//    CreateMessageService createMessageService;
//
//    public MessageBoardController(GetAllMessagesService getAllMessagesService, CreateMessageService createMessageService) {
//        this.getAllMessagesService = getAllMessagesService;
//        this.createMessageService = createMessageService;
//    }
//
//    @GetMapping("/csrf-token")
//    public CsrfToken getCsrfToken(HttpServletRequest request) {
//        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//    }
//
//    @PostMapping("/create_message")
//    @WithRateLimitProtection
//    public ResponseEntity<MessageDTO> createMessage(@RequestBody Message message, HttpServletRequest request) {
//        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//        logger.info("Received CSRF Token: " + (csrfToken != null ? csrfToken.getToken() : "NULL"));
//        logger.info("TRYING TO CREATE A MESSAGE");
//        return createMessageService.execute(message);
//    }
//
//    @GetMapping("/messages")
//    public ResponseEntity<List<MessageDTO>> getAllMessages() {
//        logger.info("Fetching all messages with getAllMessages()...1.!!>!>!");
//        return getAllMessagesService.execute(null);
//    }
//}
