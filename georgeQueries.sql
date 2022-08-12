
drop TABLE hashtags_posts;
drop TABLE likes;
drop TABLE hashtags;
drop TABLE posts;
drop TABLE users;


INSERT INTO posts ("userId","url","description","imagePreview") VALUES (2,'https://www.jbox.com.br/2021/03/13/fullmetal-alchemist-reimpressao-chega-com-preco-reajustado-em-abril-pela-jbc/','reimpressão do mangá eba','https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');

INSERT INTO users (name,password,email,"imageUrl") VALUES ('jojo','jojo','jojo@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');
INSERT INTO users (name,password,email,"imageUrl") VALUES ('jeje','jeje','jeje@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');
INSERT INTO users (name,password,email,"imageUrl") VALUES ('jiji','jiji','jiji@email.com', 'https://i.pinimg.com/originals/a4/90/47/a49047d73e5644961b123aa48790d5c8.jpg');