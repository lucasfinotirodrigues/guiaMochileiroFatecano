package br.org.ciag.gmf.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Projetos.
 */
@Entity
@Table(name = "projetos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Projetos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "assunto", nullable = false)
    private String assunto;

    @ManyToOne
    @JsonIgnoreProperties(value = { "resumos", "projetos", "termos" }, allowSetters = true)
    private Disciplinas disciplinas;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Projetos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Projetos nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getAssunto() {
        return this.assunto;
    }

    public Projetos assunto(String assunto) {
        this.setAssunto(assunto);
        return this;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public Disciplinas getDisciplinas() {
        return this.disciplinas;
    }

    public void setDisciplinas(Disciplinas disciplinas) {
        this.disciplinas = disciplinas;
    }

    public Projetos disciplinas(Disciplinas disciplinas) {
        this.setDisciplinas(disciplinas);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projetos)) {
            return false;
        }
        return id != null && id.equals(((Projetos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Projetos{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", assunto='" + getAssunto() + "'" +
            "}";
    }
}
