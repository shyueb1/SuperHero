package com.sg.superherosightings.Entity.JPAEntities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Objects;
import java.util.Set;

@Entity
public class Hero {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @NotBlank(message = "Hero must have a name.")
    @Size(max = 30, message = "Name cannot exceed 30 characters.")
    @Column
    private String name;

    @NotBlank(message = "Hero must have a description.")
    @Size(max = 250, message = "Description cannot exceed 250 characters.")
    @Column
    private String description;

    @Column
    private boolean isVillain;

    @ManyToOne
    @JoinColumn(name = "superpower_id")
    private SuperPower superpower;

    @ManyToMany(mappedBy = "members")
    private Set<Organisation> inOrganisation;

    public Hero(){}

    public Hero(int id, String name, String description, SuperPower superpower, boolean isVillain, Set<Organisation> inOrganisation) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.superpower = superpower;
        this.isVillain = isVillain;
        this.inOrganisation = inOrganisation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SuperPower getSuperpower() {
        return superpower;
    }

    public void setSuperpower(SuperPower superpower) {
        this.superpower = superpower;
    }

    public boolean isVillain() {
        return isVillain;
    }

    public void setVillain(boolean villain) {
        isVillain = villain;
    }

    public Set<Organisation> getInOrganisation() {
        return inOrganisation;
    }

    public void setInOrganisation(Set<Organisation> inOrganisation) {
        this.inOrganisation = inOrganisation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hero hero = (Hero) o;
        return id == hero.id &&
                isVillain == hero.isVillain &&
                name.equals(hero.name) &&
                description.equals(hero.description) &&
                superpower.equals(hero.superpower) &&
                Objects.equals(inOrganisation, hero.inOrganisation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, superpower, isVillain, inOrganisation);
    }

    @Override
    public String toString() {
        return "Hero{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", superpower='" + superpower + '\'' +
                ", isVillain=" + isVillain +
                '}';
    }
}
