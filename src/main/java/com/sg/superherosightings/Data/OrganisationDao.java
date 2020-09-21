package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Organisation;

import java.util.List;

public interface OrganisationDao {
    List<Hero> getAllMembersByOrganisation(Organisation organisation);
    List<Organisation> getAllOrganisationsByHero(Hero hero);
}
