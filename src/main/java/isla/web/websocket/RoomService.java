package isla.web.websocket;

import isla.domain.Comment;
import isla.repository.CommentRepository;
import isla.repository.LectureRepository;
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

    @MessageMapping("/topic/comment/{lecture}")
    public void sendComment(@Payload CommentDTO commentDTO,
            @DestinationVariable("lecture") long lecture) {
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setCreatedAt();
        if(commentDTO.getChoices() != null && commentDTO.getChoices().size() > 0){
            comment.setChoicesAsString(commentDTO.getChoices());
            comment.setPinned(true);
        }
        comment.setLecture(lectureRepository.getOne(lecture));

        log.debug("Sending comment tracking data {}", commentDTO);
        messagingTemplate.convertAndSend("/topic/room/" + lecture,
                commentRepository.save(comment));
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
                    comment);
    }
    
    @MessageMapping("/topic/comment/{lecture}/{comment}/{choice}/vote")
    public void voteComment(@DestinationVariable("lecture") long lecture,
            @DestinationVariable("comment") long commentId,
            @DestinationVariable("choice") long choiceId, StompHeaderAccessor stompHeaderAccessor) {
        Comment comment = null;
        final Authentication auth = (Authentication) stompHeaderAccessor.getSessionAttributes().get("AUTHENTICATION");
        comment = commentService.voteFor(commentId, choiceId, auth.getPrincipal().toString());
        if (comment != null)
            messagingTemplate.convertAndSend("/topic/room/" + lecture + "/actions",
                    comment);
    }
}
