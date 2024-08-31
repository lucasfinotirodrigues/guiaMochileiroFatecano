package br.org.ciag.gmf.web.rest;

import br.org.ciag.gmf.domain.Termos;
import br.org.ciag.gmf.repository.TermosRepository;
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
 * REST controller for managing {@link br.org.ciag.gmf.domain.Termos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TermosResource {

    private final Logger log = LoggerFactory.getLogger(TermosResource.class);

    private static final String ENTITY_NAME = "termos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TermosRepository termosRepository;

    public TermosResource(TermosRepository termosRepository) {
        this.termosRepository = termosRepository;
    }

    /**
     * {@code POST  /termos} : Create a new termos.
     *
     * @param termos the termos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new termos, or with status {@code 400 (Bad Request)} if the termos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/termos")
    public ResponseEntity<Termos> createTermos(@Valid @RequestBody Termos termos) throws URISyntaxException {
        log.debug("REST request to save Termos : {}", termos);
        if (termos.getId() != null) {
            throw new BadRequestAlertException("A new termos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Termos result = termosRepository.save(termos);
        return ResponseEntity
            .created(new URI("/api/termos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /termos/:id} : Updates an existing termos.
     *
     * @param id the id of the termos to save.
     * @param termos the termos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated termos,
     * or with status {@code 400 (Bad Request)} if the termos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the termos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/termos/{id}")
    public ResponseEntity<Termos> updateTermos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Termos termos
    ) throws URISyntaxException {
        log.debug("REST request to update Termos : {}, {}", id, termos);
        if (termos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, termos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!termosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Termos result = termosRepository.save(termos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, termos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /termos/:id} : Partial updates given fields of an existing termos, field will ignore if it is null
     *
     * @param id the id of the termos to save.
     * @param termos the termos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated termos,
     * or with status {@code 400 (Bad Request)} if the termos is not valid,
     * or with status {@code 404 (Not Found)} if the termos is not found,
     * or with status {@code 500 (Internal Server Error)} if the termos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/termos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Termos> partialUpdateTermos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Termos termos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Termos partially : {}, {}", id, termos);
        if (termos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, termos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!termosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Termos> result = termosRepository
            .findById(termos.getId())
            .map(existingTermos -> {
                if (termos.getNome() != null) {
                    existingTermos.setNome(termos.getNome());
                }
                if (termos.getSemestre() != null) {
                    existingTermos.setSemestre(termos.getSemestre());
                }
                if (termos.getAno() != null) {
                    existingTermos.setAno(termos.getAno());
                }

                return existingTermos;
            })
            .map(termosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, termos.getId().toString())
        );
    }

    /**
     * {@code GET  /termos} : get all the termos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of termos in body.
     */
    @GetMapping("/termos")
    public ResponseEntity<List<Termos>> getAllTermos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Termos");
        Page<Termos> page = termosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /termos/:id} : get the "id" termos.
     *
     * @param id the id of the termos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the termos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/termos/{id}")
    public ResponseEntity<Termos> getTermos(@PathVariable Long id) {
        log.debug("REST request to get Termos : {}", id);
        Optional<Termos> termos = termosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(termos);
    }

    /**
     * {@code DELETE  /termos/:id} : delete the "id" termos.
     *
     * @param id the id of the termos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/termos/{id}")
    public ResponseEntity<Void> deleteTermos(@PathVariable Long id) {
        log.debug("REST request to delete Termos : {}", id);
        termosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
