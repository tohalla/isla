package isla.repository.search;

import isla.domain.Lecture;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Lecture entity.
 */
public interface LectureSearchRepository extends ElasticsearchRepository<Lecture, Long> {
}
