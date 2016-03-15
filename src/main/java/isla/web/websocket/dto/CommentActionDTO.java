package isla.web.websocket.dto;

/**
 * A DTO representing a comment.
 */
public class CommentActionDTO {
    private String userSid;
    private String action;

    private long commentId;

    public CommentActionDTO() {}

    public CommentActionDTO(long commentId, String userSid, String action) {
        this.commentId = commentId;
        this.userSid = userSid;
        this.action = action;
    }

    public long getCommentId() {
        return commentId;
    }

    public void setComment(long commentId) {
        this.commentId = commentId;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }

    @Override
    public String toString() {
        return "CommentDTO{" + "commentId='" + commentId + '\'' + ",userSid='" + userSid + '\''
                + ",action='" + action + '\'' + '}';
    }

    public String getUserSid() {
        return userSid;
    }

    public void setScire(String userSid) {
        this.userSid = userSid;
    }
}
