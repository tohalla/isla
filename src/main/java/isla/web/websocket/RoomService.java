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
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import java.security.Principal;

@Controller
public class RoomService {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);


    @Inject
    SimpMessageSendingOperations messagingTemplate;

    @SubscribeMapping("/topic/comment")
    @SendTo("/topic/room")
    public CommentDTO sendComment(@Payload CommentDTO commentDTO) {
    	commentDTO.setPostedBy(SecurityUtils.getCurrentLogin());
        commentDTO.setCreatedAt(DateTime.now());
        log.debug("Sending comment tracking data {}", commentDTO);
        return commentDTO;
    }
}
