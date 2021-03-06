package isla.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import isla.security.AuthoritiesConstants;
import isla.security.SecurityUtils;
import isla.security.UserAuthentication;
import isla.web.rest.dto.CourseDTO;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Course.
 */
@Entity
@Table(name = "COURSE")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 2, max = 255)
    @Column(name = "course_name")
    private String courseName;

    @Size(max = 512)
    @Column(name = "course_description")
    private String courseDescription;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "course_moderators",
            joinColumns = {@JoinColumn(name = "course_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<User> moderators = new HashSet<>();

    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lecture> lectures = new HashSet<>();

    @ManyToOne
    private View view;

    @JsonProperty("hasModeratorRights")
    public boolean getHasModeratorRights() {
        if (SecurityUtils.isUserInRole(AuthoritiesConstants.ADMIN))
            return true;
        for (User moderator : this.moderators) {
            if (moderator.getLogin().equals(SecurityUtils.getCurrentLogin()))
                return true;
        }
        return false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public void setLectures(Set<Lecture> lectures) {
        this.lectures = lectures;
    }

    public void setModerators(Set<User> moderators) {
        this.moderators = moderators;
    }

    public Set<Lecture> getLectures() {
        return lectures;
    }

    public Set<User> getModerators() {
        return moderators;
    }

    public void setView(View view) {
        this.view = view;
    }

    public View getView() {
        return this.view;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Course course = (Course) o;

        if (!Objects.equals(id, course.id))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Course{" + "id=" + id + ", course_name='" + courseName + "'"
                + ", course_description='" + courseDescription + "'" + ", moderators='" + moderators
                + "'" + '}';
    }

}
