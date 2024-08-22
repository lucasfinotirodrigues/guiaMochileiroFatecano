package br.org.ciag.gmf.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Disciplinas.
 */
@Entity
@Table(name = "disciplinas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Disciplinas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    @OneToMany(mappedBy = "disciplinas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "disciplinas" }, allowSetters = true)
    private Set<Resumos> resumos = new HashSet<>();

    @OneToMany(mappedBy = "disciplinas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "disciplinas" }, allowSetters = true)
    private Set<Projetos> projetos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "disciplinas" }, allowSetters = true)
    private Termos termos;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Disciplinas id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Disciplinas nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Disciplinas createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Set<Resumos> getResumos() {
        return this.resumos;
    }

    public void setResumos(Set<Resumos> resumos) {
        if (this.resumos != null) {
            this.resumos.forEach(i -> i.setDisciplinas(null));
        }
        if (resumos != null) {
            resumos.forEach(i -> i.setDisciplinas(this));
        }
        this.resumos = resumos;
    }

    public Disciplinas resumos(Set<Resumos> resumos) {
        this.setResumos(resumos);
        return this;
    }

    public Disciplinas addResumos(Resumos resumos) {
        this.resumos.add(resumos);
        resumos.setDisciplinas(this);
        return this;
    }

    public Disciplinas removeResumos(Resumos resumos) {
        this.resumos.remove(resumos);
        resumos.setDisciplinas(null);
        return this;
    }

    public Set<Projetos> getProjetos() {
        return this.projetos;
    }

    public void setProjetos(Set<Projetos> projetos) {
        if (this.projetos != null) {
            this.projetos.forEach(i -> i.setDisciplinas(null));
        }
        if (projetos != null) {
            projetos.forEach(i -> i.setDisciplinas(this));
        }
        this.projetos = projetos;
    }

    public Disciplinas projetos(Set<Projetos> projetos) {
        this.setProjetos(projetos);
        return this;
    }

    public Disciplinas addProjetos(Projetos projetos) {
        this.projetos.add(projetos);
        projetos.setDisciplinas(this);
        return this;
    }

    public Disciplinas removeProjetos(Projetos projetos) {
        this.projetos.remove(projetos);
        projetos.setDisciplinas(null);
        return this;
    }

    public Termos getTermos() {
        return this.termos;
    }

    public void setTermos(Termos termos) {
        this.termos = termos;
    }

    public Disciplinas termos(Termos termos) {
        this.setTermos(termos);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Disciplinas)) {
            return false;
        }
        return id != null && id.equals(((Disciplinas) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Disciplinas{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
