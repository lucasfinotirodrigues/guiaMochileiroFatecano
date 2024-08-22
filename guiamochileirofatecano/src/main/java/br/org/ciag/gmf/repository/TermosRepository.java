package br.org.ciag.gmf.repository;

import br.org.ciag.gmf.domain.Termos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Termos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TermosRepository extends JpaRepository<Termos, Long> {}
