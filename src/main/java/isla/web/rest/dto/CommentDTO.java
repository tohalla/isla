package isla.web.rest.dto;

import isla.domain.Comment;

import javax.validation.constraints.Size;

import org.joda.time.DateTime;

/**
 * A DTO representing a comment.
 */
public class CommentDTO {
	private long id;
	
    @Size(min = 2, max = 512)        
    private String content;
    
    private String postedByLogin;

    private DateTime createdAt;
    
    public CommentDTO() {
    }

    public CommentDTO(Comment comment) {
        this(
        	comment.getId(),
    		comment.getContent(),
    		comment.getPostedBy().getLogin(),
    		comment.getCreatedAt()
		);
    }

    public CommentDTO(long id, String content, String postedByLogin, DateTime createdAt) {
    	this.id = id;
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
    
    public void setContent(String content){
    	this.content = content;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
        "id='" + id + '\'' +
        ",content='" + content + '\'' +
        ", postedByLogin='" + postedByLogin + '\'' +
        ", createdAt='" + createdAt +
        '}';
    }
}
