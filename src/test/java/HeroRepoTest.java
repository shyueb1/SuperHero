//import com.sg.superherosightings.Data.*;
//import com.sg.superherosightings.Entity.JPAEntities.Hero;
//import com.sg.superherosightings.Entity.JPAEntities.Organisation;
//import com.sg.superherosightings.TestApplicationConfiguration;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import org.junit.jupiter.api.BeforeEach;
//
//import java.util.ArrayList;
//
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(classes = TestApplicationConfiguration.class)
//public class HeroRepoTest {
//
//    @Autowired
//    HeroRepository heroRepo;
//
//    @Autowired
//    OrganisationRepository orgRepo;
//
//    @BeforeEach
//    public void clearDB(){
//        heroRepo.deleteAll();
//        orgRepo.deleteHeroOrganisationBridge();
//        orgRepo.deleteAll();
//    }
//
//    @Test
//    public void findAllDeleteAllTest(){
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
//        assertTrue(heroRepo.findAll().isEmpty());
//
//        heroRepo.save(heroA);
//        assertTrue(!heroRepo.findAll().isEmpty() && heroRepo.findAll().size() == 1);
//
//        heroRepo.deleteAll();
//        assertTrue(heroRepo.findAll().isEmpty());
//
//        Hero storedHeroA = heroRepo.save(heroA);
//        heroRepo.save(heroB);
//        assertTrue(heroRepo.findAll().size() == 2);
//
//        heroRepo.save(storedHeroA);
//        assertTrue(heroRepo.findAll().size() == 2);
//    }
//
//    @Test
//    public void findByOrganisationTest(){
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
//        Organisation org = new Organisation();
//        org.setLocation(null);
//        org.setName("Random Organisation");
//        org.setTelephone("890348989");
//        org.setDescription("A description");
//        org.setMembers(new ArrayList<Hero>());
//        Organisation savedOrg = orgRepo.save(org);
//
//        assertTrue(heroRepo.findByOrganisation(savedOrg).isEmpty());
//
//        heroRepo.save(heroA);
//        heroRepo.save(heroB);
//        orgRepo.addHeroToOrganisation(heroA.getId(), savedOrg.getId());
//
//        assertTrue(!heroRepo.findByOrganisation(savedOrg).isEmpty() && heroRepo.findByOrganisation(savedOrg).get(0).equals(heroA));
//
//        orgRepo.addHeroToOrganisation(heroB.getId(), savedOrg.getId());
//        assertTrue(heroRepo.findByOrganisation(savedOrg).size() == 2 && heroRepo.findByOrganisation(savedOrg).get(1).equals(heroB));
//    }
//
//    @Test
//    public void saveEditAndDeleteHeroTest(){
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
//        assertTrue(heroRepo.findAll().isEmpty());
//        Hero savedHeroA = heroRepo.save(heroA);
//        Hero savedHeroB =  heroRepo.save(heroB);
//
//        assertTrue(!heroRepo.findById(200).isPresent());
//        assertTrue(heroRepo.findById(savedHeroA.getId()).isPresent());
//        assertTrue(heroRepo.findById(savedHeroB.getId()).isPresent());
//
//        savedHeroA.setName("newname");
//        heroRepo.save(savedHeroA);
//        assertTrue(heroRepo.findById(savedHeroA.getId()).get().getName().equals("newname") && heroRepo.findAll().size() == 2);
//
//        heroRepo.delete(savedHeroB);
//        assertTrue(heroRepo.findById(savedHeroB.getId()).isEmpty());
//        assertTrue(heroRepo.findAll().size() == 1);
//
//        heroRepo.save(heroB);
//        assertTrue(heroRepo.findAll().size() == 2);
//        heroRepo.deleteAll();
//        heroRepo.deleteAll();
//        heroRepo.deleteAll();
//        assertTrue(heroRepo.findAll().isEmpty());
//    }
//}
