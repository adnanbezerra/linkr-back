CREATE TABLE users (
    id serial primary key,
    name varchar(50) not null,
    password text not null,
    email varchar(50) not null,
    "imageUrl" text not null
);