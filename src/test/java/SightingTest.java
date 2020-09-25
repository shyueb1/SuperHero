import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.Data.LocationRepository;
import com.sg.superherosightings.Data.SightingRepository;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Sighting;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertTrue;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SightingTest {

    @Autowired
    SightingRepository sightingRepo;

    @Autowired
    HeroRepository heroRepo;

    @Autowired
    LocationRepository locRepo;

    @BeforeEach
    public void clearDB(){
        sightingRepo.deleteAll();
        heroRepo.deleteAll();
        locRepo.deleteAll();
    }

    @AfterAll
    public void clearDBAfter(){
        sightingRepo.deleteAll();
        heroRepo.deleteAll();
        locRepo.deleteAll();
    }

    @Test
    public void createEditDeleteSighting(){
        Hero heroA = new Hero();
        heroA.setName("heroA");
        heroA.setDescription("First hero");
        heroA.setInOrganisation(null);
        heroA.setSuperPower(null);
        heroA.setVillain(true);
        heroA.setVillain(false);

        Sighting sighting = new Sighting();
        sighting.setLocation(null);
        sighting.setHero(heroA);
        sighting.setDate(LocalDate.now());

        assertTrue(sightingRepo.findAll().isEmpty());
        Sighting storedSighting = sightingRepo.save(sighting);

        assertTrue(sightingRepo.findAll().size() == 1);
        assertTrue(sightingRepo.findById(storedSighting.getId()).get().getId() == storedSighting.getId());

        sightingRepo.save(storedSighting);
        sightingRepo.save(storedSighting);
        sightingRepo.save(storedSighting);

        assertTrue(sightingRepo.findAll().size() == 1);

        Location location = new Location();
        location.setDescription("desc");
        location.setLongitude(0.02);
        location.setLongitude(2.22);
        location.setName("name");
        location.setAddress("address");

        storedSighting.setLocation(location);
        sightingRepo.save(storedSighting);

        assertTrue(sightingRepo.findById(storedSighting.getId()).get().getLocation().getLatitude() == location.getLatitude() && sightingRepo.findById(storedSighting.getId()).get().getLocation().getLongitude() == location.getLongitude());

        sightingRepo.delete(storedSighting);
        assertTrue(sightingRepo.findAll().isEmpty());
    }

    @Test
    public void findTenRecentTest(){
        Hero heroA = new Hero();
        heroA.setName("heroA");
        heroA.setDescription("First hero");
        heroA.setInOrganisation(null);
        heroA.setSuperPower(null);
        heroA.setVillain(true);
        heroA.setVillain(false);

        Sighting sighting = new Sighting();
        sighting.setLocation(null);
        sighting.setHero(heroA);
        sighting.setDate(LocalDate.now());

        assertTrue(sightingRepo.findTenRecentSightings().size() == 0);

        Sighting storedS1 = sightingRepo.save(sighting);
        assertTrue(sightingRepo.findTenRecentSightings().size() == 1);

        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        sightingRepo.save(sighting);
        assertTrue(sightingRepo.findTenRecentSightings().size() <= 10);
    }
}
