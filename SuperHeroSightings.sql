DROP DATABASE IF EXISTS superherosightings;
CREATE DATABASE superherosightings;
USE superherosightings;

CREATE TABLE location (
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(250) NOT NULL,
    address varchar(100),
    latitude double,
    longitude double
);

CREATE TABLE organisation (
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(250) NOT NULL,
    location_id int,
    telephone varchar(12),
    CONSTRAINT unique_org_name UNIQUE (name),
    CONSTRAINT fk_location_organisation FOREIGN KEY (location_id) REFERENCES location(id)
);

CREATE TABLE super_power(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(250) NOT NULL
);

CREATE TABLE hero (
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(250) NOT NULL,
    superpower_id int NOT NULL,
    is_villain boolean NOT NULL,
    CONSTRAINT unique_name_superpower UNIQUE (name, superpower_id),
    CONSTRAINT fk_superpower_hero FOREIGN KEY (superpower_id) REFERENCES super_power(id)
);

CREATE TABLE hero_in_organisation(
    hero_id int,
    organisation_id int,
    CONSTRAINT fk_hero_id_hero_in_organisation FOREIGN KEY (hero_id) REFERENCES hero(id),
    CONSTRAINT fk_organisation_id_hero_in_organisation FOREIGN KEY (organisation_id) REFERENCES organisation(id),
    CONSTRAINT pk_hero_in_organisation PRIMARY KEY (hero_id, organisation_id)
);



CREATE TABLE sighting (
    id int AUTO_INCREMENT PRIMARY KEY,
    hero_id int,
    location_id int,
    date_of_sighting date NOT NULL,
    CONSTRAINT fk_hero_id_sighting FOREIGN KEY (hero_id) REFERENCES hero(id),
    CONSTRAINT fk_location_id_sighting FOREIGN KEY (location_id) REFERENCES location(id)
);