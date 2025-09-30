//package dev.wenslo.wenslo_page.messages;
//
//import dev.wenslo.wenslo_page.Query;
//import dev.wenslo.wenslo_page.messages.models.MessageDTO;
//import org.springframework.cache.annotation.CachePut;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//
//public class GetAllMessagesService implements Query<Void, List<MessageDTO>> {
//
//    MessageBoardRepository messageBoardRepository;
//
//    public GetAllMessagesService(MessageBoardRepository messageBoardRepository) {
//        this.messageBoardRepository = messageBoardRepository;
//    }
//
//    @Override
//    @CachePut(value = "messageBoardCache", key = "'myMessageBoard'")
//    public ResponseEntity<List<MessageDTO>> execute(Void input) {
//        return ResponseEntity.ok(messageBoardRepository.findAllOrderByDateDesc()
//                .stream()
//                .map(MessageDTO::new)
//                .toList());
//    }
//}
