package com.sg.superherosightings.Service;

import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceLayerImpl implements ServiceLayer{

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
    @Override
    public Hero getHeroById(int id){
        return heroRepo.getOne(id);
    }

    @Override
    public Location getLocationById(int id){
        return locationRepo.getOne(id);
    }

    @Override
    public Organisation getOrganisationById(int id){
        return orgRepo.getOne(id);
    }

    @Override
    public Sighting getSightingById(int id){
        return sightRepo.getOne(id);
    }

    @Override
    public SuperPower getSuperPowerById(int id){
        return powerRepo.getOne(id);
    }

    @Override
    public void deleteHeroById(int id){
        heroRepo.deleteById(id);
    }

    @Override
    public void deleteLocationById(int id){
        locationRepo.deleteById(id);
    }

    @Override
    public void deleteOrganisationById(int id){
        orgRepo.deleteById(id);
    }

    @Override
    public void deleteSightingById(int id){
        sightRepo.deleteById(id);
    }

    @Override
    public void deleteSuperPowerById(int id){
        powerRepo.removeSuperPowerFromHeroes(id);
        powerRepo.deleteById(id);
    }

    @Override
    public List<Hero> getAllHeroes(){
        return heroRepo.findAll();
    }

    @Override
    public List<SuperPower> getAllSuperPowers(){
        return powerRepo.findAll();
    }

    @Override
    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    @Override
    public List<Organisation> getAllOrganisations(){
        return orgRepo.findAll();
    }

    @Override
    public List<Sighting> getAllSightings(){
        return sightRepo.findAll();
    }

    @Override
    public List<Sighting> getTenLatestSightings() {
        return sightRepo.findTenRecentSightings();
    }

    //ADD OR UPDATE
    @Override
    public Hero addOrUpdateHero(Hero hero){
        return heroRepo.save(hero);
    }

    @Override
    public SuperPower addOrUpdateSuperPower(SuperPower power){
        return powerRepo.save(power);
    }

    @Override
    public Location addOrUpdateLocation(Location location){
        return locationRepo.save(location);
    }

    @Override
    public Organisation addOrUpdateOrganisation(Organisation organisation){
        return orgRepo.save(organisation);
    }

    @Override
    public void addHeroToOrganisation(Hero hero, Organisation organisation){
        orgRepo.addHeroToOrganisation(hero, organisation);
    }

    @Override
    public Sighting addOrUpdateSightings(Sighting sighting){
        return sightRepo.save(sighting);
    }

    //DELETE
    @Override
    public void deleteHero(Hero hero){
        heroRepo.delete(hero);
    }

    @Override
    public void deleteSuperPower(SuperPower power){
        powerRepo.delete(power);
    }

    @Override
    public void deleteLocation(Location location){
        locationRepo.delete(location);
    }

    @Override
    public void deleteOrganisation(Organisation organisation){
        orgRepo.delete(organisation);
    }

    @Override
    public void deleteSighting(Sighting sighting){
        sightRepo.delete(sighting);
    }

    @Override
    public void deleteFromAllOrganisations(Hero hero){
        orgRepo.deleteFromAllOrganisations(hero);
    }

    @Override
    public void addHeroToOrganisations(Hero hero, List<Organisation> organisations) {
        if(organisations != null && !organisations.isEmpty()){
            organisations.stream().forEach(org -> {
                orgRepo.addHeroToOrganisation(hero, org);
            });
        }
    }

    @Override
    public void addSuperPowerToHero(int heroId, int superPowerId) {
        powerRepo.addSuperPowerToHero(heroId, superPowerId);
    }

    @Override
    public void addLocationToSighting(Location location, Sighting sighting) {
        sightRepo.addLocationToSighting(sighting, location);
    }


    @Override
    public void deleteHeroFromOrganisation(Hero hero, Organisation organisation) {
        orgRepo.deleteHeroFromOrganisation(hero, organisation);
    }

    @Override
    public void deleteSuperPowerFromHero(Hero hero) {
        hero.setSuperPower(null);
        heroRepo.save(hero);
    }

    @Override
    public void deleteLocationFromSighting(Sighting sighting) {
        sightRepo.deleteLocationFromSighting(sighting);
    }
}
