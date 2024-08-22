package br.org.ciag.gmf.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.gmf.IntegrationTest;
import br.org.ciag.gmf.domain.Disciplinas;
import br.org.ciag.gmf.repository.DisciplinasRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link DisciplinasResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DisciplinasResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/disciplinas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DisciplinasRepository disciplinasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDisciplinasMockMvc;

    private Disciplinas disciplinas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Disciplinas createEntity(EntityManager em) {
        Disciplinas disciplinas = new Disciplinas().nome(DEFAULT_NOME).createdDate(DEFAULT_CREATED_DATE);
        return disciplinas;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Disciplinas createUpdatedEntity(EntityManager em) {
        Disciplinas disciplinas = new Disciplinas().nome(UPDATED_NOME).createdDate(UPDATED_CREATED_DATE);
        return disciplinas;
    }

    @BeforeEach
    public void initTest() {
        disciplinas = createEntity(em);
    }

    @Test
    @Transactional
    void createDisciplinas() throws Exception {
        int databaseSizeBeforeCreate = disciplinasRepository.findAll().size();
        // Create the Disciplinas
        restDisciplinasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disciplinas)))
            .andExpect(status().isCreated());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeCreate + 1);
        Disciplinas testDisciplinas = disciplinasList.get(disciplinasList.size() - 1);
        assertThat(testDisciplinas.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDisciplinas.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    void createDisciplinasWithExistingId() throws Exception {
        // Create the Disciplinas with an existing ID
        disciplinas.setId(1L);

        int databaseSizeBeforeCreate = disciplinasRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDisciplinasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disciplinas)))
            .andExpect(status().isBadRequest());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = disciplinasRepository.findAll().size();
        // set the field null
        disciplinas.setNome(null);

        // Create the Disciplinas, which fails.

        restDisciplinasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disciplinas)))
            .andExpect(status().isBadRequest());

        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = disciplinasRepository.findAll().size();
        // set the field null
        disciplinas.setCreatedDate(null);

        // Create the Disciplinas, which fails.

        restDisciplinasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disciplinas)))
            .andExpect(status().isBadRequest());

        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDisciplinas() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        // Get all the disciplinasList
        restDisciplinasMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disciplinas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    void getDisciplinas() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        // Get the disciplinas
        restDisciplinasMockMvc
            .perform(get(ENTITY_API_URL_ID, disciplinas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(disciplinas.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDisciplinas() throws Exception {
        // Get the disciplinas
        restDisciplinasMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDisciplinas() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();

        // Update the disciplinas
        Disciplinas updatedDisciplinas = disciplinasRepository.findById(disciplinas.getId()).get();
        // Disconnect from session so that the updates on updatedDisciplinas are not directly saved in db
        em.detach(updatedDisciplinas);
        updatedDisciplinas.nome(UPDATED_NOME).createdDate(UPDATED_CREATED_DATE);

        restDisciplinasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDisciplinas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDisciplinas))
            )
            .andExpect(status().isOk());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
        Disciplinas testDisciplinas = disciplinasList.get(disciplinasList.size() - 1);
        assertThat(testDisciplinas.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDisciplinas.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, disciplinas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disciplinas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(disciplinas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(disciplinas)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDisciplinasWithPatch() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();

        // Update the disciplinas using partial update
        Disciplinas partialUpdatedDisciplinas = new Disciplinas();
        partialUpdatedDisciplinas.setId(disciplinas.getId());

        partialUpdatedDisciplinas.createdDate(UPDATED_CREATED_DATE);

        restDisciplinasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisciplinas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisciplinas))
            )
            .andExpect(status().isOk());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
        Disciplinas testDisciplinas = disciplinasList.get(disciplinasList.size() - 1);
        assertThat(testDisciplinas.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDisciplinas.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateDisciplinasWithPatch() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();

        // Update the disciplinas using partial update
        Disciplinas partialUpdatedDisciplinas = new Disciplinas();
        partialUpdatedDisciplinas.setId(disciplinas.getId());

        partialUpdatedDisciplinas.nome(UPDATED_NOME).createdDate(UPDATED_CREATED_DATE);

        restDisciplinasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDisciplinas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDisciplinas))
            )
            .andExpect(status().isOk());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
        Disciplinas testDisciplinas = disciplinasList.get(disciplinasList.size() - 1);
        assertThat(testDisciplinas.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDisciplinas.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, disciplinas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disciplinas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(disciplinas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDisciplinas() throws Exception {
        int databaseSizeBeforeUpdate = disciplinasRepository.findAll().size();
        disciplinas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDisciplinasMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(disciplinas))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Disciplinas in the database
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDisciplinas() throws Exception {
        // Initialize the database
        disciplinasRepository.saveAndFlush(disciplinas);

        int databaseSizeBeforeDelete = disciplinasRepository.findAll().size();

        // Delete the disciplinas
        restDisciplinasMockMvc
            .perform(delete(ENTITY_API_URL_ID, disciplinas.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Disciplinas> disciplinasList = disciplinasRepository.findAll();
        assertThat(disciplinasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
