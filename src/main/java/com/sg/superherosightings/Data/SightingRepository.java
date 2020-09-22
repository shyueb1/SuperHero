package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Sighting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SightingRepository extends JpaRepository<Sighting, Integer> {

    @Query(value = "SELECT h.* from hero h JOIN sighting ON sighting.hero_id = h.id WHERE sighting.location_id = :#{#location.id}", nativeQuery = true)
    List<Hero> findByLocation(@Param("location") Location location);

    @Query(value = "SELECT * FROM location JOIN sighting ON sighting.location_id = location.id WHERE sighting.hero_id = :#{#hero.id}", nativeQuery = true)
    List<Location> findByHero(@Param("hero") Hero hero);

    @Query(value = "SELECT * FROM sighting WHERE sighting.date_of_sighting = :#{#date}", nativeQuery = true)
    List<Sighting> findByDate(@Param("date") LocalDate date);

    @Query(value = "SELECT * FROM sighting ORDER BY date DESC LIMIT 10", nativeQuery = true)
    List<Sighting> findTenRecentSightings();
}
