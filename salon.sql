USE master;

GO
DROP DATABASE IF EXISTS salon;

CREATE DATABASE salon;
GO
USE salon;

CREATE TABLE
    usluge (
        sifra INT IDENTITY (1, 1) NOT NULL PRIMARY KEY,
        naziv VARCHAR(255) NOT NULL,
        opis VARCHAR(255) NOT NULL,
        cijena INT NOT NULL
    );

insert into
    usluge (naziv, opis, cijena)
values
    ('depiliranje', 'nekim voskom', 25),
    ('nokti', 'nokti', 20),
    ('šminkanje', 'šminkom', 15),
    ('solarij', 'solarij', 50);


	ALTER DATABASE db_aa7d12_salon SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aa7d12_salon COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aa7d12_salon SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO