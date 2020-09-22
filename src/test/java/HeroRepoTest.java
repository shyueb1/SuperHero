import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.Entity.JPAEntities.Sighting;
import com.sg.superherosightings.Entity.JPAEntities.SuperPower;
import com.sg.superherosightings.TestApplicationConfiguration;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.HashSet;
import org.junit.jupiter.api.BeforeEach;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
public class HeroRepoTest {

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
//
//    @BeforeEach
//    public void clearDB(){
//        heroRepo.deleteAll();
//        spRepo.deleteAll();
//
//    }

    @Test
    public void createAndSaveLocationAndOrganisation() {
//        Location location = new Location();
//        location.setAddress("address");
//        location.setDescription("desc");
//        location.setName("some place");
//        location.setLatitude(0.02);
//        location.setLongitude(0.021);
//        Location newLoc = locationRepository.save(location);
        Organisation org = new Organisation();
//        org.setName("Extra Definitely Evil Inc");
//        org.setDescription("an org");
        org.setLocation(null);
//        org.setTelephone("023094544532");
        org.setMembers(new HashSet<>());
        org.setId(1);
//        Organisation newOrg = orgRepo.save(org);
//        System.out.println(newOrg.toString());
        System.out.println(Arrays.toString(heroRepo.findByOrganisation(org).toArray()));
    }

    @Test
    public void findAllHeroesByLocationTest(){
//        LocalDate newDate = LocalDate.of(2020, 1, 21);
//        Hero h = new Hero();
//        SuperPower superpower = new SuperPower();
//        superpower.setDescription("power description");
//        superpower.setName("power name");
//        spRepo.save(superpower);
//        h.setName("hero name");
//        h.setDescription("hero description");
//        h.setVillain(true);
//        h.setSuperpower(superpower);
//        heroRepo.save(h);
        Location loc = new Location();
        loc.setAddress("some address");
        loc.setDescription("some loc description");
        loc.setLatitude(12.0);
        loc.setLongitude(45.0);
        loc.setName("location name");
        locationRepository.save(loc);
//        Sighting sight1 = new Sighting();
//        sight1.setLocation(loc);
//        sight1.setHero(h);
//        sight1.setDate(newDate);
//        sightRepo.save(sight1);
        System.out.println(Arrays.toString(sightRepo.findByLocation(loc).toArray()));
    }
    
    @Test
    public void findAllLocationsByHero(){
        Hero h = new Hero();
        SuperPower superpower = new SuperPower();
        h.setName("hero name");
        h.setDescription("hero description");
        h.setVillain(true);
        h.setSuperpower(superpower);
        System.out.println(Arrays.toString(sightRepo.findByHero(h).toArray()));
    }
    
    @Test
    public void findSightingsByDate(){
        LocalDate newDate = LocalDate.of(2020, 1, 21);

        System.out.println(Arrays.toString(sightRepo.findByDate(newDate).toArray()));
    }


}
