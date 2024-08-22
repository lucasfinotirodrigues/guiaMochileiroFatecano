package br.org.ciag.gmf.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.gmf.IntegrationTest;
import br.org.ciag.gmf.domain.Projetos;
import br.org.ciag.gmf.repository.ProjetosRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProjetosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProjetosResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ASSUNTO = "AAAAAAAAAA";
    private static final String UPDATED_ASSUNTO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/projetos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProjetosRepository projetosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjetosMockMvc;

    private Projetos projetos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Projetos createEntity(EntityManager em) {
        Projetos projetos = new Projetos().nome(DEFAULT_NOME).assunto(DEFAULT_ASSUNTO);
        return projetos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Projetos createUpdatedEntity(EntityManager em) {
        Projetos projetos = new Projetos().nome(UPDATED_NOME).assunto(UPDATED_ASSUNTO);
        return projetos;
    }

    @BeforeEach
    public void initTest() {
        projetos = createEntity(em);
    }

    @Test
    @Transactional
    void createProjetos() throws Exception {
        int databaseSizeBeforeCreate = projetosRepository.findAll().size();
        // Create the Projetos
        restProjetosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isCreated());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeCreate + 1);
        Projetos testProjetos = projetosList.get(projetosList.size() - 1);
        assertThat(testProjetos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProjetos.getAssunto()).isEqualTo(DEFAULT_ASSUNTO);
    }

    @Test
    @Transactional
    void createProjetosWithExistingId() throws Exception {
        // Create the Projetos with an existing ID
        projetos.setId(1L);

        int databaseSizeBeforeCreate = projetosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjetosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isBadRequest());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = projetosRepository.findAll().size();
        // set the field null
        projetos.setNome(null);

        // Create the Projetos, which fails.

        restProjetosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isBadRequest());

        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAssuntoIsRequired() throws Exception {
        int databaseSizeBeforeTest = projetosRepository.findAll().size();
        // set the field null
        projetos.setAssunto(null);

        // Create the Projetos, which fails.

        restProjetosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isBadRequest());

        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllProjetos() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        // Get all the projetosList
        restProjetosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projetos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].assunto").value(hasItem(DEFAULT_ASSUNTO)));
    }

    @Test
    @Transactional
    void getProjetos() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        // Get the projetos
        restProjetosMockMvc
            .perform(get(ENTITY_API_URL_ID, projetos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projetos.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.assunto").value(DEFAULT_ASSUNTO));
    }

    @Test
    @Transactional
    void getNonExistingProjetos() throws Exception {
        // Get the projetos
        restProjetosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProjetos() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();

        // Update the projetos
        Projetos updatedProjetos = projetosRepository.findById(projetos.getId()).get();
        // Disconnect from session so that the updates on updatedProjetos are not directly saved in db
        em.detach(updatedProjetos);
        updatedProjetos.nome(UPDATED_NOME).assunto(UPDATED_ASSUNTO);

        restProjetosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProjetos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProjetos))
            )
            .andExpect(status().isOk());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
        Projetos testProjetos = projetosList.get(projetosList.size() - 1);
        assertThat(testProjetos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProjetos.getAssunto()).isEqualTo(UPDATED_ASSUNTO);
    }

    @Test
    @Transactional
    void putNonExistingProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projetos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(projetos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(projetos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProjetosWithPatch() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();

        // Update the projetos using partial update
        Projetos partialUpdatedProjetos = new Projetos();
        partialUpdatedProjetos.setId(projetos.getId());

        partialUpdatedProjetos.nome(UPDATED_NOME);

        restProjetosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjetos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProjetos))
            )
            .andExpect(status().isOk());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
        Projetos testProjetos = projetosList.get(projetosList.size() - 1);
        assertThat(testProjetos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProjetos.getAssunto()).isEqualTo(DEFAULT_ASSUNTO);
    }

    @Test
    @Transactional
    void fullUpdateProjetosWithPatch() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();

        // Update the projetos using partial update
        Projetos partialUpdatedProjetos = new Projetos();
        partialUpdatedProjetos.setId(projetos.getId());

        partialUpdatedProjetos.nome(UPDATED_NOME).assunto(UPDATED_ASSUNTO);

        restProjetosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjetos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProjetos))
            )
            .andExpect(status().isOk());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
        Projetos testProjetos = projetosList.get(projetosList.size() - 1);
        assertThat(testProjetos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProjetos.getAssunto()).isEqualTo(UPDATED_ASSUNTO);
    }

    @Test
    @Transactional
    void patchNonExistingProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projetos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(projetos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(projetos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProjetos() throws Exception {
        int databaseSizeBeforeUpdate = projetosRepository.findAll().size();
        projetos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjetosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(projetos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Projetos in the database
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProjetos() throws Exception {
        // Initialize the database
        projetosRepository.saveAndFlush(projetos);

        int databaseSizeBeforeDelete = projetosRepository.findAll().size();

        // Delete the projetos
        restProjetosMockMvc
            .perform(delete(ENTITY_API_URL_ID, projetos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Projetos> projetosList = projetosRepository.findAll();
        assertThat(projetosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
