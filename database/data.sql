-- Adminer 5.2.1 MySQL 9.2.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Collection`;
CREATE TABLE `Collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `visibility` enum('PUBLIC','RESTRICTED','PRIVATE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PUBLIC',
  PRIMARY KEY (`id`),
  KEY `Collection_authorId_fkey` (`authorId`),
  FULLTEXT KEY `Collection_title_idx` (`title`),
  CONSTRAINT `Collection_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Collection` (`id`, `title`, `description`, `authorId`, `createdAt`, `updatedAt`, `visibility`) VALUES
(2,	'Test collection',	'lorem ipsum bla bla bla',	1,	'2025-04-05 11:34:18.988',	'2025-04-15 22:12:12.429',	'PUBLIC'),
(4,	'Collection 2',	'Another collection',	2,	'2025-04-16 12:36:12.203',	'2025-04-16 12:36:12.202',	'PUBLIC');

DROP TABLE IF EXISTS `Graph`;
CREATE TABLE `Graph` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int DEFAULT NULL,
  `public` tinyint(1) NOT NULL,
  `data` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Graph_authorId_fkey` (`authorId`),
  FULLTEXT KEY `Graph_title_idx` (`title`),
  CONSTRAINT `Graph_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Graph` (`id`, `title`, `description`, `authorId`, `public`, `data`, `createdAt`, `updatedAt`) VALUES
(1,	'Test graph',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',	1,	1,	'{\"nodes\": [{\"x\": 1, \"y\": 2, \"name\": \"node0\"}, {\"x\": 3, \"y\": 2, \"name\": \"node1\"}, {\"x\": 1.748666687011719, \"y\": 10.025615234375, \"name\": \"node2\"}, {\"x\": 0.2786666870117193, \"y\": -0.2449999999999997, \"name\": \"node3\"}, {\"x\": 1.350307312011713, \"y\": 1.025, \"name\": \"node4\"}, {\"x\": -2.891333312988281, \"y\": 0.885, \"name\": \"node5\"}, {\"x\": -2.171333312988284, \"y\": -1.825000000000001, \"name\": \"node6\"}, {\"x\": -0.4013333129882817, \"y\": -1.445, \"name\": \"node7\"}, {\"x\": 2.458666687011716, \"y\": -1.235, \"name\": \"node8\"}, {\"x\": -0.8313333129882816, \"y\": 1.475000000000001, \"name\": \"node9\"}, {\"x\": -1.881333312988281, \"y\": -0.445, \"name\": \"node10\"}], \"matrix\": [[null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, 1], [null, null, null, null, null, null, null, null, 1, 1, null], [null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null], [null, 1, null, 2, 1, null, null, null, null, null, null], [null, null, null, null, 1, null, null, null, null, null, 15], [null, null, null, null, null, null, null, null, null, 1, null]]}',	'2025-04-06 13:22:58.000',	'2025-04-16 14:07:54.330'),
(2,	'Graph n°2',	'This is the second graph',	1,	1,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-07 18:06:44.000',	'2025-04-15 22:32:47.580'),
(3,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 21:30:39.120',	'2025-04-15 21:30:39.120'),
(4,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 21:30:42.695',	'2025-04-15 21:30:42.695'),
(5,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 21:30:47.090',	'2025-04-15 21:30:47.090'),
(6,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 21:31:28.110',	'2025-04-15 21:31:28.110'),
(7,	'Graph 7',	'Test',	1,	1,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 21:34:48.020',	'2025-04-15 21:43:04.161'),
(8,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-15 22:19:14.356',	'2025-04-15 22:19:14.356'),
(9,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 12:07:37.009',	'2025-04-16 12:07:37.009'),
(10,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 12:23:37.798',	'2025-04-16 12:23:37.798'),
(11,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 12:23:38.790',	'2025-04-16 12:23:38.790'),
(12,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 12:23:39.908',	'2025-04-16 12:23:39.908'),
(13,	'New graph',	'Your brand new graph !',	2,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 12:41:12.218',	'2025-04-16 12:41:12.218'),
(14,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 14:08:10.423',	'2025-04-16 14:08:10.423'),
(15,	'New graph',	'Your brand new graph !',	1,	0,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 15:46:18.831',	'2025-04-16 15:46:18.831'),
(16,	'New graph 16',	'Your brand new graph !',	1,	1,	'{\"nodes\": [], \"matrix\": []}',	'2025-04-16 16:04:27.933',	'2025-04-16 16:04:59.282');

DROP TABLE IF EXISTS `Rating`;
CREATE TABLE `Rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int DEFAULT NULL,
  `postId` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Rating_postId_fkey` (`postId`),
  KEY `Rating_authorId_fkey` (`authorId`),
  CONSTRAINT `Rating_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Rating_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Graph` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Session`;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Session` (`id`, `userId`, `expiresAt`) VALUES
('d83c0dc8b7ddcfe1500ff38586cdfbb7ac851a6a1e6bf8e1c502ab09f244eeb1',	1,	'2025-05-04 18:33:04.930');

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joinedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` enum('PUBLIC','RESTRICTED','PRIVATE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PUBLIC',
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Hello ! I''m a new user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `User` (`id`, `name`, `email`, `joinedAt`, `passwordHash`, `visibility`, `bio`) VALUES
(1,	'mizkyosia',	'mizkyosia@gmail.com',	'2025-04-04 12:07:24.278',	'$argon2id$v=19$m=19456,t=2,p=1$/cLCiTl0x0z0sPy+ZAAd1w$YKovqIN8QSDamc1XmAl5treMLCxfjJ31Cxl4vA6f4jo',	'PUBLIC',	'Account for testing purposes'),
(2,	'test',	'test@test.test',	'2025-04-16 12:25:59.470',	'$argon2id$v=19$m=19456,t=2,p=1$rrsZ1GmwThkKZ5GSD/z+qg$stMyR4N8sl9VKXGI51Sr49Lc/BnkOx+tCWvaGIt0b6M',	'PUBLIC',	'Hello ! I\'m a new user');

DROP TABLE IF EXISTS `_CollectionGraphs`;
CREATE TABLE `_CollectionGraphs` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_CollectionGraphs_AB_unique` (`A`,`B`),
  KEY `_CollectionGraphs_B_index` (`B`),
  CONSTRAINT `_CollectionGraphs_A_fkey` FOREIGN KEY (`A`) REFERENCES `Collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_CollectionGraphs_B_fkey` FOREIGN KEY (`B`) REFERENCES `Graph` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_CollectionGraphs` (`A`, `B`) VALUES
(2,	1),
(2,	16);

DROP TABLE IF EXISTS `_CollectionSubscriber`;
CREATE TABLE `_CollectionSubscriber` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_CollectionSubscriber_AB_unique` (`A`,`B`),
  KEY `_CollectionSubscriber_B_index` (`B`),
  CONSTRAINT `_CollectionSubscriber_A_fkey` FOREIGN KEY (`A`) REFERENCES `Collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_CollectionSubscriber_B_fkey` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `_Favorites`;
CREATE TABLE `_Favorites` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_Favorites_AB_unique` (`A`,`B`),
  KEY `_Favorites_B_index` (`B`),
  CONSTRAINT `_Favorites_A_fkey` FOREIGN KEY (`A`) REFERENCES `Graph` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_Favorites_B_fkey` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_Favorites` (`A`, `B`) VALUES
(1,	1),
(2,	1),
(16,	1);

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('076b2f42-92d1-4c6c-b9f4-48eacbf553f8',	'0c0e3cda752ce48768b4ee13e9046811e644c99b3fab6ef4cbdf1e02f0b3b1f2',	'2025-04-02 09:24:57.635',	'20250402092456_init',	NULL,	NULL,	'2025-04-02 09:24:56.976',	1),
('25ce402f-efeb-408d-a3f8-0101429ffa4a',	'd832192e861742541fa4c550d6fd081b68389e02dcef902cd29236eb60507cdd',	'2025-04-02 09:44:04.962',	'20250402094404_pwd',	NULL,	NULL,	'2025-04-02 09:44:04.897',	1),
('52fa3720-67a2-458f-8836-e7119f9d4aae',	'b3d57c6c2ff2e1809d7a3f5a9f5b34a2b69da9ee20b9edb6a5254ff136a581fc',	'2025-04-02 09:53:22.266',	'20250402095322_public_collections',	NULL,	NULL,	'2025-04-02 09:53:22.208',	1),
('7aa73543-1f03-44a8-be4a-46d9f1db9506',	'd1a8f2ea76a2cd00b0c552daaaae665d374a0a7f0b91f5ecbd2e09e27afeb742',	'2025-04-05 09:53:03.584',	'20250405095303_rm_duplicates',	NULL,	NULL,	'2025-04-05 09:53:03.559',	1),
('8a3cd043-7447-4964-9055-0b3758fbd7a3',	'b97be6a26ec41a8bf7672a0392aea36f23939cd11375c880b91689f3896d1f94',	'2025-04-02 09:45:05.822',	'20250402094505_txt_length',	NULL,	NULL,	'2025-04-02 09:45:05.662',	1),
('b5ec1c99-552a-4190-b5a7-10cf203a710f',	'383b074368753b2e8b433d2d4f868ad16e230746b7375d247662c40435bddc51',	'2025-04-06 17:41:18.403',	'20250406174118_renaming',	NULL,	NULL,	'2025-04-06 17:41:18.377',	1),
('c61698c7-b318-41b6-bbc4-3bafd46bda94',	'29e9ff8a7f23076eea81dd9d49ae2b6df38548cc144068e17e8ff8d025c574f8',	'2025-04-15 22:52:03.606',	'20250415225203_user_bio',	NULL,	NULL,	'2025-04-15 22:52:03.572',	1),
('f063d7ea-001c-45bc-9e87-933506924c89',	'eb4ed94ca5f69aed545a148db7d9c5726d3e9bb840e7bfd9925bb491cef6eab7',	'2025-04-02 19:30:43.075',	'20250402193042_timestamps',	NULL,	NULL,	'2025-04-02 19:30:42.654',	1),
('f23739f5-c63b-4731-be11-6396a2e76534',	'f8122f749fe2cc63fadde75268a84ea0e4c7bf16b630fcb1bbf246bd2bf0a6eb',	'2025-04-08 14:07:31.955',	'20250408140731_fulltext',	NULL,	NULL,	'2025-04-08 14:07:31.581',	1);

-- 2025-04-16 16:10:14 UTC
