package isla.web.rest.dto;

import isla.domain.Lecture;

import org.joda.time.DateTime;


/**
 * A DTO representing a lecture.
 */
public class LectureDTO {

    private Long id;

    private DateTime createdAt;

    private DateTime startsAt;

    private DateTime closesAt;

    private String description;

    private CourseDTO course;

    public LectureDTO(Lecture lecture) {
        this.id = lecture.getId();
        this.createdAt = lecture.getCreatedAt();
        this.startsAt = lecture.getStartsAt();
        this.closesAt = lecture.getClosesAt();
        this.description = lecture.getDescription();
        if(lecture.getCourse() != null) {
            this.course = new CourseDTO(lecture.getCourse());
        }
    }
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }

    public DateTime getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(DateTime startsAt) {
        this.startsAt = startsAt;
    }

    public DateTime getClosesAt() {
        return closesAt;
    }

    public void setClosesAt(DateTime closesAt) {
        this.closesAt = closesAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }
}
