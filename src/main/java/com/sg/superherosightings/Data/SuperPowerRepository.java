package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.Entity.JPAEntities.SuperPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SuperPowerRepository extends JpaRepository<SuperPower, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE hero SET superpower_id=:#{#superpowerParam} WHERE id=:#{#heroParam}", nativeQuery = true)
    void addSuperPowerToHero(@Param("heroParam") int heroId, @Param("superpowerParam") int superPowerId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE hero SET superpower_id=null WHERE superpower_id=:#{#powerId}", nativeQuery = true)
    void removeSuperPowerFromHeroes(@Param("powerId") int id);
}
