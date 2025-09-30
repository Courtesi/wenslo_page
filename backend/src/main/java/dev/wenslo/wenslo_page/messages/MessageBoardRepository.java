//package dev.wenslo.wenslo_page.messages;
//
//import dev.wenslo.wenslo_page.messages.models.Message;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.UUID;
//
//@Repository
//public interface MessageBoardRepository extends JpaRepository<Message, UUID> {
//
//    @Query("SELECT m FROM Message m ORDER BY m.date DESC")
//    List<Message> findAllOrderByDateDesc();
//}
