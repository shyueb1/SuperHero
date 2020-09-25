import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.Data.OrganisationRepository;
import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class OrganisationRepoTest {

    @Autowired
    OrganisationRepository orgRepo;

    @Autowired
    HeroRepository heroRepo;

    @BeforeEach
    public void clearDB(){
        orgRepo.deleteHeroOrganisationBridge();
        orgRepo.deleteAll();
        heroRepo.deleteAll();
    }

    @AfterAll
    public void clearDBAfter(){
        orgRepo.deleteHeroOrganisationBridge();
        orgRepo.deleteAll();
        heroRepo.deleteAll();
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
        assertTrue(orgRepo.findById(savedOrg.getId()).get().getId() == savedOrg.getId());
        assertTrue(orgRepo.findById(savedOrg2.getId()).get().getId() == savedOrg2.getId());

        orgRepo.deleteAll();
        orgRepo.deleteAll();
        orgRepo.deleteAll();
        assertTrue(orgRepo.findAll().isEmpty());

    }

    @Test
    public void addDeleteHeroFromToOrganisation(){
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

        Hero storedA = heroRepo.save(heroA);
        Hero storedB = heroRepo.save(heroB);

        Organisation organisation = new Organisation();
        Organisation organisation2 = new Organisation();

        organisation.setMembers(new ArrayList<Hero>());
        organisation.setDescription("desc");
        organisation.setTelephone("02323232323");
        organisation.setName("name");
        organisation.setLocation(null);

        organisation2.setMembers(new ArrayList<Hero>());
        organisation2.setDescription("desc22");
        organisation2.setTelephone("02323232323");
        organisation2.setName("name22");
        organisation2.setLocation(null);

        Organisation savedOrg = orgRepo.save(organisation);
        Organisation savedOrg2 = orgRepo.save(organisation2);

        orgRepo.addHeroToOrganisation(heroA, savedOrg);

        assertTrue(orgRepo.findByHero(storedA).get(0).getId() == savedOrg.getId());
        orgRepo.deleteHeroFromOrganisation(storedA, savedOrg);
        assertTrue(orgRepo.findByHero(storedA).isEmpty());

        orgRepo.addHeroToOrganisation(heroA, savedOrg);
        orgRepo.addHeroToOrganisation(heroB, savedOrg);
        assertTrue(orgRepo.findByHero(storedA).get(0).getId() == savedOrg.getId());
        assertTrue(orgRepo.findByHero(storedB).get(0).getId() == savedOrg.getId());

        orgRepo.deleteHeroFromOrganisation(heroA, savedOrg);
        orgRepo.deleteHeroFromOrganisation(heroB, savedOrg);
        assertTrue(orgRepo.findByHero(storedA).isEmpty());
        assertTrue(orgRepo.findByHero(storedB).isEmpty());

        orgRepo.addHeroToOrganisation(heroA, savedOrg);
        orgRepo.addHeroToOrganisation(heroA, savedOrg2);
        assertTrue(orgRepo.findByHero(storedA).size() == 2);
    }


}
