package isla.web.websocket.dto;

import isla.domain.Comment;
import isla.domain.util.CustomDateTimeDeserializer;
import isla.domain.util.CustomDateTimeSerializer;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * A DTO representing a comment.
 */
public class CommentDTO {
    private long id;

    @Size(min = 2, max = 512)
    private String content;

    private boolean read;

    private int liked;
    
    private boolean deleted;

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    private DateTime createdAt;

    public CommentDTO() {}

    public CommentDTO(Comment comment) {
        this(comment.getId(), comment.getContent(), comment.getCreatedAt(), comment.getLiked(),
                comment.getRead(), comment.getDeleted());
    }

    public CommentDTO(long id, String content, DateTime createdAt, int liked, boolean read, boolean deleted) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.liked = liked;
        this.read = read;
        this.deleted = deleted;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }


    public void setContent(String content) {
        this.content = content;
    }

    public DateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "CommentDTO{" + "id='" + id + '\'' + ",content='" + content + '\'' + ",createdAt='"
                + createdAt + '\'' + '}';
    }

    public int getLiked() {
        return liked;
    }

    public void setLiked(int liked) {
        this.liked = liked;
    }

    public boolean getRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
    public boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean read) {
        this.deleted = deleted;
    }

}
