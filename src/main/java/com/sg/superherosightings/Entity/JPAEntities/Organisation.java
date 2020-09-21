package com.sg.superherosightings.Entity.JPAEntities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Objects;
import java.util.Set;

@Entity
public class Organisation {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @NotBlank(message = "Organisation must have a name.")
    @Size(max = 30, message = "Name cannot exceed 30 characters.")
    @Column
    private String name;

    @NotBlank(message = "Organisation must have a description.")
    @Size(max = 250, message = "Description cannot exceed 250 characters.")
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    @Size(max = 100, message = "Address cannot exceed 100 characters.")
    private Location location;

    @Size(max = 12, message = "Telephone number cannot exceed 12 characters.")
    @Column
    private String telephone;

    @ManyToMany
    @JoinTable(
            name = "hero_in_organisation",
            joinColumns = @JoinColumn(name = "hero_id"),
            inverseJoinColumns = @JoinColumn(name = "organisation_id"))
    private Set<Hero> members;

    public Organisation(){}

    public Organisation(int id, String name, String description, Location location, String telephone, Set<Hero> members) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.telephone = telephone;
        this.members = members;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Set<Hero> getMembers() {
        return members;
    }

    public void setMembers(Set<Hero> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organisation that = (Organisation) o;
        return id == that.id &&
                name.equals(that.name) &&
                description.equals(that.description) &&
                location.equals(that.location) &&
                telephone.equals(that.telephone) &&
                Objects.equals(members, that.members);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, location, telephone, members);
    }

    @Override
    public String toString() {
        return "Organisation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", telephone='" + telephone + '\'' +
                ", members=" + members +
                '}';
    }
}
