package br.org.ciag.gmf.domain;

import br.org.ciag.gmf.domain.enumeration.NumeroSemestre;
import br.org.ciag.gmf.domain.enumeration.NumeroTermo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Termos.
 */
@Entity
@Table(name = "termos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Termos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nome", nullable = false)
    private NumeroTermo nome;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "semestre", nullable = false)
    private NumeroSemestre semestre;

    @NotNull
    @Column(name = "ano", nullable = false)
    private String ano;

    @OneToMany(mappedBy = "termos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "resumos", "projetos", "termos" }, allowSetters = true)
    private Set<Disciplinas> disciplinas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Termos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NumeroTermo getNome() {
        return this.nome;
    }

    public Termos nome(NumeroTermo nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(NumeroTermo nome) {
        this.nome = nome;
    }

    public NumeroSemestre getSemestre() {
        return this.semestre;
    }

    public Termos semestre(NumeroSemestre semestre) {
        this.setSemestre(semestre);
        return this;
    }

    public void setSemestre(NumeroSemestre semestre) {
        this.semestre = semestre;
    }

    public String getAno() {
        return this.ano;
    }

    public Termos ano(String ano) {
        this.setAno(ano);
        return this;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public Set<Disciplinas> getDisciplinas() {
        return this.disciplinas;
    }

    public void setDisciplinas(Set<Disciplinas> disciplinas) {
        if (this.disciplinas != null) {
            this.disciplinas.forEach(i -> i.setTermos(null));
        }
        if (disciplinas != null) {
            disciplinas.forEach(i -> i.setTermos(this));
        }
        this.disciplinas = disciplinas;
    }

    public Termos disciplinas(Set<Disciplinas> disciplinas) {
        this.setDisciplinas(disciplinas);
        return this;
    }

    public Termos addDisciplinas(Disciplinas disciplinas) {
        this.disciplinas.add(disciplinas);
        disciplinas.setTermos(this);
        return this;
    }

    public Termos removeDisciplinas(Disciplinas disciplinas) {
        this.disciplinas.remove(disciplinas);
        disciplinas.setTermos(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Termos)) {
            return false;
        }
        return id != null && id.equals(((Termos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Termos{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", semestre='" + getSemestre() + "'" +
            ", ano='" + getAno() + "'" +
            "}";
    }
}
