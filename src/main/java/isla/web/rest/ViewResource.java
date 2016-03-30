package isla.web.rest;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import isla.domain.Course;
import isla.domain.User;
import isla.domain.View;
import isla.repository.CourseRepository;
import isla.repository.ViewRepository;
import isla.web.rest.util.PaginationUtil;

/**
 * REST controller for managing View.
 */
@RestController
@RequestMapping("/api")
public class ViewResource {
    @Inject
    private ViewRepository viewRepository;
    @Inject
    private CourseRepository courseRepository;
    /**
     * POST  /views -> Create a new view.
     */
    /**
     * PUT  /views -> Updates an existing view.
     */
    /**
     * GET  /views -> get all views.
     */
    /**
     * GET /views/:id/courses -> get all the courses of the view.
     */
    @RequestMapping(value = "/views/{id}/courses", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Course>> getAllCourses(@PathVariable Long id) {
        return Optional.ofNullable(viewRepository.findOne(id))
                .map(view -> new ResponseEntity<>(courseRepository.findAllByView(view),
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    /**
     * GET  /views/menu -> get all views marked as menu items.
     */
    @RequestMapping(value = "/views/menu",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
        @Timed
        @Transactional(readOnly = true)
        public ResponseEntity<List<View>> getAllViewsMarkedAsMenuItems()
            throws URISyntaxException {
            return Optional.ofNullable(viewRepository.findByMenuItemTrue())
                    .map(view -> new ResponseEntity<>(viewRepository.findByMenuItemTrue(),
                            HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
    /**
     * DELETE /views/:id -> delete the "id" view.
     */
}
