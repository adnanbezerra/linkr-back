


SELECT hashtags.name FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" WHERE posts.id = 1;