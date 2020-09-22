package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Superpower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperpowerRespository extends JpaRepository<Superpower, Integer> {
}
