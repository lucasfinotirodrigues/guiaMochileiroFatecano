package br.org.ciag.gmf.web.rest;

import br.org.ciag.gmf.domain.Projetos;
import br.org.ciag.gmf.repository.ProjetosRepository;
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
 * REST controller for managing {@link br.org.ciag.gmf.domain.Projetos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProjetosResource {

    private final Logger log = LoggerFactory.getLogger(ProjetosResource.class);

    private static final String ENTITY_NAME = "projetos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjetosRepository projetosRepository;

    public ProjetosResource(ProjetosRepository projetosRepository) {
        this.projetosRepository = projetosRepository;
    }

    /**
     * {@code POST  /projetos} : Create a new projetos.
     *
     * @param projetos the projetos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projetos, or with status {@code 400 (Bad Request)} if the projetos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/projetos")
    public ResponseEntity<Projetos> createProjetos(@Valid @RequestBody Projetos projetos) throws URISyntaxException {
        log.debug("REST request to save Projetos : {}", projetos);
        if (projetos.getId() != null) {
            throw new BadRequestAlertException("A new projetos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Projetos result = projetosRepository.save(projetos);
        return ResponseEntity
            .created(new URI("/api/projetos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /projetos/:id} : Updates an existing projetos.
     *
     * @param id the id of the projetos to save.
     * @param projetos the projetos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projetos,
     * or with status {@code 400 (Bad Request)} if the projetos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projetos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/projetos/{id}")
    public ResponseEntity<Projetos> updateProjetos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Projetos projetos
    ) throws URISyntaxException {
        log.debug("REST request to update Projetos : {}, {}", id, projetos);
        if (projetos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projetos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projetosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Projetos result = projetosRepository.save(projetos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projetos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /projetos/:id} : Partial updates given fields of an existing projetos, field will ignore if it is null
     *
     * @param id the id of the projetos to save.
     * @param projetos the projetos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projetos,
     * or with status {@code 400 (Bad Request)} if the projetos is not valid,
     * or with status {@code 404 (Not Found)} if the projetos is not found,
     * or with status {@code 500 (Internal Server Error)} if the projetos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/projetos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Projetos> partialUpdateProjetos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Projetos projetos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Projetos partially : {}, {}", id, projetos);
        if (projetos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projetos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projetosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Projetos> result = projetosRepository
            .findById(projetos.getId())
            .map(existingProjetos -> {
                if (projetos.getNome() != null) {
                    existingProjetos.setNome(projetos.getNome());
                }
                if (projetos.getAssunto() != null) {
                    existingProjetos.setAssunto(projetos.getAssunto());
                }

                return existingProjetos;
            })
            .map(projetosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projetos.getId().toString())
        );
    }

    /**
     * {@code GET  /projetos} : get all the projetos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projetos in body.
     */
    @GetMapping("/projetos")
    public ResponseEntity<List<Projetos>> getAllProjetos(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Projetos");
        Page<Projetos> page = projetosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /projetos/:id} : get the "id" projetos.
     *
     * @param id the id of the projetos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projetos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/projetos/{id}")
    public ResponseEntity<Projetos> getProjetos(@PathVariable Long id) {
        log.debug("REST request to get Projetos : {}", id);
        Optional<Projetos> projetos = projetosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projetos);
    }

    /**
     * {@code DELETE  /projetos/:id} : delete the "id" projetos.
     *
     * @param id the id of the projetos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/projetos/{id}")
    public ResponseEntity<Void> deleteProjetos(@PathVariable Long id) {
        log.debug("REST request to delete Projetos : {}", id);
        projetosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
