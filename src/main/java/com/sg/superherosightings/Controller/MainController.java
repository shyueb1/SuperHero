package com.sg.superherosightings.Controller;

import com.sg.superherosightings.Entity.JPAEntities.*;
import com.sg.superherosightings.Service.ServiceLayerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //DELETE endpoints

    @DeleteMapping("/hero")
    public ResponseEntity<Object> deleteHero(Hero hero){
        throw new UnsupportedOperationException();
    }

    @DeleteMapping("/superpower")
    public ResponseEntity<Object> deleteSuperPowers(SuperPower superPower){
        throw new UnsupportedOperationException();
    }

    @DeleteMapping("/location")
    public ResponseEntity<Object> deleteLocation(Location location){
        throw new UnsupportedOperationException();
    }

    @DeleteMapping("/organisation")
    public ResponseEntity<Object> deleteOrganisation(Organisation organisation){
        throw new UnsupportedOperationException();
    }

    @DeleteMapping("/sightings")
    public ResponseEntity<Object> deleteSighting(Sighting sighting){
        throw new UnsupportedOperationException();
    }

    //POST endpoints

    @PostMapping("/hero")
    public ResponseEntity<Object> addOrUpdateHero(Hero hero){
        throw new UnsupportedOperationException();
    }

    @PostMapping("/superpower")
    public ResponseEntity<Object> addOrUpdateSuperPower(SuperPower superPower){
        throw new UnsupportedOperationException();
    }

    @PostMapping("/location")
    public ResponseEntity<Object> addOrUpdateLocation(Location location){
        throw new UnsupportedOperationException();
    }

    @PostMapping("/organisation")
    public ResponseEntity<Object> addOrUpdateSuperPower(Organisation organisation){
        throw new UnsupportedOperationException();
    }

    @PostMapping("/sightings")
    public ResponseEntity<Object> addOrUpdateSuperPower(Sighting sighting){
        throw new UnsupportedOperationException();
    }


}
