import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.Data.OrganisationRepository;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.aspectj.weaver.ast.Or;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
public class OrganisationRepoTest {

    @Autowired
    OrganisationRepository orgRepo;

    @Autowired
    HeroRepository heroRepo;

    @BeforeEach
    public void clearDB(){
        orgRepo.deleteHeroOrganisationBridge();
        orgRepo.deleteAll();
    }

    @Test
    public void saveEditDeleteTest(){
        orgRepo.deleteAll();
        Organisation organisation = new Organisation();
        Organisation organisation2 = new Organisation();

        organisation.setMembers(new ArrayList<Hero>());
        organisation.setDescription("desc");
        organisation.setTelephone("02323232323");
        organisation.setName("name");
        organisation.setLocation(null);

        organisation2.setMembers(new ArrayList<Hero>());
        organisation2.setDescription("desc2");
        organisation2.setTelephone("029839823");
        organisation2.setName("name2");
        organisation2.setLocation(null);

        assertTrue(orgRepo.findAll().isEmpty());

        Organisation savedOrg = orgRepo.save(organisation);
        assertTrue(orgRepo.findAll().size() == 1);

        Organisation savedOrg2 = orgRepo.save(organisation2);
        assertTrue(orgRepo.findAll().size() == 2);

        System.out.println(savedOrg.toString());
        System.out.println(orgRepo.findById(savedOrg.getId()).get().toString());
        assertTrue(orgRepo.findById(savedOrg.getId()).get().equals(savedOrg));
        assertTrue(orgRepo.findById(savedOrg2.getId()).get().equals(savedOrg2));

        orgRepo.deleteAll();
        orgRepo.deleteAll();
        orgRepo.deleteAll();
        assertTrue(orgRepo.findAll().isEmpty());

    }

//    @Test
//    public void findByOrganisationTest(){
//        Organisation organisation = new Organisation();
//        organisation.setMembers(new ArrayList<Hero>());
//        organisation.setDescription("desc");
//        organisation.setTelephone("02323232323");
//        organisation.setName("name");
//        organisation.setLocation(null);
//
//        Hero heroA = new Hero();
//        Hero heroB = new Hero();
//        heroA.setName("heroA");
//        heroB.setName("heroB");
//        heroA.setDescription("First hero");
//        heroB.setDescription("Second hero");
//        heroA.setInOrganisation(null);
//        heroB.setInOrganisation(null);
//        heroA.setSuperPower(null);
//        heroB.setSuperPower(null);
//        heroA.setVillain(true);
//        heroA.setVillain(false);
//
//        Hero savedHero1 = heroRepo.save(heroA);
//        Hero savedHero2 = heroRepo.save(heroB);
//
//        Organisation savedOrg = orgRepo.save(organisation);
//        assertTrue(orgRepo.findByOrganisation(savedOrg).isEmpty());
//
//        orgRepo.addHeroToOrganisation(savedHero1.getId(), savedOrg.getId());
//        System.out.println(savedHero1.toString());
//        System.out.println(orgRepo.findByOrganisation(savedOrg).get(0).toString());
//        assertTrue(orgRepo.findByOrganisation(savedOrg).size() == 1 && orgRepo.findByOrganisation(savedOrg).get(0).equals(savedHero1));
//        orgRepo.addHeroToOrganisation(heroB.getId(), savedOrg.getId());
//        assertTrue(orgRepo.findByOrganisation(savedOrg).size() == 2 && orgRepo.findByOrganisation(savedOrg).get(1).equals(savedHero2));
//    }
}
