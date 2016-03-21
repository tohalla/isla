package isla.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import isla.domain.util.CustomDateTimeDeserializer;
import isla.domain.util.CustomDateTimeSerializer;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Comment.
 */
@Entity
@Table(name = "COMMENT")
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    @Column(name = "created_at")
    private DateTime createdAt;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "content", length = 512, nullable = false)
    private String content;

    @ManyToOne
    private User postedBy;

    @ManyToOne
    @JsonIgnore
    private Lecture lecture;

    @Column(name = "read")
    private boolean read;

    @Column(name = "deleted")
    private boolean deleted;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "COMMENT_SCORE", joinColumns = @JoinColumn(name = "comment_id"))
    @Column(name = "user_sid")
    private Set<String> likes = new HashSet<String>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(User user) {
        this.postedBy = user;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
    }

    public Set<String> getLikes() {
        return likes;
    }

    public void setLikes(Set<String> likes) {
        this.likes = likes;
    }

    public boolean getRead() {
        return read;
    }

    public boolean getDeleted() {
        return deleted;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Comment comment = (Comment) o;

        if (!Objects.equals(id, comment.id))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Comment{" + "id=" + id + ", createdAt='" + createdAt + "'" + ", content='" + content
                + ", read='" + read + "'" + ", deleted='" + deleted + "'" + '}';
    }

    public boolean addLike(String userSid) {
        if (likes.contains(userSid))
            return false;
        likes.add(userSid);
        return true;
    }

    public boolean markAsRead(User user) {
        if (lecture.getCourse().getModerators().contains(user)) {
            setRead(true);
            return true;
        }
        return false;
    }

    public boolean markAsDeleted(User user) {
        if (lecture.getCourse().getModerators().contains(user)) {
            setDeleted(true);
            return true;
        }
        return false;
    }
}
