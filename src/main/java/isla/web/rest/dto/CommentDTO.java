package isla.web.rest.dto;

import isla.domain.Comment;

import javax.validation.constraints.Size;

import org.joda.time.DateTime;

/**
 * A DTO representing a comment.
 */
public class CommentDTO {
    @Size(min = 2, max = 512)        
    private String content;
    
    private String postedByLogin;

    private DateTime createdAt;
    
    public CommentDTO() {
    }

    public CommentDTO(Comment comment) {
        this(
    		comment.getContent(),
    		comment.getPostedBy().getLogin(),
    		comment.getCreatedAt()
		);
    }

    public CommentDTO(String content, String postedByLogin, DateTime createdAt) {
        this.content = content;
        this.postedByLogin = postedByLogin;
        this.createdAt = createdAt;
    }

    public String getContent(){
    	return content;
    }
    
    public void setPostedBy(String postedByLogin){
    	this.postedByLogin = postedByLogin;
    }
    
    public void setCreatedAt(DateTime createdAt){
    	this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
        "content='" + content + '\'' +
        ", postedByLogin='" + postedByLogin + '\'' +
        ", createdAt='" + createdAt +
        '}';
    }
}
