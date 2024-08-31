package br.org.ciag.gmf.web.rest;

import br.org.ciag.gmf.domain.Disciplinas;
import br.org.ciag.gmf.repository.DisciplinasRepository;
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
 * REST controller for managing {@link br.org.ciag.gmf.domain.Disciplinas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DisciplinasResource {

    private final Logger log = LoggerFactory.getLogger(DisciplinasResource.class);

    private static final String ENTITY_NAME = "disciplinas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisciplinasRepository disciplinasRepository;

    public DisciplinasResource(DisciplinasRepository disciplinasRepository) {
        this.disciplinasRepository = disciplinasRepository;
    }

    /**
     * {@code POST  /disciplinas} : Create a new disciplinas.
     *
     * @param disciplinas the disciplinas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disciplinas, or with status {@code 400 (Bad Request)} if the disciplinas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disciplinas")
    public ResponseEntity<Disciplinas> createDisciplinas(@Valid @RequestBody Disciplinas disciplinas) throws URISyntaxException {
        log.debug("REST request to save Disciplinas : {}", disciplinas);
        if (disciplinas.getId() != null) {
            throw new BadRequestAlertException("A new disciplinas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disciplinas result = disciplinasRepository.save(disciplinas);
        return ResponseEntity
            .created(new URI("/api/disciplinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /disciplinas/:id} : Updates an existing disciplinas.
     *
     * @param id the id of the disciplinas to save.
     * @param disciplinas the disciplinas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disciplinas,
     * or with status {@code 400 (Bad Request)} if the disciplinas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disciplinas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disciplinas/{id}")
    public ResponseEntity<Disciplinas> updateDisciplinas(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Disciplinas disciplinas
    ) throws URISyntaxException {
        log.debug("REST request to update Disciplinas : {}, {}", id, disciplinas);
        if (disciplinas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disciplinas.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disciplinasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Disciplinas result = disciplinasRepository.save(disciplinas);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disciplinas.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /disciplinas/:id} : Partial updates given fields of an existing disciplinas, field will ignore if it is null
     *
     * @param id the id of the disciplinas to save.
     * @param disciplinas the disciplinas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disciplinas,
     * or with status {@code 400 (Bad Request)} if the disciplinas is not valid,
     * or with status {@code 404 (Not Found)} if the disciplinas is not found,
     * or with status {@code 500 (Internal Server Error)} if the disciplinas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disciplinas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Disciplinas> partialUpdateDisciplinas(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Disciplinas disciplinas
    ) throws URISyntaxException {
        log.debug("REST request to partial update Disciplinas partially : {}, {}", id, disciplinas);
        if (disciplinas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, disciplinas.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disciplinasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Disciplinas> result = disciplinasRepository
            .findById(disciplinas.getId())
            .map(existingDisciplinas -> {
                if (disciplinas.getNome() != null) {
                    existingDisciplinas.setNome(disciplinas.getNome());
                }
                if (disciplinas.getCreatedDate() != null) {
                    existingDisciplinas.setCreatedDate(disciplinas.getCreatedDate());
                }

                return existingDisciplinas;
            })
            .map(disciplinasRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disciplinas.getId().toString())
        );
    }

    /**
     * {@code GET  /disciplinas} : get all the disciplinas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disciplinas in body.
     */
    @GetMapping("/disciplinas")
    public ResponseEntity<List<Disciplinas>> getAllDisciplinas(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Disciplinas");
        Page<Disciplinas> page = disciplinasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disciplinas/:id} : get the "id" disciplinas.
     *
     * @param id the id of the disciplinas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disciplinas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disciplinas/{id}")
    public ResponseEntity<Disciplinas> getDisciplinas(@PathVariable Long id) {
        log.debug("REST request to get Disciplinas : {}", id);
        Optional<Disciplinas> disciplinas = disciplinasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(disciplinas);
    }

    /**
     * {@code DELETE  /disciplinas/:id} : delete the "id" disciplinas.
     *
     * @param id the id of the disciplinas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disciplinas/{id}")
    public ResponseEntity<Void> deleteDisciplinas(@PathVariable Long id) {
        log.debug("REST request to delete Disciplinas : {}", id);
        disciplinasRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
