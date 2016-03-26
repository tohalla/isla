package isla.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import isla.domain.util.CustomDateTimeDeserializer;
import isla.domain.util.CustomDateTimeSerializer;
import isla.security.AuthoritiesConstants;
import isla.security.SecurityUtils;
import isla.security.UserAuthentication;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @Column(name = "pinned")
    private boolean pinned;

    @Column(name = "deleted")
    private boolean deleted;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonInclude(Include.NON_EMPTY)
    private List<MultipleChoiceOption> choices;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "COMMENT_SCORE", joinColumns = @JoinColumn(name = "comment_id"))
    @Column(name = "user_sid")
    @JsonIgnore
    private Set<String> likes = new HashSet<String>();

    @JsonProperty("liked")
    public int getLiked() {
        return likes.size();
    }

    @JsonProperty("allowLike")
    public boolean getAllowLike() {
        return !this.likes.contains(SecurityUtils.getCurrentLogin());
    }
    
    @Transactional
    public List<MultipleChoiceOption> getChoices() {
        return choices;
    }

    public void setChoicesAsString(List<String> choices) {
        this.choices = new ArrayList<MultipleChoiceOption>();
        for (String content : choices) {
            this.choices.add(new MultipleChoiceOption(content, this));
        } ;
    }

    public void setChoices(List<MultipleChoiceOption> choices) {
        this.choices = choices;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt() {
        if (this.createdAt == null)
            this.createdAt = new DateTime();
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

    public void sePinned(boolean pinned) {
        this.pinned = pinned;
    }

    public boolean getPinned() {
        return pinned;
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
        return "Comment{" + "id=" + id + ", createdAt='" + createdAt + "'" + ", choices='" + choices
                + "'" + ", content='" + content + "', liked='" + getLiked() + "'" + ", read='"
                + read + "'" + ", deleted='" + deleted + "'" + '}';
    }

    public boolean addLike(String username) {
        if (likes.contains(username))
            return false;
        likes.add(username);
        return true;
    }

    public boolean markAsRead(Authentication auth) {
        if (auth instanceof UserAuthentication) {
            if (lecture.getCourse().getModerators()
                    .contains(((UserAuthentication) auth).getDetails())
                    || auth.getAuthorities().contains(AuthoritiesConstants.ADMIN)) {
                setRead(true);
                return true;
            }
        }
        return false;
    }

    public boolean markAsDeleted(Authentication auth) {
        if (auth instanceof UserAuthentication) {
            if (lecture.getCourse().getModerators()
                    .contains(((UserAuthentication) auth).getDetails())
                    || auth.getAuthorities().contains(AuthoritiesConstants.ADMIN)) {
                setDeleted(true);
                return true;
            }
        }
        return false;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }
}
