package com.sg.superherosightings.Service;

import com.sg.superherosightings.Entity.JPAEntities.*;

import java.util.List;

public interface ServiceLayer {

    List<Hero> getAllHeroes();

    List<SuperPower> getAllSuperPowers();

    List<Location> getAllLocations();

    List<Organisation> getAllOrganisations();

    List<Sighting> getAllSightings();

    Hero addOrUpdateHero(Hero hero);

    SuperPower addOrUpdateSuperPower(SuperPower power);

    Location addOrUpdateLocation(Location location);

    Organisation addOrUpdateOrganisation(Organisation organisation);

    Sighting addOrUpdateSightings(Sighting sighting);

    void deleteHero(Hero hero);

    void deleteSuperPower(SuperPower power);

    void deleteLocation(Location location);

    void deleteOrganisation(Organisation organisation);

    void deleteSighting(Sighting sighting);

}
