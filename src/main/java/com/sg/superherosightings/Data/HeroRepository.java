package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroRepository extends JpaRepository<Hero, Integer> {
    List<Hero> findAll();
    List<Hero> findByOrganisation(Organisation organisation);
}
