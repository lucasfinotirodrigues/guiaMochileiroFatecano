package br.org.ciag.gmf.repository;

import br.org.ciag.gmf.domain.Projetos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Projetos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetosRepository extends JpaRepository<Projetos, Long> {}
