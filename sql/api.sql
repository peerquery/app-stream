

-- Fetch url SP


DROP procedure IF EXISTS `fetch_url`;

CREATE PROCEDURE `fetch_url`(
	IN url VARCHAR(512)
)
BEGIN
    
	IF EXISTS (SELECT 1 FROM `posts_view` WHERE `posts_view`.`url` = url) THEN
		
		SELECT * FROM `posts_view` WHERE `posts_view`.`url` = url;
    
    ELSEIF EXISTS (SELECT 1 FROM `comments_view` WHERE `comments_view`.`url` = url) THEN
    
		SELECT * FROM `comments_view` WHERE `comments_view`.`url` = url;
		
    END IF;
    
END;


-- Fetch type SP


DROP procedure IF EXISTS `url_type`;

CREATE PROCEDURE `url_type`(
	IN url VARCHAR(512),
    OUT type VARCHAR(512)
)
BEGIN
    
	IF EXISTS (SELECT 1 FROM `posts_view` WHERE `posts_view`.`url` = url) THEN
		
		SET type = 'post';
    
    ELSEIF EXISTS (SELECT 1 FROM `comments_view` WHERE `comments_view`.`url` = url) THEN
		
		SET type = 'comment';
    
    ELSE
    
		SET type = 'none';
	
    END IF;
    
		SELECT @type AS type;
END;


-- Fetch post SP


DROP procedure IF EXISTS `fetch_post`;

CREATE PROCEDURE `fetch_post`(
	IN url VARCHAR(512)
)
BEGIN
	SELECT * FROM `posts_view` WHERE `posts_view`.`url` = url;
END;


-- Fetch comment SP


DROP procedure IF EXISTS `fetch_comment`;

CREATE PROCEDURE `fetch_comment`(
	IN url VARCHAR(512)
)
BEGIN
	SELECT * FROM `comments_view` WHERE `comments_view`.`url` = url;
END;


-- Curate SP 


DROP procedure IF EXISTS `curate`;

CREATE PROCEDURE `curate`(
	IN num INT(11)
)
BEGIN
	SELECT `url` FROM `posts_view` ORDER BY `posts_view`.`timestamp` DESC LIMIT num;
END;


-- Curate comment SP


DROP procedure IF EXISTS `curate_comments`;

CREATE PROCEDURE `curate_comments`(
	IN num INT(11)
)
BEGIN
	SELECT `url` FROM `comments_view`
		WHERE `comments_view`.`depth` = 1
		ORDER BY `comments_view`.`timestamp` DESC
        LIMIT num;
END;


-- Curate replies SP


DROP procedure IF EXISTS `curate_replies`;

CREATE PROCEDURE `curate_replies`(
	IN num INT(11)
)
BEGIN
	SELECT `url` FROM `comments_view`
		WHERE `comments_view`.`depth` > 1
		ORDER BY `comments_view`.`timestamp` DESC
        LIMIT num;
END;


-- Count posts SP


DROP procedure IF EXISTS `count_posts`;

CREATE PROCEDURE `count_posts`(
	IN days INT(11)
)
BEGIN

	SELECT COUNT(`id`) AS post_count
    FROM `posts_view`
    WHERE `posts_view`.`timestamp` BETWEEN CURDATE() - INTERVAL days DAY AND CURDATE();

END;


-- Count comments SP


DROP procedure IF EXISTS `count_comments`;

CREATE PROCEDURE `count_comments`(
	IN days INT(11)
)
BEGIN

	SELECT COUNT(`id`) AS comment_count
    FROM `comments_view`
		WHERE
			`comments_view`.`timestamp` BETWEEN CURDATE() - INTERVAL days DAY AND CURDATE()
            AND
            `comments_view`.`depth` = 1
    ;

END;


-- Count replies


DROP procedure IF EXISTS `count_replies`;

CREATE PROCEDURE `count_replies`(
	IN days INT(11)
)
BEGIN

	SELECT COUNT(`id`) AS reply_count
    FROM `comments_view`
		WHERE
			`comments_view`.`timestamp` BETWEEN CURDATE() - INTERVAL days DAY AND CURDATE()
            AND
            `comments_view`.`depth` > 1
    ;

END;


