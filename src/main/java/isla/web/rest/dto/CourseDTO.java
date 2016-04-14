package isla.web.rest.dto;

import isla.domain.Course;
import isla.domain.View;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A DTO representing a course.
 */
public class CourseDTO {

    private long id;

    @NotNull
    @Size(min = 2, max = 255)
    @Column(name = "course_name")
    private String courseName;

    @Size(max = 512)
    @Column(name = "course_description")
    private String courseDescription;
    
    private View view;
    
    private boolean hasModeratorRights;

    public CourseDTO(Course course) {
        this.id = course.getId();
        this.courseName = course.getCourseName();
        this.courseDescription = course.getCourseDescription();
        this.view = course.getView();
        this.hasModeratorRights = course.getHasModeratorRights();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public View getView() {
        return view;
    }

    public void setView(View view) {
        this.view = view;
    }

    public boolean isHasModeratorRights() {
        return hasModeratorRights;
    }

    public void setHasModeratorRights(boolean hasModeratorRights) {
        this.hasModeratorRights = hasModeratorRights;
    }
}
