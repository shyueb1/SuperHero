import com.sg.superherosightings.Data.HeroRepository;
import com.sg.superherosightings.TestApplicationConfiguration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TestApplicationConfiguration.class)
public class HeroRepoTest {

    @Autowired
    HeroRepository heroRepo;

    @Test
    public void contextLoads() {
        System.out.println(Arrays.toString(heroRepo.findAll().toArray()));
    }
}
