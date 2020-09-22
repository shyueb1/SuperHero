package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Sighting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SightingRepository extends JpaRepository<Sighting, Integer> {

    List<Hero> findByLocation(Location location);
    List<Location> findByHero(Hero hero);
    List<Sighting> findByDate(LocalDate date);

    @Query (value = "SELECT * FROM Sighting ORDER BY date DESC LIMIT 10", nativeQuery = true)
    List<Sighting> findTenRecentSightings();
}
