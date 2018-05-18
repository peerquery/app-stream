

-- Create posts table SQL


CREATE TABLE IF NOT EXISTS  `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` varchar(50) NOT NULL,
  `tx_id` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `permlink` varchar(512) NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(512) NOT NULL,
  `body` text NOT NULL,
  `json_metadata` json NOT NULL,
  `timestamp` timestamp NOT NULL,
  `last_update` datetime NOT NULL,
  `url` varchar(512) NOT NULL,
  `depth` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`url`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `url_UNIQUE` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=9663 DEFAULT CHARSET=latin1;


-- Create comments table SQL


CREATE TABLE IF NOT EXISTS  `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block` varchar(50) NOT NULL,
  `tx_id` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `permlink` varchar(512) NOT NULL,
  `parent_permlink` varchar(512) NOT NULL,
  `parent_author` varchar(50) NOT NULL,
  `body` text NOT NULL,
  `timestamp` timestamp NOT NULL,
  `json_metadata` json NOT NULL,
  `depth` int(11) NOT NULL DEFAULT '1',
  `url` varchar(512) NOT NULL,
  `source` varchar(512) NOT NULL,
  PRIMARY KEY (`id`,`url`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `url_UNIQUE` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=4339 DEFAULT CHARSET=latin1;


-- Create posts_view tables SQL


CREATE OR REPLACE VIEW `posts_view` AS SELECT * FROM `posts`;


-- Create comments_view tables SQL


CREATE OR REPLACE VIEW `comments_view` AS SELECT * FROM `comments`;

