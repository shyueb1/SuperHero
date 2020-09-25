package com.sg.superherosightings.Controller;

import com.sg.superherosightings.Entity.JPAEntities.*;
import com.sg.superherosightings.Service.ServiceLayerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.Valid;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
public class MainController {

    private ServiceLayerImpl service;

    @Autowired
    public MainController(ServiceLayerImpl service){
        this.service = service;
    }

    //GET endpoints

    @GetMapping("/hero/{id}")
    public ResponseEntity<Hero> getHeroById(@PathVariable("id") int id){
        return new ResponseEntity<>(service.getHeroById(id), HttpStatus.OK);
    }

    @GetMapping("/superpower/{id}")
    public ResponseEntity<SuperPower> getSuperPowerById(@PathVariable("id") int id){
        return new ResponseEntity<>(service.getSuperPowerById(id), HttpStatus.OK);
    }

    @GetMapping("/location/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") int id){
        return new ResponseEntity<>(service.getLocationById(id), HttpStatus.OK);
    }

    @GetMapping("/organisation/{id}")
    public ResponseEntity<Organisation> getOrganisationById(@PathVariable("id") int id){
        return new ResponseEntity<>(service.getOrganisationById(id), HttpStatus.OK);
    }

    @GetMapping("/sighting/{id}")
    public ResponseEntity<Sighting> getSightingById(@PathVariable("id") int id){
        return new ResponseEntity<>(service.getSightingById(id), HttpStatus.OK);
    }

    @GetMapping("/hero")
    public ResponseEntity<List<Hero>> getAllHeroes(){
        return new ResponseEntity<>(service.getAllHeroes(), HttpStatus.OK);
    }

    @GetMapping("/superpower")
    public ResponseEntity<List<SuperPower>> getAllSuperPowers(){
        return new ResponseEntity<>(service.getAllSuperPowers(), HttpStatus.OK);
    }

    @GetMapping("/location")
    public ResponseEntity<List<Location>> getAllLocations(){
        return new ResponseEntity<>(service.getAllLocations(), HttpStatus.OK);
    }

    @GetMapping("/organisation")
    public ResponseEntity<List<Organisation>> getAllOrganisations(){
        return new ResponseEntity<>(service.getAllOrganisations(), HttpStatus.OK);
    }

    @GetMapping("/sighting")
    public ResponseEntity<List<Sighting>> getAllSightings(){
        return new ResponseEntity<>(service.getAllSightings(), HttpStatus.OK);
    }

    @GetMapping("/sighting/top10")
    public ResponseEntity<List<Sighting>> getTop10Sightings(){
        return new ResponseEntity<>(service.getTenLatestSightings(), HttpStatus.OK);
    }


    //POST endpoints

    @PostMapping("/hero")
    public ResponseEntity<Object> addOrUpdateHero(@Valid @RequestBody Hero hero){
        try {
            if (hero.getName() == null || hero.getDescription() == null || hero.getName().isEmpty() || hero.getDescription().isEmpty()) {
                throw new InvalidObjectException("Hero name and/or description cannot be empty!");
            }
            if (hero.getInOrganisation() != null && !hero.getInOrganisation().isEmpty()) {
                List<Organisation> orgs = hero.getInOrganisation();
                hero.setInOrganisation(null);
                Hero storedHero = service.addOrUpdateHero(hero);
                service.addHeroToOrganisations(storedHero, orgs);
                return new ResponseEntity<>(service.getHeroById(storedHero.getId()), HttpStatus.OK);
            }
            return new ResponseEntity<>(service.addOrUpdateHero(hero), HttpStatus.OK);
        } catch (DataIntegrityViolationException e){
            throw new NonUniqueObjectException("Error adding Hero: Key for id/name duplicate or superpower/organisation(s) don't exist or invalid field lengths (name=30, desc=250).");
        }

    }

    @PostMapping("/superpower")
    public ResponseEntity<Object> addOrUpdateSuperPower(@RequestBody SuperPower superPower){
        try{
            if(superPower.getName() == null || superPower.getDescription() == null ||  superPower.getName().isEmpty() || superPower.getDescription().isEmpty()){
                throw new InvalidObjectException("Error adding SuperPower: Super power name and/or description cannot be empty!");
            }
            return new ResponseEntity<>(service.addOrUpdateSuperPower(superPower), HttpStatus.OK);
        } catch (DataIntegrityViolationException e){
            throw new NonUniqueObjectException("Error adding SuperPower: Super power cannot have the same name or id as another super power or invalid field lengths (name=30, desc=250).");
        }
    }

    @PostMapping("/location")
    public ResponseEntity<Object> addOrUpdateLocation(@RequestBody Location location){
        if(location.getName() == null ||  location.getDescription() == null || location.getName().isEmpty() || location.getDescription().isEmpty()){
            throw new InvalidObjectException("Error adding Location: Location name and/or description cannot be empty!");
        }
        return new ResponseEntity<>(service.addOrUpdateLocation(location), HttpStatus.OK);
    }

    @PostMapping("/organisation")
    public ResponseEntity<Object> addOrUpdateOrganisation(@RequestBody Organisation organisation){
        try{
            if(organisation.getName() == null ||  organisation.getDescription() == null || organisation.getName().isEmpty() || organisation.getDescription().isEmpty()){
                throw new InvalidObjectException("Error adding Organisation: Organisation name and/or description cannot be empty!");
            }
            if(organisation.getLocation() != null && organisation.getLocation().getId() != 0){
                Location location = service.getLocationById(organisation.getLocation().getId());
                organisation.setLocation(location);
                return new ResponseEntity<>(service.addOrUpdateOrganisation(organisation), HttpStatus.OK);
            }
            if(organisation.getLocation() == null){
                organisation.setLocation(null);
                return new ResponseEntity<>(service.addOrUpdateOrganisation(organisation), HttpStatus.OK);
            }
            throw new InvalidObjectException("Error adding Organisation: Organisation location must be null or must contain an id of an existing location.");
        } catch (DataIntegrityViolationException e){
            throw new FailedPersistenceException("Error adding Organisation: Duplicate name or Object is fields missing/invalid field lengths (name=30, desc=250, telephone=12).");
        }
    }

    @PostMapping("/sighting")
    public ResponseEntity<Object> addOrUpdateSighting(@RequestBody Sighting sighting){
        try{
            if(sighting.getHero() == null || sighting.getHero().getId() == 0){
                throw new InvalidObjectException("Error adding Sighting: Must include a Hero id.");
            }
            Hero hero = service.getHeroById(sighting.getHero().getId());
            sighting.setHero(hero);
            if(sighting.getLocation() != null && sighting.getLocation().getId() != 0) {
                Location location = service.getLocationById(sighting.getLocation().getId());
                sighting.setLocation(location);
            }
            return new ResponseEntity<>(service.addOrUpdateSightings(sighting), HttpStatus.OK);
        } catch(DataIntegrityViolationException e){
            throw new FailedPersistenceException("Error adding Sighting: Hero or location id provided doesn't match existing rows or invalid fields.");
        }
    }

    //POST add existing

    @PostMapping("/hero/organisation")
    public ResponseEntity<Object> addOrganisationToHero(@RequestBody Hero hero){
        try{
            if(hero == null || hero.getId() == 0 || hero.getInOrganisation() == null || hero.getInOrganisation().isEmpty()){
                throw new InvalidObjectException("Error adding organisation to hero: Hero id and/or organisation id cannot be empty");
            }else{
                HashMap<String, String> jsonResponse = new HashMap<>();
                jsonResponse.put("successful", "true");
                service.addHeroToOrganisation(hero, hero.getInOrganisation().get(0));
                return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
            }
        } catch(DataIntegrityViolationException e){
            throw new FailedPersistenceException("Error adding organisation to hero: Hero or location id provided doesn't match existing rows or combination is a duplicate.");
        }
    }

    @PostMapping("/hero/superpower")
    public ResponseEntity<Object> addSuperPowerToHero(@RequestBody Hero hero){
        try{
            System.out.println(hero.toString());
            if(hero.getSuperPower() == null || hero.getSuperPower().getId() == 0){
                throw new InvalidObjectException("Error adding SuperPower to hero: Hero must include an id of an existing super power.");
            }
            HashMap<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("successful", "true");
            service.addSuperPowerToHero(hero.getId(), hero.getSuperPower().getId());
            return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
        } catch(DataIntegrityViolationException e){
            System.out.println(e.getMessage());
            throw new FailedPersistenceException("Error adding SuperPower to hero: Hero or super power id provided doesn't match existing rows or combination is a duplicate.");
        } catch(MethodArgumentTypeMismatchException ex){
            throw new InvalidObjectException("Error adding SuperPower to hero: Hero is missing required fields.");
        }
    }

    @PostMapping("/sighting/location")
    public ResponseEntity<Object> addLocationToSighting(@RequestBody Sighting sighting){
        try{
            if(sighting.getLocation() == null || sighting.getLocation().getId() == 0 || sighting.getId() == 0){
                throw new InvalidObjectException("Error adding Location: Location id and sighting id is required to add a location to a sighting.");
            }
            Sighting retrievedSighting = service.getSightingById(sighting.getId());
            Location location = service.getLocationById(sighting.getLocation().getId());
            retrievedSighting.setLocation(location);
            service.addOrUpdateSightings(retrievedSighting);
            HashMap<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("successful", "true");
            return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
        } catch(DataIntegrityViolationException e){
            throw new FailedPersistenceException("Error adding Location: Sighting or location id provided doesn't match existing rows.");
        } catch(MethodArgumentTypeMismatchException ex){
            throw new InvalidObjectException("Error adding Location: Sighting is missing required fields.");
        }
    }


    //DELETE endpoints

    @DeleteMapping("/hero")
    public ResponseEntity<Object> deleteHero(@RequestBody Hero hero){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteHeroById(hero.getId());
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/superpower")
    public ResponseEntity<Object> deleteSuperPowers(@RequestBody SuperPower superPower){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSuperPowerById(superPower.getId());
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/location")
    public ResponseEntity<Object> deleteLocation(@RequestBody Location location){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteLocationById(location.getId());
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/organisation")
    public ResponseEntity<Object> deleteOrganisation(@RequestBody Organisation organisation){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteOrganisationById(organisation.getId());
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/sightings")
    public ResponseEntity<Object> deleteSighting(@RequestBody Sighting sighting){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSightingById(sighting.getId());
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    //DELETE from existing

    @DeleteMapping("/hero/organisation")
    public ResponseEntity<Object> deleteHeroFromOrganisation(@RequestBody Hero hero, @RequestBody Organisation organisation){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteHeroFromOrganisation(hero, organisation);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/hero/superpower")
    public ResponseEntity<Object> deleteSuperPowerFromHero(@RequestBody Hero hero){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSuperPowerFromHero(hero);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/sighting/location")
    public ResponseEntity<Object> deleteLocationFromSighting(@RequestBody Sighting sighting){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteLocationFromSighting(sighting);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

}
