package isla.web.websocket;

import isla.security.SecurityUtils;
import isla.web.rest.dto.CommentDTO;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import java.security.Principal;

@Controller
public class LectureService {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);


    @Inject
    SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/lecture/comment")
    @SendTo("/comment/tracker")
    public CommentDTO sendComment(@Payload CommentDTO commentDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
    	commentDTO.setPostedBy(SecurityUtils.getCurrentLogin());
        commentDTO.setCreatedAt(DateTime.now());
        log.debug("Sending comment tracking data {}", commentDTO);
        return commentDTO;
    }
}
