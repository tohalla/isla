package isla.repository;

import isla.domain.Course;
import isla.domain.View;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Course entity.
 */
public interface CourseRepository extends JpaRepository<Course,Long> {

    List<Course> findAllByView(View view);
}
