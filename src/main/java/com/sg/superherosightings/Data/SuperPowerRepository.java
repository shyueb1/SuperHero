package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Hero;
import com.sg.superherosightings.Entity.JPAEntities.Organisation;
import com.sg.superherosightings.Entity.JPAEntities.SuperPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperPowerRepository extends JpaRepository<SuperPower, Integer> {

    @Query(value = "UPDATE hero SET superpower_id=:#{#powerParam.id} WHERE id=:#{#heroParam.id}", nativeQuery = true)
    void addSuperPowerToHero(@Param("powerParam") SuperPower power, @Param("heroParam") Hero hero);
}
