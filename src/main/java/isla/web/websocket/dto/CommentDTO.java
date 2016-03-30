package isla.web.websocket.dto;

import isla.domain.Comment;
import isla.domain.MultipleChoiceOption;
import isla.domain.util.CustomDateTimeDeserializer;
import isla.domain.util.CustomDateTimeSerializer;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    
    private List<String> choices;

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    private DateTime createdAt;

    public CommentDTO() {}

    public CommentDTO(Comment comment) {
        this(comment.getId(), comment.getContent(), comment.getCreatedAt(), comment.getLiked(),
                comment.getRead(), comment.getDeleted(), comment.getChoices());
    }

    public CommentDTO(long id, String content, DateTime createdAt, int liked, boolean read, boolean deleted, List<MultipleChoiceOption> choices) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.liked = liked;
        this.read = read;
        this.deleted = deleted;
        this.choices = new ArrayList<String>();
        if(choices != null)
            for(MultipleChoiceOption choice : choices)
                this.choices.add(choice.getContent());
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

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }
    
    public List<String> getChoices() {
        return this.choices;
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
        return "CommentDTO{" + "id='" + id + '\'' + ",content='" + content + '\'' + ",choices='" + choices + '\'' + ",createdAt='"
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
