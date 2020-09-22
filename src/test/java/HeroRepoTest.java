import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.HashSet;

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

//    @BeforeEach
//    public void clearDB(){
//        heroRepo.deleteAll();
//        spRepo.deleteAll();
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
        Location loc = new Location();
        loc.setAddress("some address");
        loc.setDescription("some loc description");
        loc.setLatitude(12.0);
        loc.setLongitude(45.0);
        loc.setName("location name");

        System.out.println(Arrays.toString(sightRepo.findByLocation(loc).toArray()));
    }


}
