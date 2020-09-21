package com.sg.superherosightings.Entity.JPAEntities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Objects;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
public class Location {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @NotBlank(message = "Location must have a name.")
    @Size(max = 30, message = "Location name cannot exceed 30 characters.")
    @Column
    private String name;

    @NotBlank(message = "Location must have a description.")
    @Size(max = 250, message = "Description cannot exceed 250 characters.")
    @Column
    private String description;

    @Size(max = 100, message = "Address cannot exceed 100 characters.")
    @Column
    private String address;

    @Digits(integer = 2, fraction = 4, message = "Latitude must have precision of 6 with 4 decimal places")
    @Min(value = -90, message = "Latitude must be no less than -90 degrees")
    @Max(value = 90, message = "Latitude must be no more than 90 degrees")
    @Column
    private double latitude;

    @Digits(integer = 3, fraction = 4, message = "Longitude must have precision of 7 with 4 decimal places")
    @Min(value = -180, message = "Longitude must be no less than -180 degrees")
    @Max(value = 180, message = "Longitude must be no more than 180 degrees")
    @Column
    private double longitude;

    public Location(){}

    public Location(int id, String name, String description, String address, double latitude, double longitude) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return id == location.id &&
                Double.compare(location.latitude, latitude) == 0 &&
                Double.compare(location.longitude, longitude) == 0 &&
                name.equals(location.name) &&
                description.equals(location.description) &&
                address.equals(location.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, address, latitude, longitude);
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
