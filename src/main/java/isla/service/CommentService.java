package isla.service;

import isla.domain.Comment;
import isla.repository.CommentRepository;
import isla.repository.UserRepository;
import isla.security.SecurityUtils;

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

    @Inject
    private UserRepository userRepository;

    public Comment markAsRead(long commentId) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment
                .markAsRead(userRepository.findOneByLogin(SecurityUtils.getCurrentLogin()).get()))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }

    public Comment markAsDeleted(long commentId) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.markAsDeleted(
                userRepository.findOneByLogin(SecurityUtils.getCurrentLogin()).get()))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }

    public Comment addLike(long commentId, String user) {
        Comment comment = commentRepository.findOne(commentId);
        if (comment.addLike(user))
            commentRepository.save(comment);
        else
            return null;
        return comment;
    }
}
