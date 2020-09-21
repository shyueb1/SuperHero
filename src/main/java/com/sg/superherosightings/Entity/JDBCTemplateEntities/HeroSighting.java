package com.sg.superherosightings.Entity.JDBCTemplateEntities;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

public class HeroSighting {
    private int id;
    @NotNull(message = "Sighting must have a hero.")
    private Hero hero;
    @NotNull(message = "Sighting must have a location.")
    private Location location;
    @NotNull(message = "Sighting must have a date.")
    @Past(message = "Sighting cannot be in the future.")
    private LocalDate date;

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
