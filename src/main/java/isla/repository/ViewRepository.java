package isla.repository;

import org.springframework.data.jpa.repository.*;

import isla.domain.View;

import java.util.List;

/**
 * Spring Data JPA repository for the Course entity.
 */
public interface ViewRepository extends JpaRepository<View,Long> {

    List<View> findByMenuItemTrue();

}
