package isla.web.websocket;

import isla.domain.Comment;
import isla.repository.CommentRepository;
import isla.repository.LectureRepository;
import isla.web.websocket.dto.CommentDTO;
import isla.web.websocket.dto.CommentActionDTO;
import isla.service.CommentService;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import static isla.config.WebsocketConfiguration.SESSION_ID;

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
        comment.setCreatedAt(DateTime.now());
        comment.setLecture(lectureRepository.getOne(lecture));

        log.debug("Sending comment tracking data {}", commentDTO);
        messagingTemplate.convertAndSend("/topic/room/" + lecture,
                new CommentDTO(commentRepository.save(comment)));
    }

    @MessageMapping("/topic/comment/{lecture}/{comment}/{action}")
    public void likeComment(@DestinationVariable("lecture") long lecture,
            @DestinationVariable("comment") long commentId,
            @DestinationVariable("action") String action, StompHeaderAccessor stompHeaderAccessor) {
        String userSid = stompHeaderAccessor.getSessionAttributes().get(SESSION_ID).toString();
        switch (action.toUpperCase()) {
            case "LIKE":
                Comment comment = commentService.addLike(commentId, userSid);
                if (comment != null)
                    messagingTemplate.convertAndSend("/topic/room/" + lecture + "/actions",
                            new CommentActionDTO(comment.getId(), userSid, action));
                break;
            case "DELETE":
                break;
            case "MARKASREAD":
                break;
        }
    }
}
