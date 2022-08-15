
drop TABLE hashtags_posts;
drop TABLE likes;
drop TABLE hashtags;
drop TABLE posts;
drop TABLE users;


INSERT INTO posts ("userId","url","description","imagePreview") VALUES (1,'https://www.jbox.com.br/2021/03/13/fullmetal-alchemist-reimpressao-chega-com-preco-reajustado-em-abril-pela-jbc/','ela vamos nos #enois #tamonalida','https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');

INSERT INTO hashtags_posts ("")
INSERT INTO hashtags (name) VALUES ('mPARANGOLE');
INSERT INTO hashtags_posts ("postId","hashtagId") VALUES (3,3);
INSERT INTO hashtags_posts ("postId","hashtagId") VALUES (3,1);

INSERT INTO users (name,password,email,"imageUrl") VALUES ('jojo','jojo','jojo@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');
INSERT INTO users (name,password,email,"imageUrl") VALUES ('jeje','jeje','jeje@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');
INSERT INTO users (name,password,email,"imageUrl") VALUES ('jiji','jiji','jiji@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');

SELECT posts.*, users.name, users."imageUrl" FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" JOIN users ON users.id = posts."userId" WHERE hashtags.name = 'manga' ORDER BY posts."createdAt" DESC LIMIT 20;