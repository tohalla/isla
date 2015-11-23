package isla.web.websocket.dto;

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
    
    public CommentDTO() {
    }

    public CommentDTO(Comment comment) {
        this(
        	comment.getId(),
    		comment.getContent()
		);
    }

    public CommentDTO(long id, String content) {
    	this.id = id;
        this.content = content;
    }

    public String getContent(){
    	return content;
    }
    
    
    public void setContent(String content){
    	this.content = content;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
        "id='" + id + '\'' +
        ",content='" + content + '\'' +
        '}';
    }
}
