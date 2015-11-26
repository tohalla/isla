package isla.web.rest;

import com.codahale.metrics.annotation.Timed;
import isla.domain.Comment;
import isla.repository.CommentRepository;
import isla.repository.search.CommentSearchRepository;
import isla.security.AuthoritiesConstants;
import isla.web.rest.util.HeaderUtil;
import isla.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Comment.
 */
@RestController
@RequestMapping("/api")
public class CommentResource {

    private final Logger log = LoggerFactory.getLogger(CommentResource.class);

    @Inject
    private CommentRepository commentRepository;

    @Inject
    private CommentSearchRepository commentSearchRepository;

    /**
     * POST  /comments -> Create a new comment.
     */
    @RequestMapping(value = "/comments",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Comment> createComment(@Valid @RequestBody Comment comment) throws URISyntaxException {
        log.debug("REST request to save Comment : {}", comment);
        if (comment.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new comment cannot already have an ID").body(null);
        }
        Comment result = commentRepository.save(comment);
        commentSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/comments/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("comment", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /comments -> Updates an existing comment.
     */
    @RequestMapping(value = "/comments",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured({AuthoritiesConstants.USER,AuthoritiesConstants.ADMIN}) /* REPLACE USER WITH TEACHER WHEN GENERATED */
    public ResponseEntity<Comment> updateComment(@Valid @RequestBody Comment comment) throws URISyntaxException {
        log.debug("REST request to update Comment : {}", comment);
        if (comment.getId() == null) {
            return createComment(comment);
        }
        Comment result = commentRepository.save(comment);
        commentSearchRepository.save(comment);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("comment", comment.getId().toString()))
                .body(result);
    }

    /**
     * GET  /comments -> get all the comments.
     */
    @RequestMapping(value = "/comments",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Comment>> getAllComments(Pageable pageable)
        throws URISyntaxException {
        Page<Comment> page = commentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /comments/:id -> get the "id" comment.
     */
    @RequestMapping(value = "/comments/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
        log.debug("REST request to get Comment : {}", id);
        return Optional.ofNullable(commentRepository.findOne(id))
            .map(comment -> new ResponseEntity<>(
                comment,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /comments/:id -> delete the "id" comment.
     */
    @RequestMapping(value = "/comments/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured({AuthoritiesConstants.USER,AuthoritiesConstants.ADMIN}) /* REPLACE USER WITH TEACHER WHEN GENERATED */
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        log.debug("REST request to delete Comment : {}", id);
        commentRepository.delete(id);
        commentSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("comment", id.toString())).build();
    }

    /**
     * SEARCH  /_search/comments/:query -> search for the comment corresponding
     * to the query.
     */
    @RequestMapping(value = "/_search/comments/{query}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Comment> searchComments(@PathVariable String query) {
        return StreamSupport
            .stream(commentSearchRepository.search(queryString(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
