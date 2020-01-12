package com.otala.codereveals.web.rest;

import com.otala.codereveals.CodeRevealsApplicationApp;
import com.otala.codereveals.config.TestSecurityConfiguration;
import com.otala.codereveals.domain.Assessment;
import com.otala.codereveals.repository.AssessmentRepository;
import com.otala.codereveals.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.otala.codereveals.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AssessmentResource} REST controller.
 */
@SpringBootTest(classes = {CodeRevealsApplicationApp.class, TestSecurityConfiguration.class})
public class AssessmentResourceIT {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAssessmentMockMvc;

    private Assessment assessment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssessmentResource assessmentResource = new AssessmentResource(assessmentRepository);
        this.restAssessmentMockMvc = MockMvcBuilders.standaloneSetup(assessmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assessment createEntity(EntityManager em) {
        Assessment assessment = new Assessment();
        return assessment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assessment createUpdatedEntity(EntityManager em) {
        Assessment assessment = new Assessment();
        return assessment;
    }

    @BeforeEach
    public void initTest() {
        assessment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssessment() throws Exception {
        int databaseSizeBeforeCreate = assessmentRepository.findAll().size();

        // Create the Assessment
        restAssessmentMockMvc.perform(post("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isCreated());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeCreate + 1);
        Assessment testAssessment = assessmentList.get(assessmentList.size() - 1);
    }

    @Test
    @Transactional
    public void createAssessmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assessmentRepository.findAll().size();

        // Create the Assessment with an existing ID
        assessment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssessmentMockMvc.perform(post("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAssessments() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        // Get all the assessmentList
        restAssessmentMockMvc.perform(get("/api/assessments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assessment.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAssessment() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        // Get the assessment
        restAssessmentMockMvc.perform(get("/api/assessments/{id}", assessment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assessment.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssessment() throws Exception {
        // Get the assessment
        restAssessmentMockMvc.perform(get("/api/assessments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssessment() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        int databaseSizeBeforeUpdate = assessmentRepository.findAll().size();

        // Update the assessment
        Assessment updatedAssessment = assessmentRepository.findById(assessment.getId()).get();
        // Disconnect from session so that the updates on updatedAssessment are not directly saved in db
        em.detach(updatedAssessment);

        restAssessmentMockMvc.perform(put("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssessment)))
            .andExpect(status().isOk());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeUpdate);
        Assessment testAssessment = assessmentList.get(assessmentList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAssessment() throws Exception {
        int databaseSizeBeforeUpdate = assessmentRepository.findAll().size();

        // Create the Assessment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssessmentMockMvc.perform(put("/api/assessments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assessment)))
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssessment() throws Exception {
        // Initialize the database
        assessmentRepository.saveAndFlush(assessment);

        int databaseSizeBeforeDelete = assessmentRepository.findAll().size();

        // Delete the assessment
        restAssessmentMockMvc.perform(delete("/api/assessments/{id}", assessment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Assessment> assessmentList = assessmentRepository.findAll();
        assertThat(assessmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
