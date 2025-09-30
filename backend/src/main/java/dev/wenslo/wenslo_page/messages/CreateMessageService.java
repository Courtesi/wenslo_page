//package dev.wenslo.wenslo_page.messages;
//
//import dev.wenslo.wenslo_page.Command;
//import dev.wenslo.wenslo_page.exceptions.EmailNotValidException;
//import dev.wenslo.wenslo_page.exceptions.MessageNotValidException;
//import dev.wenslo.wenslo_page.messages.models.Message;
//import dev.wenslo.wenslo_page.messages.models.MessageDTO;
//import org.apache.commons.validator.routines.EmailValidator;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//
//import java.util.logging.Logger;
//
//@Service
//public class CreateMessageService implements Command<Message, MessageDTO> {
//
//    private static final Logger logger = Logger.getLogger(MessageBoardController.class.getName());
//
//    MessageBoardRepository messageBoardRepository;
//
//    public CreateMessageService(MessageBoardRepository messageBoardRepository) {
//        this.messageBoardRepository = messageBoardRepository;
//    }
//
//    @Override
//    public ResponseEntity<MessageDTO> execute(Message message) {
//        if (!StringUtils.hasLength(message.getName()) || !StringUtils.hasLength(message.getEmail()) || !StringUtils.hasLength(message.getMessage_text())) {
//            throw new MessageNotValidException();
//        }
//
//        if (!EmailValidator.getInstance().isValid(message.getEmail())) {
//            throw new EmailNotValidException();
//        }
//
//        Message saveMessage = messageBoardRepository.save(message);
//        logger.info("SAVED MESSAGE");
//        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageDTO(saveMessage));
//    }
//}
