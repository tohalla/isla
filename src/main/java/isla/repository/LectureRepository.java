package isla.repository;

import isla.domain.Lecture;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Lecture entity.
 */
public interface LectureRepository extends JpaRepository<Lecture,Long> {

}
