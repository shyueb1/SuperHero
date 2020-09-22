package com.sg.superherosightings.Service;

import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.*;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceLayerImpl {

    private HeroRepository heroRepo;
    private SuperPowerRepository powerRepo;
    private OrganisationRepository orgRepo;
    private SightingRepository sightRepo;
    private LocationRepository locationRepo;

    @Autowired
    public ServiceLayerImpl(HeroRepository heroRepo, SuperPowerRepository powerRepo, OrganisationRepository orgRepo, SightingRepository sightRepo, LocationRepository locationRepo){
        this.heroRepo = heroRepo;
        this.powerRepo = powerRepo;
        this.orgRepo = orgRepo;
        this.sightRepo = sightRepo;
        this.locationRepo = locationRepo;
    }

    //GET Objects

    public List<Hero> getAllHeroes(){
        return heroRepo.findAll();
    }

    public List<SuperPower> getAllSuperPowers(){
        return powerRepo.findAll();
    }

    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    public List<Organisation> getAllOrganisations(){
        return orgRepo.findAll();
    }

    public List<Sighting> getAllSightings(){
        return sightRepo.findAll();
    }

    //ADD OR UPDATE

    public Hero addOrUpdateHero(Hero hero){
        return heroRepo.save(hero);
    }

    public SuperPower addOrUpdateSuperPower(SuperPower power){
        return powerRepo.save(power);
    }

    public Location addOrUpdateLocation(Location location){
        return locationRepo.save(location);
    }
    public Organisation addOrUpdateOrganisation(Organisation organisation){
        return orgRepo.save(organisation);
    }
    public Sighting addOrUpdateSightings(Sighting sighting){
        return sightRepo.save(sighting);
    }

    //DELETE

    public void deleteHero(Hero hero){
        heroRepo.delete(hero);
    }

    public void deleteSuperPower(SuperPower power){
        powerRepo.delete(power);
    }

    public void deleteLocation(Location location){
        locationRepo.delete(location);
    }

    public void deleteOrganisation(Organisation organisation){
        orgRepo.delete(organisation);
    }

    public void deleteSighting(Sighting sighting){
        sightRepo.delete(sighting);
    }
}
