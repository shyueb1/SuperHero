package com.sg.superherosightings.Entity.JPAEntities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Entity
public class HeroSighting {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @NotNull(message = "Sighting must have a hero.")
    @ManyToOne
    @JoinColumn(name = "hero_id", nullable = false)
    private Hero hero;

    @NotNull(message = "Sighting must have a location.")
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @NotNull(message = "Sighting must have a date.")
    @Past(message = "Sighting cannot be in the future.")
    @Column
    private LocalDate date;

    public HeroSighting(){}

    public HeroSighting(int id, @NotNull Hero hero, @NotNull Location location, @NotNull @Past LocalDate date) {
        this.id = id;
        this.hero = hero;
        this.location = location;
        this.date = date;
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
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
