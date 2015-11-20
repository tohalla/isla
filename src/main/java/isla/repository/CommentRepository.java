package isla.repository;

import isla.domain.Comment;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Comment entity.
 */
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("select comment from Comment comment where comment.postedBy.login = ?#{principal.username}")
    List<Comment> findByPostedByIsCurrentUser();

}
