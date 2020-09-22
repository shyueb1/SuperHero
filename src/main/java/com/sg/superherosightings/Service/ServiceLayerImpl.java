package com.sg.superherosightings.Service;

import com.sg.superherosightings.Data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceLayerImpl {
    @Autowired
    HeroRepository heroRepo;

    @Autowired
    SuperPowerRepository spRepo;

    @Autowired
    OrganisationRepository orgRepo;

    @Autowired
    SightingRepository sightRepo;

    @Autowired
    LocationRepository locationRepository;

}
