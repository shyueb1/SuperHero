package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.HeroSighting;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Location;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface LocationDao {
    Set<Hero> getHeroesSeenAtLocation(Location location);
    void addHeroSighting(HeroSighting sighting);
    List<Location> getAllSightingLocationsByHero(Hero hero);
    List<Location> getAllSightingLocationsByDate(LocalDate date);
    void deleteSighting(HeroSighting sighting);
}
