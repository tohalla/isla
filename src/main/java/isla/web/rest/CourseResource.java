package isla.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import isla.domain.Course;
import isla.domain.Lecture;
import isla.domain.User;
import isla.repository.CourseRepository;
import isla.repository.LectureRepository;
import isla.security.AuthoritiesConstants;
import isla.web.rest.util.HeaderUtil;

/**
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api")
public class CourseResource {

    private final Logger log = LoggerFactory.getLogger(CourseResource.class);

    @Inject
    private CourseRepository courseRepository;

    @Inject
    private LectureRepository lectureRepository;

    /**
     * POST /courses -> Create a new course.
     */
    @RequestMapping(value = "/courses", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured({AuthoritiesConstants.TEACHER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Course> createCourse(@RequestBody Course course)
            throws URISyntaxException {
        log.debug("REST request to save Course : {}", course);
        if (course.getId() != null) {
            return ResponseEntity.badRequest()
                    .header("Failure", "A new course cannot already have an ID").body(null);
        }
        Course result = courseRepository.save(course);
        return ResponseEntity.created(new URI("/api/courses/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("course", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /courses -> Updates an existing course.
     */
    @RequestMapping(value = "/courses", method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured({AuthoritiesConstants.TEACHER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Course> updateCourse(@RequestBody Course course)
            throws URISyntaxException {
        log.debug("REST request to update Course : {}", course);
        if (course.getId() == null) {
            return createCourse(course);
        }
        Course result = courseRepository.save(course);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("course", course.getId().toString()))
                .body(result);
    }

    /**
     * GET /courses -> get all the courses.
     */
    @RequestMapping(value = "/courses", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Course> getAllCourses() {
        log.debug("REST request to get all Courses");
        return courseRepository.findAll();
    }

    /**
     * GET /courses/:id -> get the "id" course.
     */
    @RequestMapping(value = "/courses/{id}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        log.debug("REST request to get Course : {}", id);
        return Optional.ofNullable(courseRepository.findOne(id))
                .map(course -> new ResponseEntity<>(course, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * GET /courses/:id/moderators -> get the "id" course moderators.
     */
    @RequestMapping(value = "/courses/{id}/moderators", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Long>> getCoureModerators(@PathVariable Long id) {
        log.debug("REST request to get Course : {} moderators", id);
        Course course = courseRepository.findOne(id);
        if (course == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Set<User> moderators = courseRepository.findOne(id).getModerators();
        if (moderators == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        List<Long> moderatorsId = new ArrayList<Long>();
        for (User moderator : moderators) {
            moderatorsId.add(moderator.getId());
        }
        return new ResponseEntity<>(moderatorsId, HttpStatus.OK);
    }

    /**
     * DELETE /courses/:id -> delete the "id" course.
     */
    @RequestMapping(value = "/courses/{id}", method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured({AuthoritiesConstants.TEACHER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        log.debug("REST request to delete Course : {}", id);
        courseRepository.delete(id);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityDeletionAlert("course", id.toString())).build();
    }

    /**
     * GET /courses/:id/lectures -> get all the lectures of the course.
     */
    @RequestMapping(value = "/courses/{id}/lectures", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Lecture>> getAllLectures(@PathVariable Long id) {
        log.debug("REST request to get all lectures of the course");

        return Optional.ofNullable(courseRepository.findOne(id))
                .map(course -> new ResponseEntity<>(lectureRepository.findAllByCourse(course),
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
