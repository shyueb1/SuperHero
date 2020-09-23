package com.sg.superherosightings.Service;

import com.sg.superherosightings.Entity.JPAEntities.*;

import java.util.List;

public interface ServiceLayer {

    Hero getHeroById(int id);

    Location getLocationById(int id);

    Organisation getOrganisationById(int id);

    Sighting getSightingById(int id);

    SuperPower getSuperPowerById(int id);

    void deleteHeroById(int id);

    void deleteLocationById(int id);

    void deleteOrganisationById(int id);

    void deleteSightingById(int id);

    void deleteSuperPowerById(int id);

    List<Hero> getAllHeroes();

    List<SuperPower> getAllSuperPowers();

    List<Location> getAllLocations();

    List<Organisation> getAllOrganisations();

    List<Sighting> getAllSightings();

    List<Sighting> getTenLatestSightings();

    Hero addOrUpdateHero(Hero hero);

    SuperPower addOrUpdateSuperPower(SuperPower power);

    Location addOrUpdateLocation(Location location);

    Organisation addOrUpdateOrganisation(Organisation organisation);

    Sighting addOrUpdateSightings(Sighting sighting);

    void addHeroToOrganisation(Hero hero, Organisation organisation);

    void deleteHero(Hero hero);

    void deleteSuperPower(SuperPower power);

    void deleteLocation(Location location);

    void deleteOrganisation(Organisation organisation);

    void deleteSighting(Sighting sighting);

    void deleteFromAllOrganisations(Hero hero);

    void addHeroToOrganisations(Hero hero, List<Organisation> organisation);

    void addSuperPowerToHero(SuperPower power, Hero hero);

    void addLocationToSighting(Location location, Sighting sighting);

    void deleteHeroFromOrganisation(Hero hero, Organisation organisation);

    void deleteSuperPowerFromHero(Hero hero);

    void deleteLocationFromSighting(Sighting sighting);

}
