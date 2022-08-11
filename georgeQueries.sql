



SELECT hashtags.name FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" WHERE posts.id = 1;

SELECT hashtags.name FROM hashtags LEFT JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id  LEFT JOIN posts ON posts.id = hashtags_posts."postId" GROUP BY hashtags.name ORDER BY COUNT(posts.id) DESC;


INSERT INTO hashtags (name) VALUES ('eita');