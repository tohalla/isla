package isla.repository.search;

import isla.domain.Course;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Course entity.
 */
public interface CourseSearchRepository extends ElasticsearchRepository<Course, Long> {
}
