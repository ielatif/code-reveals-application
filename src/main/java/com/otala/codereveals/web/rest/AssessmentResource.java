package com.otala.codereveals.web.rest;

import com.otala.codereveals.domain.Assessment;
import com.otala.codereveals.repository.AssessmentRepository;
import com.otala.codereveals.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.otala.codereveals.domain.Assessment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AssessmentResource {

    private final Logger log = LoggerFactory.getLogger(AssessmentResource.class);

    private static final String ENTITY_NAME = "assessment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssessmentRepository assessmentRepository;

    public AssessmentResource(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    /**
     * {@code POST  /assessments} : Create a new assessment.
     *
     * @param assessment the assessment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assessment, or with status {@code 400 (Bad Request)} if the assessment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/assessments")
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) throws URISyntaxException {
        log.debug("REST request to save Assessment : {}", assessment);
        if (assessment.getId() != null) {
            throw new BadRequestAlertException("A new assessment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Assessment result = assessmentRepository.save(assessment);
        return ResponseEntity.created(new URI("/api/assessments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /assessments} : Updates an existing assessment.
     *
     * @param assessment the assessment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assessment,
     * or with status {@code 400 (Bad Request)} if the assessment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assessment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/assessments")
    public ResponseEntity<Assessment> updateAssessment(@RequestBody Assessment assessment) throws URISyntaxException {
        log.debug("REST request to update Assessment : {}", assessment);
        if (assessment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Assessment result = assessmentRepository.save(assessment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assessment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /assessments} : get all the assessments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assessments in body.
     */
    @GetMapping("/assessments")
    public List<Assessment> getAllAssessments() {
        log.debug("REST request to get all Assessments");
        return assessmentRepository.findAll();
    }

    /**
     * {@code GET  /assessments/:id} : get the "id" assessment.
     *
     * @param id the id of the assessment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assessment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/assessments/{id}")
    public ResponseEntity<Assessment> getAssessment(@PathVariable Long id) {
        log.debug("REST request to get Assessment : {}", id);
        Optional<Assessment> assessment = assessmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(assessment);
    }

    /**
     * {@code DELETE  /assessments/:id} : delete the "id" assessment.
     *
     * @param id the id of the assessment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/assessments/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable Long id) {
        log.debug("REST request to delete Assessment : {}", id);
        assessmentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
