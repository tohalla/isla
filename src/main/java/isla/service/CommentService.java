package isla.service;

import isla.domain.Comment;
import isla.domain.MultipleChoiceOption;
import isla.repository.CommentRepository;
import isla.repository.UserRepository;
import isla.security.SecurityUtils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

import javax.inject.Inject;

/**
 * Service class for managing comments.
 */
@Service
@Transactional
public class CommentService {

    @Inject
    private CommentRepository commentRepository;

    @Inject
    private UserRepository userRepository;

    public Comment markAsRead(long commentId, Authentication auth) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.markAsRead(auth))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }

    public Comment markAsDeleted(long commentId, Authentication auth) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.markAsDeleted(auth))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }

    public Comment addLike(long commentId, String username) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.addLike(username))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }

    public Comment voteFor(long commentId, long choiceId, String username) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.addLike(username)) {
            for (MultipleChoiceOption c : comment.getChoices()) {
                if (c.getId().equals(choiceId)){
                    c.setScore(c.getScore() + 1);
                    break;
                }
            }
            commentRepository.save(comment);
        }
        else
            return null;
        return comment;
    }
}
