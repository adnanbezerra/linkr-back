CREATE TABLE users (
    id serial primary key,
    name varchar(50) not null,
    password text not null,
    email varchar(50) not null,
    "imageUrl" text not null
);


--esboço tabela posts
CREATE TABLE posts (
    id serial primary key,
    "userId" integer not null references "users"("id"),
    content text not null,
    link text not null
);

--esboço tabela likes
CREATE TABLE likes(
    id serial primary key,
    "likerId" integer not null references "users"("id"),
    "postId" integer not null references "posts"("id")
);

CREATE TABLE hashtags (
    id serial primary key,
    name text not null
);
CREATE TABLE hashtags_posts (
    id serial primary key,
    "postId" integer not null references "posts"("id"),
    "hashtagId" integer not null references "hashtags"("id")
);