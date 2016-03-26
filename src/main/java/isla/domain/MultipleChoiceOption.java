package isla.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "MULTIPLECHOICE_OPTION")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MultipleChoiceOption implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "content", length = 512, nullable = false)
    private String content;

    @Column(name = "score")
    private int score;

    @NotNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    Comment parentComment;

    public MultipleChoiceOption() {
        super();
    }

    public MultipleChoiceOption(String content, Comment parentComment) {
        this.score = 0;
        this.parentComment = parentComment;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MultipleChoiceOption comment = (MultipleChoiceOption) o;

        if (!Objects.equals(id, comment.id) || !Objects.equals(content, comment.content))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MultipleChoiceOption{" + "id=" + id + ", content='" + content + '\'' + ", score='"
                + getScore() + "'" + '}';
    }
}
