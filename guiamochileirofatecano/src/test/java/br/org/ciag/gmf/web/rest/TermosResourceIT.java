package br.org.ciag.gmf.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.gmf.IntegrationTest;
import br.org.ciag.gmf.domain.Termos;
import br.org.ciag.gmf.domain.enumeration.NumeroSemestre;
import br.org.ciag.gmf.domain.enumeration.NumeroTermo;
import br.org.ciag.gmf.repository.TermosRepository;
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
 * Integration tests for the {@link TermosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TermosResourceIT {

    private static final NumeroTermo DEFAULT_NOME = NumeroTermo.PRIMEIRO;
    private static final NumeroTermo UPDATED_NOME = NumeroTermo.SEGUNDO;

    private static final NumeroSemestre DEFAULT_SEMESTRE = NumeroSemestre.PRIMEIRO;
    private static final NumeroSemestre UPDATED_SEMESTRE = NumeroSemestre.SEGUNDO;

    private static final String DEFAULT_ANO = "AAAAAAAAAA";
    private static final String UPDATED_ANO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/termos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TermosRepository termosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTermosMockMvc;

    private Termos termos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Termos createEntity(EntityManager em) {
        Termos termos = new Termos().nome(DEFAULT_NOME).semestre(DEFAULT_SEMESTRE).ano(DEFAULT_ANO);
        return termos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Termos createUpdatedEntity(EntityManager em) {
        Termos termos = new Termos().nome(UPDATED_NOME).semestre(UPDATED_SEMESTRE).ano(UPDATED_ANO);
        return termos;
    }

    @BeforeEach
    public void initTest() {
        termos = createEntity(em);
    }

    @Test
    @Transactional
    void createTermos() throws Exception {
        int databaseSizeBeforeCreate = termosRepository.findAll().size();
        // Create the Termos
        restTermosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isCreated());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeCreate + 1);
        Termos testTermos = termosList.get(termosList.size() - 1);
        assertThat(testTermos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTermos.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);
        assertThat(testTermos.getAno()).isEqualTo(DEFAULT_ANO);
    }

    @Test
    @Transactional
    void createTermosWithExistingId() throws Exception {
        // Create the Termos with an existing ID
        termos.setId(1L);

        int databaseSizeBeforeCreate = termosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTermosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isBadRequest());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = termosRepository.findAll().size();
        // set the field null
        termos.setNome(null);

        // Create the Termos, which fails.

        restTermosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isBadRequest());

        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSemestreIsRequired() throws Exception {
        int databaseSizeBeforeTest = termosRepository.findAll().size();
        // set the field null
        termos.setSemestre(null);

        // Create the Termos, which fails.

        restTermosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isBadRequest());

        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAnoIsRequired() throws Exception {
        int databaseSizeBeforeTest = termosRepository.findAll().size();
        // set the field null
        termos.setAno(null);

        // Create the Termos, which fails.

        restTermosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isBadRequest());

        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTermos() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        // Get all the termosList
        restTermosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(termos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE.toString())))
            .andExpect(jsonPath("$.[*].ano").value(hasItem(DEFAULT_ANO)));
    }

    @Test
    @Transactional
    void getTermos() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        // Get the termos
        restTermosMockMvc
            .perform(get(ENTITY_API_URL_ID, termos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(termos.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE.toString()))
            .andExpect(jsonPath("$.ano").value(DEFAULT_ANO));
    }

    @Test
    @Transactional
    void getNonExistingTermos() throws Exception {
        // Get the termos
        restTermosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTermos() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        int databaseSizeBeforeUpdate = termosRepository.findAll().size();

        // Update the termos
        Termos updatedTermos = termosRepository.findById(termos.getId()).get();
        // Disconnect from session so that the updates on updatedTermos are not directly saved in db
        em.detach(updatedTermos);
        updatedTermos.nome(UPDATED_NOME).semestre(UPDATED_SEMESTRE).ano(UPDATED_ANO);

        restTermosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTermos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTermos))
            )
            .andExpect(status().isOk());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
        Termos testTermos = termosList.get(termosList.size() - 1);
        assertThat(testTermos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTermos.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testTermos.getAno()).isEqualTo(UPDATED_ANO);
    }

    @Test
    @Transactional
    void putNonExistingTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, termos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(termos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(termos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTermosWithPatch() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        int databaseSizeBeforeUpdate = termosRepository.findAll().size();

        // Update the termos using partial update
        Termos partialUpdatedTermos = new Termos();
        partialUpdatedTermos.setId(termos.getId());

        partialUpdatedTermos.semestre(UPDATED_SEMESTRE);

        restTermosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTermos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTermos))
            )
            .andExpect(status().isOk());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
        Termos testTermos = termosList.get(termosList.size() - 1);
        assertThat(testTermos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTermos.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testTermos.getAno()).isEqualTo(DEFAULT_ANO);
    }

    @Test
    @Transactional
    void fullUpdateTermosWithPatch() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        int databaseSizeBeforeUpdate = termosRepository.findAll().size();

        // Update the termos using partial update
        Termos partialUpdatedTermos = new Termos();
        partialUpdatedTermos.setId(termos.getId());

        partialUpdatedTermos.nome(UPDATED_NOME).semestre(UPDATED_SEMESTRE).ano(UPDATED_ANO);

        restTermosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTermos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTermos))
            )
            .andExpect(status().isOk());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
        Termos testTermos = termosList.get(termosList.size() - 1);
        assertThat(testTermos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTermos.getSemestre()).isEqualTo(UPDATED_SEMESTRE);
        assertThat(testTermos.getAno()).isEqualTo(UPDATED_ANO);
    }

    @Test
    @Transactional
    void patchNonExistingTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, termos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(termos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(termos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTermos() throws Exception {
        int databaseSizeBeforeUpdate = termosRepository.findAll().size();
        termos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTermosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(termos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Termos in the database
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTermos() throws Exception {
        // Initialize the database
        termosRepository.saveAndFlush(termos);

        int databaseSizeBeforeDelete = termosRepository.findAll().size();

        // Delete the termos
        restTermosMockMvc
            .perform(delete(ENTITY_API_URL_ID, termos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Termos> termosList = termosRepository.findAll();
        assertThat(termosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
