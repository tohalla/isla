package isla.web.websocket.dto;

import isla.domain.Comment;
import isla.domain.util.CustomDateTimeDeserializer;
import isla.domain.util.CustomDateTimeSerializer;

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

    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @JsonSerialize(using = CustomDateTimeSerializer.class)
    @JsonDeserialize(using = CustomDateTimeDeserializer.class)
    private DateTime createdAt;
    
    public CommentDTO() {
    }

    public CommentDTO(Comment comment) {
        this(
        	comment.getId(),
    		comment.getContent(),
    		comment.getCreatedAt()
		);
    }

    public CommentDTO(long id, String content, DateTime createdAt) {
    	this.id = id;
        this.content = content;
        this.createdAt = createdAt;
    }

    public String getContent(){
    	return content;
    }
    
    
    public void setContent(String content){
    	this.content = content;
    }
    
    public DateTime getCreatedAt(){
    	return this.createdAt;
    }
    
    public void setCreatedAt(DateTime createdAt){
    	this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
        "id='" + id + '\'' +
        ",content='" + content + '\'' +
        ",createdAt='" + createdAt + '\'' +
        '}';
    }

}
