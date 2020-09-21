package com.sg.superherosightings.Data.JDBCTemplate;

import com.sg.superherosightings.Data.OrganisationDao;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Hero;
import com.sg.superherosightings.Entity.JDBCTemplateEntities.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class OrganisationDaoDB implements OrganisationDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public OrganisationDaoDB(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hero> getAllMembersByOrganisation(Organisation organisation) {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM organisation INNER JOIN hero_in_organisation ON  organisation_id = id INNER JOIN hero on hero_id = hero.id;");
            return statement;
        }), new HeroDaoDB.HeroMapper());
    }

    @Override
    public List<Organisation> getAllOrganisationsByHero(Hero hero) {
        return jdbcTemplate.query((conn -> {
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM organisation INNER JOIN hero_in_organisation ON  organisation_id = id INNER JOIN hero on hero_id = hero.id WHERE hero.id=? OR hero.name=?;");
            statement.setInt(1, hero.getId());
            statement.setString(2, hero.getName());
            return statement;
        }), new OrganisationMapper());
    }

    public static final class OrganisationMapper implements RowMapper<Organisation> {
        @Override
        public Organisation mapRow(ResultSet rs, int index) throws SQLException {
            Organisation organisation = new Organisation();
            return organisation;
        }
    }
}
