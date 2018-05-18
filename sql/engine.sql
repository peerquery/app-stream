

-- New post sp


DROP procedure IF EXISTS `new_post`;

CREATE PROCEDURE `new_post`(
	IN tx_id VARCHAR(50),
	IN block VARCHAR(50),
	IN author VARCHAR(50),
    IN permlink VARCHAR(512),
    IN category VARCHAR(50),
    IN title VARCHAR(512),
    IN body TEXT,
    IN url VARCHAR(512),
    IN timestamp TIMESTAMP,
    IN json_metadata JSON
)
BEGIN
	INSERT INTO `posts` (`tx_id`, `block`, `author`, `permlink`, `category`, `title`, `body`, `url`, `timestamp`, `json_metadata`)
		VALUES (tx_id, block, author, permlink, category, title, body, url, timestamp, json_metadata)
	ON DUPLICATE KEY UPDATE 
		`tx_id`= VALUES(`tx_id`),
        `block`= VALUES(`block`),
        `author`= VALUES(`author`),
        `permlink`= VALUES(`permlink`),
        `category`= VALUES(`category`),
        `title`= VALUES(`title`),
        `body`= VALUES(`body`),
        `url`= VALUES(`url`),
        `timestamp`= VALUES(`timestamp`),
        `json_metadata`= VALUES(`json_metadata`);
END;


-- new comment sp


DROP procedure IF EXISTS `new_comment`;

CREATE PROCEDURE `new_comment`(
	IN tx_id VARCHAR(50),
	IN block VARCHAR(50),
	IN author VARCHAR(50),
    IN permlink VARCHAR(512),
	IN parent_author VARCHAR(50),
    IN parent_permlink VARCHAR(512),
    IN source_url VARCHAR(512),
    IN body TEXT,
    IN url VARCHAR(512),
    IN timestamp TIMESTAMP,
    IN json_metadata JSON,
    OUT status VARCHAR(512)
)
BEGIN
	IF EXISTS (SELECT 1 FROM `posts` WHERE `posts`.`url` = source_url) THEN
			INSERT INTO `comments` (`tx_id`, `block`, `author`, `permlink`, `parent_author`, `parent_permlink`, `body`, `url`, `timestamp`, `source`, `json_metadata`)
				VALUES (tx_id, block, author, permlink, parent_author, parent_permlink, body, url, timestamp, source_url, json_metadata)
			ON DUPLICATE KEY UPDATE 
				`tx_id`= VALUES(`tx_id`),
				`block`= VALUES(`block`),
				`author`= VALUES(`author`),
				`permlink`= VALUES(`permlink`),
				`parent_author`= VALUES(`parent_author`),
				`parent_permlink`= VALUES(`parent_permlink`),
				`body`= VALUES(`body`),
				`url`= VALUES(`url`),
				`timestamp`= VALUES(`timestamp`),
				`source`= VALUES(`source`),
				`json_metadata`= VALUES(`json_metadata`);
                
			SET status = 'true';
    ELSE 
			SET status = 'false';
    END IF;
		SELECT @status AS status;
END;


-- New reply sp


DROP procedure IF EXISTS `new_reply`;

CREATE PROCEDURE `new_reply`(
	IN tx_id VARCHAR(50),
	IN block VARCHAR(50),
	IN author VARCHAR(50),
    IN permlink VARCHAR(512),
	IN parent_author VARCHAR(50),
    IN parent_permlink VARCHAR(512),
    IN source_url VARCHAR(512),
    IN body TEXT,
    IN url VARCHAR(512),
    IN timestamp TIMESTAMP,
    IN json_metadata JSON,
    OUT status VARCHAR(512)
)
BEGIN

	DECLARE dp INT;
    
	IF EXISTS (SELECT 1 FROM `posts` WHERE `posts`.`url` = source_url) THEN
		
        INSERT INTO `comments` (`tx_id`, `block`, `author`, `permlink`, `parent_author`, `parent_permlink`, `body`, `url`, `timestamp`, `source`, `json_metadata`)
				VALUES (tx_id, block, author, permlink, parent_author, parent_permlink, body, url, timestamp, source_url, json_metadata)
			ON DUPLICATE KEY UPDATE 
				`tx_id`= VALUES(`tx_id`),
				`block`= VALUES(`block`),
				`author`= VALUES(`author`),
				`permlink`= VALUES(`permlink`),
				`parent_author`= VALUES(`parent_author`),
				`parent_permlink`= VALUES(`parent_permlink`),
				`body`= VALUES(`body`),
				`url`= VALUES(`url`),
				`timestamp`= VALUES(`timestamp`),
				`source`= VALUES(`source`),
				`json_metadata`= VALUES(`json_metadata`);
                
			SET status = 'comment';
    
    ELSEIF EXISTS (SELECT 1 FROM `comments` WHERE `comments`.`url` = source_url) THEN
    
        SELECT depth INTO dp FROM `comments` WHERE `comments`.`url` = source_url;
		
		INSERT INTO `comments` (`tx_id`, `block`, `author`, `permlink`, `parent_author`, `parent_permlink`, `body`, `url`, `timestamp`, `source`, `json_metadata`, `depth`)
				VALUES (tx_id, block, author, permlink, parent_author, parent_permlink, body, url, timestamp, source_url, json_metadata, dp + 1)
			ON DUPLICATE KEY UPDATE 
				`tx_id`= VALUES(`tx_id`),
				`block`= VALUES(`block`),
				`author`= VALUES(`author`),
				`permlink`= VALUES(`permlink`),
				`parent_author`= VALUES(`parent_author`),
				`parent_permlink`= VALUES(`parent_permlink`),
				`body`= VALUES(`body`),
				`url`= VALUES(`url`),
				`timestamp`= VALUES(`timestamp`),
				`source`= VALUES(`source`),
				`json_metadata`= VALUES(`json_metadata`);
                
			SET status = 'reply';
    
    ELSE
    
		SET status = 'none';
	
    END IF;
    
		SELECT @status AS status;
END;
