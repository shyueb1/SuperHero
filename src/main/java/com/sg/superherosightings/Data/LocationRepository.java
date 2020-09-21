package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JPAEntities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer> {
}
