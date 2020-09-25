import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.Data.SuperPowerRepository;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.SuperPower;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.Before;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SuperPowerTest {

    @Autowired
    SuperPowerRepository spRepo;

    @Autowired
    HeroRepository heroRepo;

    @BeforeEach
    public void clearDB(){
        heroRepo.deleteAll();
        spRepo.deleteAll();
    }

    @AfterAll
    public void clearDBAfter(){
        heroRepo.deleteAll();
        spRepo.deleteAll();
    }

    @Test
    public void addRemoveSuperPower(){
        Hero heroA = new Hero();
        Hero heroB = new Hero();
        heroA.setName("heroA");
        heroB.setName("heroB");
        heroA.setDescription("First hero");
        heroB.setDescription("Second hero");
        heroA.setInOrganisation(null);
        heroB.setInOrganisation(null);
        heroA.setSuperPower(null);
        heroB.setSuperPower(null);
        heroA.setVillain(true);
        heroA.setVillain(false);

        SuperPower sp1 = new SuperPower();
        sp1.setName("flying");
        sp1.setDescription("desc");

        SuperPower sp2 = new SuperPower();
        sp2.setName("strength");
        sp2.setDescription("desc");

        Hero savedA = heroRepo.save(heroA);
        Hero savedB = heroRepo.save(heroB);
        SuperPower savedSp1 = spRepo.save(sp1);
        SuperPower savedSp2 = spRepo.save(sp2);

        spRepo.addSuperPowerToHero(savedA.getId(), savedSp1.getId());
        assertTrue(heroRepo.findById(savedA.getId()).get().getSuperPower().getId() == savedSp1.getId());

        spRepo.addSuperPowerToHero(savedB.getId(), savedSp2.getId());
        assertTrue(heroRepo.findById(savedB.getId()).get().getSuperPower().getId() == savedSp2.getId());

        spRepo.removeSuperPowerFromHeroes(savedA.getId());
        spRepo.removeSuperPowerFromHeroes(savedB.getId());
    }
}
