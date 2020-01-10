package com.otala.codereveals.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Interviewer.
 */
@Entity
@Table(name = "interviewer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Interviewer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "experience")
    private String experience;

    @Column(name = "role")
    private String role;

    @Column(name = "work_at")
    private String workAt;

    @OneToMany(mappedBy = "interviewer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Assessment> assessments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Interviewer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Interviewer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getExperience() {
        return experience;
    }

    public Interviewer experience(String experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getRole() {
        return role;
    }

    public Interviewer role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getWorkAt() {
        return workAt;
    }

    public Interviewer workAt(String workAt) {
        this.workAt = workAt;
        return this;
    }

    public void setWorkAt(String workAt) {
        this.workAt = workAt;
    }

    public Set<Assessment> getAssessments() {
        return assessments;
    }

    public Interviewer assessments(Set<Assessment> assessments) {
        this.assessments = assessments;
        return this;
    }

    public Interviewer addAssessment(Assessment assessment) {
        this.assessments.add(assessment);
        assessment.setInterviewer(this);
        return this;
    }

    public Interviewer removeAssessment(Assessment assessment) {
        this.assessments.remove(assessment);
        assessment.setInterviewer(null);
        return this;
    }

    public void setAssessments(Set<Assessment> assessments) {
        this.assessments = assessments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Interviewer)) {
            return false;
        }
        return id != null && id.equals(((Interviewer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Interviewer{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", experience='" + getExperience() + "'" +
            ", role='" + getRole() + "'" +
            ", workAt='" + getWorkAt() + "'" +
            "}";
    }
}
