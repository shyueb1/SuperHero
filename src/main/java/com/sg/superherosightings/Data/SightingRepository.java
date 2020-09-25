package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Sighting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SightingRepository extends JpaRepository<Sighting, Integer> {

    @Query(value = "SELECT h.* from hero h JOIN sighting ON sighting.hero_id = h.id WHERE sighting.location_id = :#{#location.id}", nativeQuery = true)
    List<Hero> findByLocation(@Param("location") Location location);

    @Query(value = "SELECT l.* FROM location l JOIN sighting ON sighting.location_id = l.id WHERE sighting.hero_id = :#{#hero.id}", nativeQuery = true)
    List<Location> findByHero(@Param("hero") Hero hero);

    @Query(value = "SELECT * FROM sighting WHERE sighting.date_of_sighting = :#{#date}", nativeQuery = true)
    List<Sighting> findByDate(@Param("date") LocalDate date);

    @Query(value = "SELECT * FROM sighting ORDER BY date_of_sighting DESC LIMIT 10", nativeQuery = true)
    List<Sighting> findTenRecentSightings();

    @Query(value = "UPDATE sighting SET location_id=null WHERE id=:#{#sighting.id}", nativeQuery = true)
    void deleteLocationFromSighting(@Param("sighting") Sighting sight);

    @Query(value = "UPDATE sighting SET location_id=:#{#location.id} WHERE id=:#{#sighting.id}", nativeQuery = true)
    void addLocationToSighting(@Param("sighting") Sighting sight, @Param("location") Location location);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM sighting WHERE id=:sightid", nativeQuery = true)
    void deleteBySightingId(@Param("sightid") int id);
}

