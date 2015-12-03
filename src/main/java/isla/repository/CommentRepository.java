package isla.repository;

import isla.domain.Comment;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Comment entity.
 */
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("select comment from Comment comment where comment.postedBy.login = ?#{principal.username}")
    List<Comment> findByPostedByIsCurrentUser();
    
    @Query("SELECT comment FROM Comment comment WHERE " +
            "comment.lecture.id=:lectureId")
    List<Comment> findByPostedByLectureId(@Param("lectureId") Long lectureId);

}
