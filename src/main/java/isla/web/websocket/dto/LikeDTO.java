package isla.web.websocket.dto;

/**
 * A DTO representing a comment.
 */
public class LikeDTO {    
	private String userSid;

    private long commentId;
    
    public LikeDTO() {
    }

    public LikeDTO(long commentId, String userSid) {
    	this.commentId = commentId;
    	this.userSid = userSid;
    }


	public long getCommentId() {
		return commentId;
	}

	public void setComment(long commentId) {
		this.commentId = commentId;
	}
    @Override
    public String toString() {
        return "CommentDTO{" +
        "commentId='" + commentId + '\'' +
        ",userSid='" + userSid + '\'' +
        '}';
    }

	public String getUserSid() {
		return userSid;
	}

	public void setScire(String userSid) {
		this.userSid = userSid;
	}
}
