-- --------------------------------------------------------
-- Hôte:                         2lsoft.fr
-- Version du serveur:           10.3.32-MariaDB - Source distribution
-- SE du serveur:                Linux
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour portal_manager
CREATE DATABASE IF NOT EXISTS `portal_manager` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `portal_manager`;

-- Listage de la structure de table portal_manager. bookmark
CREATE TABLE IF NOT EXISTS `bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) COLLATE utf8_bin NOT NULL,
  `link` text COLLATE utf8_bin NOT NULL,
  `click_counter` int(6) DEFAULT NULL,
  `picture_title` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table portal_manager.bookmark : ~0 rows (environ)

-- Listage de la structure de table portal_manager. bookmark_category_link
CREATE TABLE IF NOT EXISTS `bookmark_category_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookmark_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_uuid` varchar(255) COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_uuid` (`user_uuid`),
  KEY `bookmark_id` (`bookmark_id`),
  KEY `category_id` (`category_id`) USING BTREE,
  CONSTRAINT `FK_bookmark_category_link_bookmark` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_bookmark_category_link_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_bookmark_category_link_user` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table portal_manager.bookmark_category_link : ~0 rows (environ)

-- Listage de la structure de table portal_manager. category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) COLLATE utf8_bin NOT NULL,
  `user_uuid` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_uuid` (`user_uuid`),
  CONSTRAINT `FK_category_user` FOREIGN KEY (`user_uuid`) REFERENCES `user` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table portal_manager.category : ~0 rows (environ)

-- Listage de la structure de table portal_manager. role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table portal_manager.role : ~3 rows (environ)
INSERT INTO `role` (`id`, `title`) VALUES
	(1, 'user'),
	(2, 'moderator'),
	(3, 'admin');

-- Listage de la structure de table portal_manager. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `password_date` datetime DEFAULT NULL,
  `reset_password` tinyint(1) DEFAULT NULL,
  `alias` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `role_id` int(1) NOT NULL,
  `validation_account` tinyint(1) NOT NULL,
  `register_date` datetime NOT NULL,
  `avatar` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `FK_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table portal_manager.user : ~1 row (environ)
INSERT INTO `user` (`id`, `uuid`, `email`, `password`, `password_date`, `reset_password`, `alias`, `role_id`, `validation_account`, `register_date`, `avatar`) VALUES
	(1, '485d116d-9c2c-49f1-80e3-e227e33f67b7', 'administrateur@admin.fr', '$2b$10$/NZN3t2m7ZJu1ccnALI9y.rER5YkFUwb.2r5JcM1Ut0Wv6zUNYWm6', '2022-11-22 22:32:34', 0, NULL, 3, 1, '2022-11-22 22:32:42', '00.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
