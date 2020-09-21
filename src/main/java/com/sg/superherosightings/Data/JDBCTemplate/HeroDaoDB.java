package com.sg.superherosightings.Data.JDBCTemplate;

import com.sg.superherosightings.Data.HeroDao;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class HeroDaoDB implements HeroDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public HeroDaoDB(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hero> getAllHeroes() {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM hero;");
            return statement;
        }), new HeroMapper());
    }

    @Override
    public Hero getHeroById(int id) {
        String sql = "SELECT * FROM hero WHERE id=?;";
        List<Hero> heroes = jdbcTemplate.query((Connection conn) -> {
            PreparedStatement statement = conn.prepareStatement(
                    sql);
            statement.setInt(1, id);
            return statement;
        }, new HeroMapper());
        return heroes.size() == 1 ? heroes.get(0) : null;
    }

    @Transactional
    @Override
    public void addHero(Hero hero) {
        jdbcTemplate.update((conn) -> {
            PreparedStatement statement = conn.prepareStatement(
                    "INSERT INTO hero (name, description, superpower, isVillain) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = name;");
            statement.setString(1, hero.getName());
            statement.setString(2, hero.getDescription());
            statement.setString(3, hero.getSuperpower());
            statement.setBoolean(4, hero.isVillain());
            return statement;
        });
        if(hero.getInOrganisation() != null && !hero.getInOrganisation().isEmpty()){
            hero.getInOrganisation().forEach(organisation -> {
                jdbcTemplate.update((Connection conn) -> {
                    PreparedStatement statement = conn.prepareStatement(
                            "INSERT INTO organisation (name, description, address, telephone_no) VALUES (?, ?, ?, ?)  ON DUPLICATE KEY UPDATE name = name;");
                    statement.setString(1, organisation.getName());
                    statement.setString(2, organisation.getDescription());
                    statement.setString(3, organisation.getAddress());
                    statement.setString(4, organisation.getTelephone());
                    return statement;
                });
            });
        }
    }

    @Override
    public void deleteHero(Hero hero) {
        jdbcTemplate.update((conn -> {
            PreparedStatement statement = conn.prepareStatement(
                    "DELETE FROM hero WHERE name=?;"
            );
            statement.setString(1, hero.getName());
            return statement;
        }));
    }

    @Override
    public void updateHero(Hero hero) {
        jdbcTemplate.update((conn -> {
            PreparedStatement statement = conn.prepareStatement(
                    "UPDATE hero SET name=?, description=?, superpower=?, isVillain=? WHERE name=?;"
            );
            statement.setString(1, hero.getName());
            statement.setString(2, hero.getDescription());
            statement.setString(3, hero.getSuperpower());
            statement.setBoolean(4, hero.isVillain());
            statement.setString(5, hero.getName());
            return statement;
        }));
    }

    public static final class HeroMapper implements RowMapper<Hero> {
        @Override
        public Hero mapRow(ResultSet rs, int index) throws SQLException {
            Hero hero = new Hero();
            hero.setName(rs.getString("name"));
            hero.setDescription(rs.getString("description"));
            hero.setSuperpower(rs.getString("superpower"));
            hero.setVillain(rs.getBoolean("isVillain"));
            return hero;
        }
    }
}
