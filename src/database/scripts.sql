CREATE TABLE users (
    id serial primary key,
    name varchar(50) not null,
    password text not null,
    email varchar(50) not null,
    "imageUrl" text not null
);

CREATE TABLE posts (
	"id" SERIAL PRIMARY KEY UNIQUE NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"url" TEXT UNIQUE NOT NULL,
	"description" TEXT,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);