package com.sg.superherosightings.Entity.JPAEntities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.util.Objects;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Sighting {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @NotNull(message = "Sighting must have a hero.")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hero_id", nullable = false)
    private Hero hero;

    @ManyToOne(cascade = CascadeType.ALL) //Creates a location with fields specified if id doesnt exist
    @JoinColumn(name = "location_id")
    private Location location;

    @NotNull(message = "Sighting must have a date.")
    @Past(message = "Sighting cannot be in the future.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_of_sighting")
    private LocalDate dateOfSighting;

    public Sighting(){}

    public Sighting(int id, @NotNull Hero hero, Location location, @NotNull @Past LocalDate dateOfSighting) {
        this.id = id;
        this.hero = hero;
        this.location = location;
        this.dateOfSighting = dateOfSighting;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Hero getHero() {
        return hero;
    }

    public void setHero(Hero hero) {
        this.hero = hero;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return dateOfSighting;
    }

    public void setDate(LocalDate date) {
        this.dateOfSighting = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sighting sighting = (Sighting) o;
        return id == sighting.id &&
                hero.equals(sighting.hero) &&
                location.equals(sighting.location) &&
                dateOfSighting.equals(sighting.dateOfSighting);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, hero, location, dateOfSighting);
    }

    @Override
    public String toString() {
        return "Sighting{" +
                "id=" + id +
                ", hero=" + hero +
                ", location=" + location +
                ", dateOfSighting=" + dateOfSighting +
                '}';
    }
}
