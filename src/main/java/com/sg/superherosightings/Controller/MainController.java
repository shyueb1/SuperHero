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

    @GetMapping("/hero/viewall")
    public ResponseEntity<List<Hero>> getAllHeroes(){
        return new ResponseEntity<>(service.getAllHeroes(), HttpStatus.OK);
    }

    @GetMapping("/superpower/viewall")
    public ResponseEntity<List<SuperPower>> getAllSuperPowers(){
        return new ResponseEntity<>(service.getAllSuperPowers(), HttpStatus.OK);
    }

    @GetMapping("/location/viewall")
    public ResponseEntity<List<Location>> getAllLocations(){
        return new ResponseEntity<>(service.getAllLocations(), HttpStatus.OK);
    }

    @GetMapping("/organisation/viewall")
    public ResponseEntity<List<Organisation>> getAllOrganisations(){
        return new ResponseEntity<>(service.getAllOrganisations(), HttpStatus.OK);
    }

    @GetMapping("/sightings/viewall")
    public ResponseEntity<List<Sighting>> getAllSightings(){
        return new ResponseEntity<>(service.getAllSightings(), HttpStatus.OK);
    }

    //POST endpoints

    @PostMapping("/hero")
    public ResponseEntity<Object> addOrUpdateHero(Hero hero){
        return new ResponseEntity<>(service.addOrUpdateHero(hero), HttpStatus.OK);
    }

    @PostMapping("/superpower")
    public ResponseEntity<Object> addOrUpdateSuperPower(SuperPower superPower){
        return new ResponseEntity<>(service.addOrUpdateSuperPower(superPower), HttpStatus.OK);
    }

    @PostMapping("/location")
    public ResponseEntity<Object> addOrUpdateLocation(Location location){
        return new ResponseEntity<>(service.addOrUpdateLocation(location), HttpStatus.OK);
    }

    @PostMapping("/organisation")
    public ResponseEntity<Object> addOrUpdateOrganisation(Organisation organisation){
        return new ResponseEntity<>(service.addOrUpdateOrganisation(organisation), HttpStatus.OK);
    }

    @PostMapping("/sightings")
    public ResponseEntity<Object> addOrUpdateSighting(Sighting sighting){
        return new ResponseEntity<>(service.addOrUpdateSightings(sighting), HttpStatus.OK);
    }

    //DELETE endpoints

    @DeleteMapping("/hero")
    public ResponseEntity<Object> deleteHero(Hero hero){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteHero(hero);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/superpower")
    public ResponseEntity<Object> deleteSuperPowers(SuperPower superPower){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSuperPower(superPower);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/location")
    public ResponseEntity<Object> deleteLocation(Location location){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteLocation(location);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/organisation")
    public ResponseEntity<Object> deleteOrganisation(Organisation organisation){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteOrganisation(organisation);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @DeleteMapping("/sightings")
    public ResponseEntity<Object> deleteSighting(Sighting sighting){
        HashMap<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("successful", "true");
        service.deleteSighting(sighting);
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }


}
