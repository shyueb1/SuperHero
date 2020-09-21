package com.sg.superherosightings.Data;

import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;

import java.util.List;

public interface HeroDao {
    List<Hero> getAllHeroes();
    Hero getHeroById(int id);
    void addHero(Hero hero);
    void deleteHero(Hero hero);
    void updateHero(Hero hero);
}
