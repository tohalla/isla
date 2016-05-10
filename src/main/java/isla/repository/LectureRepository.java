package isla.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import isla.domain.Course;
import isla.domain.Lecture;

/**
 * Spring Data JPA repository for the Lecture entity.
 */
public interface LectureRepository extends JpaRepository<Lecture,Long> {
    List<Lecture> findAllByCourse(Course course);

    @Query("select lecture from Lecture lecture where closesAt < CURRENT_TIMESTAMP() and (startsAt IS NULL OR startsAt > CURRENT_TIMESTAMP)")
    List<Lecture> findAllActive();
}
