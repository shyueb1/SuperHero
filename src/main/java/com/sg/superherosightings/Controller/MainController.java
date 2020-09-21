package com.sg.superherosightings.Controller;

import com.sg.superherosightings.Data.HeroDao;
import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.Data.LocationDao;
import com.sg.superherosightings.Data.OrganisationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
public class MainController {
    private HeroDao heroDao;
    private LocationDao locationDao;
    private OrganisationDao organisationDao;
    private HeroRepository heroRepo;

    @Autowired
    public MainController(HeroDao heroDao, LocationDao locationDao, OrganisationDao organisationDao, HeroRepository heroRepo) {
        this.heroDao = heroDao;
        this.locationDao = locationDao;
        this.organisationDao = organisationDao;
        this.heroRepo = heroRepo;
    }

    @GetMapping("test")
    public String getTest(){
        return Arrays.toString(heroRepo.findAll().toArray());
    }

}
