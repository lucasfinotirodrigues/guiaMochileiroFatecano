package br.org.ciag.gmf.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Resumos.
 */
@Entity
@Table(name = "resumos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Resumos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "assunto", nullable = false)
    private String assunto;

    @Lob
    @Column(name = "resumo", nullable = false)
    private String resumo;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @ManyToOne
    @JsonIgnoreProperties(value = { "resumos", "projetos", "termos" }, allowSetters = true)
    private Disciplinas disciplinas;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Resumos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAssunto() {
        return this.assunto;
    }

    public Resumos assunto(String assunto) {
        this.setAssunto(assunto);
        return this;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public String getResumo() {
        return this.resumo;
    }

    public Resumos resumo(String resumo) {
        this.setResumo(resumo);
        return this;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Resumos createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Disciplinas getDisciplinas() {
        return this.disciplinas;
    }

    public void setDisciplinas(Disciplinas disciplinas) {
        this.disciplinas = disciplinas;
    }

    public Resumos disciplinas(Disciplinas disciplinas) {
        this.setDisciplinas(disciplinas);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resumos)) {
            return false;
        }
        return id != null && id.equals(((Resumos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resumos{" +
            "id=" + getId() +
            ", assunto='" + getAssunto() + "'" +
            ", resumo='" + getResumo() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
