package com.sg.superherosightings.Controller;

import com.sg.superherosightings.Entity.JPAEntities.*;
import com.sg.superherosightings.Service.ServiceLayerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/sightings")
    public ResponseEntity<List<Sighting>> getAllSightings(){
        return new ResponseEntity<>(service.getAllSightings(), HttpStatus.OK);
    }

    @GetMapping("/sightings")
    public ResponseEntity<List<Sighting>> getTop10Sightings(){
        return new ResponseEntity<>(service.getAllSightings(), HttpStatus.OK);
    }


    //POST endpoints

    @PostMapping("/hero")
    public ResponseEntity<Object> addOrUpdateHero(@RequestBody Hero hero){
        return new ResponseEntity<>(service.addOrUpdateHero(hero), HttpStatus.OK);
    }

    @PostMapping("/superpower")
    public ResponseEntity<Object> addOrUpdateSuperPower(@RequestBody SuperPower superPower){
        return new ResponseEntity<>(service.addOrUpdateSuperPower(superPower), HttpStatus.OK);
    }

    @PostMapping("/location")
    public ResponseEntity<Object> addOrUpdateLocation(@RequestBody Location location){
        return new ResponseEntity<>(service.addOrUpdateLocation(location), HttpStatus.OK);
    }

    @PostMapping("/organisation")
    public ResponseEntity<Object> addOrUpdateOrganisation(@RequestBody Organisation organisation){
        return new ResponseEntity<>(service.addOrUpdateOrganisation(organisation), HttpStatus.OK);
    }

    @PostMapping("/sightings")
    public ResponseEntity<Object> addOrUpdateSighting(@RequestBody Sighting sighting){
        return new ResponseEntity<>(service.addOrUpdateSightings(sighting), HttpStatus.OK);
    }

    //POST add existing

    @PostMapping("/hero/organisation")
    public ResponseEntity<Object> addOrganisationToHero(@RequestBody Hero hero, @RequestBody Organisation organisation){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.addHeroToOrganisation(hero, organisation);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @PostMapping("/hero/superpower")
    public ResponseEntity<Object> addSuperPowerToHero(@RequestBody Hero hero, @RequestBody SuperPower power){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.addSuperPowerToHero(power, hero);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @PostMapping("/sighting/location")
    public ResponseEntity<Object> addLocationToSighting(@RequestBody Location location, @RequestBody Sighting sighting){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.addLocationToSighting(location, sighting);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }


    //DELETE endpoints

    @DeleteMapping("/hero")
    public ResponseEntity<Object> deleteHero(@RequestBody Hero hero){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteHero(hero);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/superpower")
    public ResponseEntity<Object> deleteSuperPowers(@RequestBody SuperPower superPower){
        System.out.println(superPower.toString());
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSuperPower(superPower);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/location")
    public ResponseEntity<Object> deleteLocation(@RequestBody Location location){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteLocation(location);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/organisation")
    public ResponseEntity<Object> deleteOrganisation(@RequestBody Organisation organisation){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteOrganisation(organisation);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/sightings")
    public ResponseEntity<Object> deleteSighting(@RequestBody Sighting sighting){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSighting(sighting);
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
