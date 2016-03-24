package isla.web.websocket;

import isla.config.WebsocketConfiguration;
import isla.domain.Comment;
import isla.repository.CommentRepository;
import isla.repository.LectureRepository;
import isla.security.AuthenticationToken;
import isla.security.SecurityUtils;
import isla.security.UserAuthentication;
import isla.web.websocket.dto.CommentDTO;
import isla.service.CommentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.security.Principal;

import javax.inject.Inject;

@Controller
public class RoomService {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);


    @Inject
    private CommentRepository commentRepository;
    @Inject
    private LectureRepository lectureRepository;
    @Inject
    private CommentService commentService;
    @Inject
    SimpMessageSendingOperations messagingTemplate;

    // @MessageMapping("/topic/comment/{lecture}/comments")
    // public void sendComments(@DestinationVariable("lecture") long lecture,
    // StompHeaderAccessor stompHeaderAccessor, Principal principal) {
    // List<CommentDTO> commentDTOs = new ArrayList<CommentDTO>();
    // List<Comment> comments = commentRepository.findByPostedByLectureId(lecture);
    // for (Comment comment : comments) {
    // commentDTOs.add(new CommentDTO(comment, comment.getLikes().contains(
    // stompHeaderAccessor.getSessionAttributes().get(SESSION_ID).toString())));
    // }
    // messagingTemplate.convertAndSendToUser(principal.getName(), "/topic/room/" + lecture,
    // commentDTOs);
    // }

    @MessageMapping("/topic/comment/{lecture}")
    public void sendComment(@Payload CommentDTO commentDTO,
            @DestinationVariable("lecture") long lecture) {
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setCreatedAt();
        comment.setLecture(lectureRepository.getOne(lecture));

        log.debug("Sending comment tracking data {}", commentDTO);
        messagingTemplate.convertAndSend("/topic/room/" + lecture,
                new CommentDTO(commentRepository.save(comment)));
    }

    @MessageMapping("/topic/comment/{lecture}/{comment}/{action}")
    public void likeComment(@DestinationVariable("lecture") long lecture,
            @DestinationVariable("comment") long commentId,
            @DestinationVariable("action") String action, StompHeaderAccessor stompHeaderAccessor) {
        Comment comment = null;
        final Authentication auth = (Authentication) stompHeaderAccessor.getSessionAttributes().get("AUTHENTICATION");
        switch (action.toUpperCase()) {
            case "LIKE":
                comment = commentService.addLike(commentId, auth.getPrincipal().toString());
                break;
            case "DELETE":
                comment = commentService.markAsDeleted(commentId, auth);
                break;
            case "MARKASREAD":
                comment = commentService.markAsRead(commentId, auth);
                break;
        }
        if (comment != null)
            messagingTemplate.convertAndSend("/topic/room/" + lecture + "/actions",
                    new CommentDTO(comment));
    }
}
