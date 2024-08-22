package br.org.ciag.gmf.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.gmf.IntegrationTest;
import br.org.ciag.gmf.domain.Resumos;
import br.org.ciag.gmf.repository.ResumosRepository;
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
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ResumosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ResumosResourceIT {

    private static final String DEFAULT_ASSUNTO = "AAAAAAAAAA";
    private static final String UPDATED_ASSUNTO = "BBBBBBBBBB";

    private static final String DEFAULT_RESUMO = "AAAAAAAAAA";
    private static final String UPDATED_RESUMO = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/resumos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ResumosRepository resumosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResumosMockMvc;

    private Resumos resumos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resumos createEntity(EntityManager em) {
        Resumos resumos = new Resumos().assunto(DEFAULT_ASSUNTO).resumo(DEFAULT_RESUMO).createdDate(DEFAULT_CREATED_DATE);
        return resumos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resumos createUpdatedEntity(EntityManager em) {
        Resumos resumos = new Resumos().assunto(UPDATED_ASSUNTO).resumo(UPDATED_RESUMO).createdDate(UPDATED_CREATED_DATE);
        return resumos;
    }

    @BeforeEach
    public void initTest() {
        resumos = createEntity(em);
    }

    @Test
    @Transactional
    void createResumos() throws Exception {
        int databaseSizeBeforeCreate = resumosRepository.findAll().size();
        // Create the Resumos
        restResumosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isCreated());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeCreate + 1);
        Resumos testResumos = resumosList.get(resumosList.size() - 1);
        assertThat(testResumos.getAssunto()).isEqualTo(DEFAULT_ASSUNTO);
        assertThat(testResumos.getResumo()).isEqualTo(DEFAULT_RESUMO);
        assertThat(testResumos.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    void createResumosWithExistingId() throws Exception {
        // Create the Resumos with an existing ID
        resumos.setId(1L);

        int databaseSizeBeforeCreate = resumosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restResumosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isBadRequest());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAssuntoIsRequired() throws Exception {
        int databaseSizeBeforeTest = resumosRepository.findAll().size();
        // set the field null
        resumos.setAssunto(null);

        // Create the Resumos, which fails.

        restResumosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isBadRequest());

        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = resumosRepository.findAll().size();
        // set the field null
        resumos.setCreatedDate(null);

        // Create the Resumos, which fails.

        restResumosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isBadRequest());

        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllResumos() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        // Get all the resumosList
        restResumosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resumos.getId().intValue())))
            .andExpect(jsonPath("$.[*].assunto").value(hasItem(DEFAULT_ASSUNTO)))
            .andExpect(jsonPath("$.[*].resumo").value(hasItem(DEFAULT_RESUMO.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    void getResumos() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        // Get the resumos
        restResumosMockMvc
            .perform(get(ENTITY_API_URL_ID, resumos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resumos.getId().intValue()))
            .andExpect(jsonPath("$.assunto").value(DEFAULT_ASSUNTO))
            .andExpect(jsonPath("$.resumo").value(DEFAULT_RESUMO.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingResumos() throws Exception {
        // Get the resumos
        restResumosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingResumos() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();

        // Update the resumos
        Resumos updatedResumos = resumosRepository.findById(resumos.getId()).get();
        // Disconnect from session so that the updates on updatedResumos are not directly saved in db
        em.detach(updatedResumos);
        updatedResumos.assunto(UPDATED_ASSUNTO).resumo(UPDATED_RESUMO).createdDate(UPDATED_CREATED_DATE);

        restResumosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedResumos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedResumos))
            )
            .andExpect(status().isOk());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
        Resumos testResumos = resumosList.get(resumosList.size() - 1);
        assertThat(testResumos.getAssunto()).isEqualTo(UPDATED_ASSUNTO);
        assertThat(testResumos.getResumo()).isEqualTo(UPDATED_RESUMO);
        assertThat(testResumos.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, resumos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(resumos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(resumos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateResumosWithPatch() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();

        // Update the resumos using partial update
        Resumos partialUpdatedResumos = new Resumos();
        partialUpdatedResumos.setId(resumos.getId());

        partialUpdatedResumos.assunto(UPDATED_ASSUNTO).resumo(UPDATED_RESUMO);

        restResumosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedResumos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedResumos))
            )
            .andExpect(status().isOk());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
        Resumos testResumos = resumosList.get(resumosList.size() - 1);
        assertThat(testResumos.getAssunto()).isEqualTo(UPDATED_ASSUNTO);
        assertThat(testResumos.getResumo()).isEqualTo(UPDATED_RESUMO);
        assertThat(testResumos.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateResumosWithPatch() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();

        // Update the resumos using partial update
        Resumos partialUpdatedResumos = new Resumos();
        partialUpdatedResumos.setId(resumos.getId());

        partialUpdatedResumos.assunto(UPDATED_ASSUNTO).resumo(UPDATED_RESUMO).createdDate(UPDATED_CREATED_DATE);

        restResumosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedResumos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedResumos))
            )
            .andExpect(status().isOk());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
        Resumos testResumos = resumosList.get(resumosList.size() - 1);
        assertThat(testResumos.getAssunto()).isEqualTo(UPDATED_ASSUNTO);
        assertThat(testResumos.getResumo()).isEqualTo(UPDATED_RESUMO);
        assertThat(testResumos.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, resumos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(resumos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(resumos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamResumos() throws Exception {
        int databaseSizeBeforeUpdate = resumosRepository.findAll().size();
        resumos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restResumosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(resumos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Resumos in the database
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteResumos() throws Exception {
        // Initialize the database
        resumosRepository.saveAndFlush(resumos);

        int databaseSizeBeforeDelete = resumosRepository.findAll().size();

        // Delete the resumos
        restResumosMockMvc
            .perform(delete(ENTITY_API_URL_ID, resumos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Resumos> resumosList = resumosRepository.findAll();
        assertThat(resumosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
