package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Integer> {
    @Query(value="SELECT * FROM organisation JOIN hero_in_organisation ON hero_in_organisation.organisation_id = organisation.organisation_id WHERE hero_in_organisation.hero_id = :#{#hero.id}", nativeQuery = true)
    List<Organisation> findByHero(@Param("hero") Hero hero);

    @Query(value = "SELECT * FROM hero_in_organisation JOIN hero ON hero.id = hero_in_organisation.hero_id WHERE hero_in_organisation.organisation_id = :#{#organisation.id}", nativeQuery = true)
    List<Hero> findByOrganisation(@Param("organisation") Organisation organisation);
}
