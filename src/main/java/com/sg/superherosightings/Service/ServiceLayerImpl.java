package com.sg.superherosightings.Service;

import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.*;
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


}
