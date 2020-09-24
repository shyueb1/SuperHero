import com.sg.superherosightings.Data.*;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Location;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
public class LocationRepoTest {
    @Autowired
    LocationRepository locRepo;

    @BeforeEach
    public void clearDB(){
        locRepo.deleteAll();
    }

    @Test
    public void saveEditAndDeleteLocationTest(){
        Location locA = new Location();
        Location locB = new Location();

        locA.setAddress("address A");
        locA.setDescription("description A");
        locA.setName("name A");
        locA.setLongitude(0.02);
        locA.setLatitude(2.02);

        locB.setAddress("address B");
        locB.setDescription("description B");
        locB.setName("name B");
        locB.setLongitude(0.22);
        locB.setLatitude(2.32);

        assertTrue(locRepo.findAll().isEmpty());
        Location storedLocA = locRepo.save(locA);
        assertTrue(!locRepo.findAll().isEmpty() && locRepo.findById(storedLocA.getId()).get().equals(locA));

        Location storedLocB = locRepo.save(locB);
        assertTrue(!locRepo.findAll().isEmpty() && locRepo.findById(storedLocB.getId()).get().equals(locB));
        assertTrue(locRepo.findAll().size() == 2);

        storedLocA.setLatitude(0.00021);
        locRepo.save(storedLocA);
        storedLocA.setLongitude(0.00021);
        locRepo.save(storedLocA);
        storedLocA.setDescription("new desc");
        locRepo.save(storedLocA);

        assertTrue(storedLocA.equals(locRepo.findById(storedLocA.getId()).get()));
        assertTrue(locRepo.findAll().size() == 2);
        assertTrue(locRepo.findById(3).isEmpty());

        locRepo.deleteAll();
        assertTrue(locRepo.findAll().isEmpty());
        locRepo.deleteAll();
        locRepo.deleteAll();
    }


}
