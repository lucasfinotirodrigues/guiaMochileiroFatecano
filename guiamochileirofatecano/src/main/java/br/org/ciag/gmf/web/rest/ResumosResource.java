package br.org.ciag.gmf.web.rest;

import br.org.ciag.gmf.domain.Resumos;
import br.org.ciag.gmf.repository.ResumosRepository;
import br.org.ciag.gmf.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.org.ciag.gmf.domain.Resumos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ResumosResource {

    private final Logger log = LoggerFactory.getLogger(ResumosResource.class);

    private static final String ENTITY_NAME = "resumos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResumosRepository resumosRepository;

    public ResumosResource(ResumosRepository resumosRepository) {
        this.resumosRepository = resumosRepository;
    }

    /**
     * {@code POST  /resumos} : Create a new resumos.
     *
     * @param resumos the resumos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new resumos, or with status {@code 400 (Bad Request)} if the resumos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/resumos")
    public ResponseEntity<Resumos> createResumos(@Valid @RequestBody Resumos resumos) throws URISyntaxException {
        log.debug("REST request to save Resumos : {}", resumos);
        if (resumos.getId() != null) {
            throw new BadRequestAlertException("A new resumos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Resumos result = resumosRepository.save(resumos);
        return ResponseEntity
            .created(new URI("/api/resumos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /resumos/:id} : Updates an existing resumos.
     *
     * @param id the id of the resumos to save.
     * @param resumos the resumos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated resumos,
     * or with status {@code 400 (Bad Request)} if the resumos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the resumos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/resumos/{id}")
    public ResponseEntity<Resumos> updateResumos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Resumos resumos
    ) throws URISyntaxException {
        log.debug("REST request to update Resumos : {}, {}", id, resumos);
        if (resumos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, resumos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!resumosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Resumos result = resumosRepository.save(resumos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, resumos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /resumos/:id} : Partial updates given fields of an existing resumos, field will ignore if it is null
     *
     * @param id the id of the resumos to save.
     * @param resumos the resumos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated resumos,
     * or with status {@code 400 (Bad Request)} if the resumos is not valid,
     * or with status {@code 404 (Not Found)} if the resumos is not found,
     * or with status {@code 500 (Internal Server Error)} if the resumos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/resumos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Resumos> partialUpdateResumos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Resumos resumos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Resumos partially : {}, {}", id, resumos);
        if (resumos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, resumos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!resumosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Resumos> result = resumosRepository
            .findById(resumos.getId())
            .map(existingResumos -> {
                if (resumos.getAssunto() != null) {
                    existingResumos.setAssunto(resumos.getAssunto());
                }
                if (resumos.getResumo() != null) {
                    existingResumos.setResumo(resumos.getResumo());
                }
                if (resumos.getCreatedDate() != null) {
                    existingResumos.setCreatedDate(resumos.getCreatedDate());
                }

                return existingResumos;
            })
            .map(resumosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, resumos.getId().toString())
        );
    }

    /**
     * {@code GET  /resumos} : get all the resumos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of resumos in body.
     */
    @GetMapping("/resumos")
    public ResponseEntity<List<Resumos>> getAllResumos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Resumos");
        Page<Resumos> page = resumosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /resumos/:id} : get the "id" resumos.
     *
     * @param id the id of the resumos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the resumos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/resumos/{id}")
    public ResponseEntity<Resumos> getResumos(@PathVariable Long id) {
        log.debug("REST request to get Resumos : {}", id);
        Optional<Resumos> resumos = resumosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(resumos);
    }

    /**
     * {@code DELETE  /resumos/:id} : delete the "id" resumos.
     *
     * @param id the id of the resumos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/resumos/{id}")
    public ResponseEntity<Void> deleteResumos(@PathVariable Long id) {
        log.debug("REST request to delete Resumos : {}", id);
        resumosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
