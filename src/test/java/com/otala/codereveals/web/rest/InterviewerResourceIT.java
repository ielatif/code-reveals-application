package com.otala.codereveals.web.rest;

import com.otala.codereveals.CodeRevealsApplicationApp;
import com.otala.codereveals.config.TestSecurityConfiguration;
import com.otala.codereveals.domain.Interviewer;
import com.otala.codereveals.repository.InterviewerRepository;
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
 * Integration tests for the {@link InterviewerResource} REST controller.
 */
@SpringBootTest(classes = {CodeRevealsApplicationApp.class, TestSecurityConfiguration.class})
public class InterviewerResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EXPERIENCE = "AAAAAAAAAA";
    private static final String UPDATED_EXPERIENCE = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_AT = "AAAAAAAAAA";
    private static final String UPDATED_WORK_AT = "BBBBBBBBBB";

    @Autowired
    private InterviewerRepository interviewerRepository;

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

    private MockMvc restInterviewerMockMvc;

    private Interviewer interviewer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterviewerResource interviewerResource = new InterviewerResource(interviewerRepository);
        this.restInterviewerMockMvc = MockMvcBuilders.standaloneSetup(interviewerResource)
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
    public static Interviewer createEntity(EntityManager em) {
        Interviewer interviewer = new Interviewer()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .experience(DEFAULT_EXPERIENCE)
            .role(DEFAULT_ROLE)
            .workAt(DEFAULT_WORK_AT);
        return interviewer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Interviewer createUpdatedEntity(EntityManager em) {
        Interviewer interviewer = new Interviewer()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .experience(UPDATED_EXPERIENCE)
            .role(UPDATED_ROLE)
            .workAt(UPDATED_WORK_AT);
        return interviewer;
    }

    @BeforeEach
    public void initTest() {
        interviewer = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterviewer() throws Exception {
        int databaseSizeBeforeCreate = interviewerRepository.findAll().size();

        // Create the Interviewer
        restInterviewerMockMvc.perform(post("/api/interviewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interviewer)))
            .andExpect(status().isCreated());

        // Validate the Interviewer in the database
        List<Interviewer> interviewerList = interviewerRepository.findAll();
        assertThat(interviewerList).hasSize(databaseSizeBeforeCreate + 1);
        Interviewer testInterviewer = interviewerList.get(interviewerList.size() - 1);
        assertThat(testInterviewer.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testInterviewer.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testInterviewer.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testInterviewer.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testInterviewer.getWorkAt()).isEqualTo(DEFAULT_WORK_AT);
    }

    @Test
    @Transactional
    public void createInterviewerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interviewerRepository.findAll().size();

        // Create the Interviewer with an existing ID
        interviewer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterviewerMockMvc.perform(post("/api/interviewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interviewer)))
            .andExpect(status().isBadRequest());

        // Validate the Interviewer in the database
        List<Interviewer> interviewerList = interviewerRepository.findAll();
        assertThat(interviewerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInterviewers() throws Exception {
        // Initialize the database
        interviewerRepository.saveAndFlush(interviewer);

        // Get all the interviewerList
        restInterviewerMockMvc.perform(get("/api/interviewers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interviewer.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
            .andExpect(jsonPath("$.[*].workAt").value(hasItem(DEFAULT_WORK_AT)));
    }
    
    @Test
    @Transactional
    public void getInterviewer() throws Exception {
        // Initialize the database
        interviewerRepository.saveAndFlush(interviewer);

        // Get the interviewer
        restInterviewerMockMvc.perform(get("/api/interviewers/{id}", interviewer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interviewer.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
            .andExpect(jsonPath("$.workAt").value(DEFAULT_WORK_AT));
    }

    @Test
    @Transactional
    public void getNonExistingInterviewer() throws Exception {
        // Get the interviewer
        restInterviewerMockMvc.perform(get("/api/interviewers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterviewer() throws Exception {
        // Initialize the database
        interviewerRepository.saveAndFlush(interviewer);

        int databaseSizeBeforeUpdate = interviewerRepository.findAll().size();

        // Update the interviewer
        Interviewer updatedInterviewer = interviewerRepository.findById(interviewer.getId()).get();
        // Disconnect from session so that the updates on updatedInterviewer are not directly saved in db
        em.detach(updatedInterviewer);
        updatedInterviewer
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .experience(UPDATED_EXPERIENCE)
            .role(UPDATED_ROLE)
            .workAt(UPDATED_WORK_AT);

        restInterviewerMockMvc.perform(put("/api/interviewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterviewer)))
            .andExpect(status().isOk());

        // Validate the Interviewer in the database
        List<Interviewer> interviewerList = interviewerRepository.findAll();
        assertThat(interviewerList).hasSize(databaseSizeBeforeUpdate);
        Interviewer testInterviewer = interviewerList.get(interviewerList.size() - 1);
        assertThat(testInterviewer.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testInterviewer.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testInterviewer.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testInterviewer.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testInterviewer.getWorkAt()).isEqualTo(UPDATED_WORK_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingInterviewer() throws Exception {
        int databaseSizeBeforeUpdate = interviewerRepository.findAll().size();

        // Create the Interviewer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterviewerMockMvc.perform(put("/api/interviewers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interviewer)))
            .andExpect(status().isBadRequest());

        // Validate the Interviewer in the database
        List<Interviewer> interviewerList = interviewerRepository.findAll();
        assertThat(interviewerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInterviewer() throws Exception {
        // Initialize the database
        interviewerRepository.saveAndFlush(interviewer);

        int databaseSizeBeforeDelete = interviewerRepository.findAll().size();

        // Delete the interviewer
        restInterviewerMockMvc.perform(delete("/api/interviewers/{id}", interviewer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Interviewer> interviewerList = interviewerRepository.findAll();
        assertThat(interviewerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
