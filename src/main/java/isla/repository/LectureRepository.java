package isla.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import isla.domain.Course;
import isla.domain.Lecture;

/**
 * Spring Data JPA repository for the Lecture entity.
 */
public interface LectureRepository extends JpaRepository<Lecture,Long> {
	List<Lecture> findAllByCourse(Course course);
}
