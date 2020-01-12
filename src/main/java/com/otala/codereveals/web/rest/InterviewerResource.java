package com.otala.codereveals.web.rest;

import com.otala.codereveals.domain.Interviewer;
import com.otala.codereveals.repository.InterviewerRepository;
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
 * REST controller for managing {@link com.otala.codereveals.domain.Interviewer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InterviewerResource {

    private final Logger log = LoggerFactory.getLogger(InterviewerResource.class);

    private static final String ENTITY_NAME = "interviewer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InterviewerRepository interviewerRepository;

    public InterviewerResource(InterviewerRepository interviewerRepository) {
        this.interviewerRepository = interviewerRepository;
    }

    /**
     * {@code POST  /interviewers} : Create a new interviewer.
     *
     * @param interviewer the interviewer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new interviewer, or with status {@code 400 (Bad Request)} if the interviewer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/interviewers")
    public ResponseEntity<Interviewer> createInterviewer(@RequestBody Interviewer interviewer) throws URISyntaxException {
        log.debug("REST request to save Interviewer : {}", interviewer);
        if (interviewer.getId() != null) {
            throw new BadRequestAlertException("A new interviewer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Interviewer result = interviewerRepository.save(interviewer);
        return ResponseEntity.created(new URI("/api/interviewers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /interviewers} : Updates an existing interviewer.
     *
     * @param interviewer the interviewer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated interviewer,
     * or with status {@code 400 (Bad Request)} if the interviewer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the interviewer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/interviewers")
    public ResponseEntity<Interviewer> updateInterviewer(@RequestBody Interviewer interviewer) throws URISyntaxException {
        log.debug("REST request to update Interviewer : {}", interviewer);
        if (interviewer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Interviewer result = interviewerRepository.save(interviewer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, interviewer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /interviewers} : get all the interviewers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of interviewers in body.
     */
    @GetMapping("/interviewers")
    public List<Interviewer> getAllInterviewers() {
        log.debug("REST request to get all Interviewers");
        return interviewerRepository.findAll();
    }

    /**
     * {@code GET  /interviewers/:id} : get the "id" interviewer.
     *
     * @param id the id of the interviewer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the interviewer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/interviewers/{id}")
    public ResponseEntity<Interviewer> getInterviewer(@PathVariable Long id) {
        log.debug("REST request to get Interviewer : {}", id);
        Optional<Interviewer> interviewer = interviewerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interviewer);
    }

    /**
     * {@code DELETE  /interviewers/:id} : delete the "id" interviewer.
     *
     * @param id the id of the interviewer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/interviewers/{id}")
    public ResponseEntity<Void> deleteInterviewer(@PathVariable Long id) {
        log.debug("REST request to delete Interviewer : {}", id);
        interviewerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
