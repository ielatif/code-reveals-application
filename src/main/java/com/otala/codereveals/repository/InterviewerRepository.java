package com.otala.codereveals.repository;

import com.otala.codereveals.domain.Interviewer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Interviewer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, Long> {

}
