package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.SuperPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperPowerRepository extends JpaRepository<SuperPower, Integer> {
}
