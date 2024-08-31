package br.org.ciag.gmf.repository;

import br.org.ciag.gmf.domain.Resumos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Resumos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResumosRepository extends JpaRepository<Resumos, Long> {}
