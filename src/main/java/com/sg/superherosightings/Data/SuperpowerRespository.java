package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Superpower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperpowerRespository extends JpaRepository<Superpower, Integer> {
}
