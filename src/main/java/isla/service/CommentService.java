package isla.service;

import isla.domain.Comment;
import isla.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

/**
 * Service class for managing comments.
 */
@Service
@Transactional
public class CommentService {
    
    @Inject
    private CommentRepository commentRepository;

    public Comment addLike(long commentId, String userSid){
        Comment comment = commentRepository.findOne(commentId);
    	if(comment.addLike(userSid))
    		commentRepository.save(comment);
    	else
    		return null;
        return comment;
    }
}
