package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Integer> {
    @Query(value="SELECT * FROM organisation JOIN hero_in_organisation ON hero_in_organisation.organisation_id = organisation.id WHERE hero_in_organisation.hero_id = :#{#hero.id}", nativeQuery = true)
    List<Organisation> findByHero(@Param("hero") Hero hero);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM hero_in_organisation WHERE hero_id=:#{#heroParam.id} AND organisation_id=:#{#organisationParam.id}", nativeQuery = true)
    void deleteHeroFromOrganisation(@Param("heroParam") Hero hero, @Param("organisationParam") Organisation organisation);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO hero_in_organisation (hero_id, organisation_id) VALUES (:#{#heroParam.id}, :#{#organisationParam.id})", nativeQuery = true)
    void addHeroToOrganisation(@Param("heroParam")Hero hero, @Param("organisationParam") Organisation org);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM hero_in_organisation WHERE hero_id=:#{#hero.id}", nativeQuery = true)
    List<Organisation> deleteFromAllOrganisations(@Param("hero") Hero hero);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM hero_in_organisation;", nativeQuery = true)
    void deleteHeroOrganisationBridge();
}
