package com.sg.superherosightings.Data.JDBCTemplate;

import com.sg.superherosightings.Data.LocationDao;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.HeroSighting;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class LocationDaoDB implements LocationDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public LocationDaoDB(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Set<Hero> getHeroesSeenAtLocation(Location location) {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement(" SELECT * FROM sighting INNER JOIN hero ON hero_id = hero.id INNER JOIN location ON location.id = location_id WHERE address=? OR latitude=? AND longitude=?;");
            statement.setString(1, location.getAddress());
            statement.setDouble(2, location.getLatitude());
            statement.setDouble(3, location.getLongitude());
            return statement;
        }), new HeroDaoDB.HeroMapper()).stream().collect(Collectors.toSet());
    }

    @Override
    public void addHeroSighting(HeroSighting sighting) {
        jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement("INSERT INTO sighting (hero_id, location_id, date_of_sighting) values (?, ?, ?);");
            statement.setInt(1, sighting.getHero().getId());
            statement.setInt(2, sighting.getLocation().getId());
            statement.setDate(3, Date.valueOf(sighting.getDate()));
            return statement;
        });
    }

    @Override
    public List<Location> getAllSightingLocationsByHero(Hero hero) {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM sighting INNER JOIN hero ON hero_id = hero.id WHERE hero.id=? OR hero.name=?;");
            statement.setInt(1, hero.getId());
            statement.setString(2, hero.getName());
            return statement;
        }), new LocationMapper());
    }

    @Override
    public List<Location> getAllSightingLocationsByDate(LocalDate date) {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM sighting INNER JOIN location ON location.id = location_id WHERE date_of_sighting=?;");
            statement.setDate(1, Date.valueOf(date));
            return statement;
        }), new LocationMapper());
    }

    @Override
    public void deleteSighting(HeroSighting sighting) {
        jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement("DELETE FROM sighting WHERE id=?;");
            statement.setInt(1, sighting.getId());
            return statement;
        });
    }

    public static final class LocationMapper implements RowMapper<Location> {
        @Override
        public Location mapRow(ResultSet rs, int index) throws SQLException {
            Location location = new Location();
            location.setName(rs.getString("name"));
            location.setDescription(rs.getString("description"));
            location.setAddress(rs.getString("address"));
            location.setLatitude(rs.getDouble("latitude"));
            location.setLongitude(rs.getDouble("longitude"));
            return location;
        }
    }
}
