-- phpMyAdmin SQL Dump
-- version 4.0.0-rc4
-- http://www.phpmyadmin.net
--
-- ホスト: localhost
-- 生成日時: 2013 年 5 月 04 日 22:00
-- サーバのバージョン: 5.5.20
-- PHP のバージョン: 5.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- データベース: `HELPERDB`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `help_log`
--

CREATE TABLE IF NOT EXISTS `help_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile_id` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `is_solved` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_profile_id` (`user_profile_id`,`priority`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=80 ;

--
-- テーブルのデータのダンプ `help_log`
--

INSERT INTO `help_log` (`id`, `user_profile_id`, `priority`, `is_solved`, `created_at`) VALUES
(1, 1, 3, 1, '2013-05-03 09:00:14'),
(2, 1, 3, 1, '2013-05-03 09:00:27'),
(3, 1, 2, 1, '2013-05-04 02:27:11'),
(4, 1, 2, 1, '2013-05-04 04:42:38'),
(5, 1, 2, 1, '2013-05-04 04:42:50'),
(6, 1, 2, 1, '2013-05-04 04:42:59'),
(7, 1, 2, 1, '2013-05-04 04:49:34'),
(8, 1, 3, 1, '2013-05-04 05:40:52'),
(9, 1, 1, 1, '2013-05-04 05:50:56'),
(10, 1, 3, 1, '2013-05-04 06:11:54'),
(11, 1, 1, 1, '2013-05-04 06:21:25'),
(12, 1, 2, 1, '2013-05-04 06:25:31'),
(13, 1, 3, 1, '2013-05-04 06:45:12'),
(14, 1, 3, 1, '2013-05-04 06:48:47'),
(15, 1, 3, 1, '2013-05-04 06:48:52'),
(16, 1, 3, 1, '2013-05-04 06:48:55'),
(17, 1, 3, 1, '2013-05-04 06:48:57'),
(18, 1, 1, 1, '2013-05-04 06:49:01'),
(19, 1, 3, 1, '2013-05-04 06:49:12'),
(20, 1, 3, 1, '2013-05-04 06:53:19'),
(21, 1, 3, 1, '2013-05-04 06:53:59'),
(22, 1, 3, 1, '2013-05-04 06:55:11'),
(23, 1, 3, 1, '2013-05-04 06:55:56'),
(24, 1, 1, 1, '2013-05-04 06:56:02'),
(25, 1, 3, 1, '2013-05-04 06:56:44'),
(26, 1, 2, 1, '2013-05-04 06:58:13'),
(27, 1, 1, 1, '2013-05-04 06:58:25'),
(28, 1, 1, 1, '2013-05-04 06:58:34'),
(29, 1, 3, 1, '2013-05-04 07:00:51'),
(30, 1, 2, 1, '2013-05-04 07:01:00'),
(31, 1, 1, 1, '2013-05-04 07:03:12'),
(32, 1, 1, 1, '2013-05-04 07:03:40'),
(33, 1, 1, 1, '2013-05-04 07:03:42'),
(34, 1, 2, 1, '2013-05-04 07:04:03'),
(35, 1, 2, 1, '2013-05-04 07:04:18'),
(36, 1, 1, 1, '2013-05-04 07:05:19'),
(37, 1, 1, 1, '2013-05-04 07:05:28'),
(38, 1, 1, 1, '2013-05-04 07:10:43'),
(39, 1, 1, 1, '2013-05-04 07:10:55'),
(40, 1, 1, 1, '2013-05-04 07:11:03'),
(41, 1, 1, 1, '2013-05-04 07:11:04'),
(42, 1, 3, 1, '2013-05-04 07:14:03'),
(43, 1, 3, 1, '2013-05-04 07:14:26'),
(44, 1, 3, 1, '2013-05-04 07:17:13'),
(45, 1, 3, 1, '2013-05-04 07:20:28'),
(46, 1, 3, 1, '2013-05-04 07:20:48'),
(47, 1, 2, 1, '2013-05-04 07:20:52'),
(48, 1, 1, 1, '2013-05-04 07:20:58'),
(49, 1, 2, 1, '2013-05-04 07:21:18'),
(50, 1, 3, 1, '2013-05-04 07:21:37'),
(51, 1, 1, 1, '2013-05-04 07:21:43'),
(52, 1, 1, 1, '2013-05-04 07:22:02'),
(53, 1, 1, 1, '2013-05-04 07:22:39'),
(54, 1, 2, 1, '2013-05-04 07:26:05'),
(55, 1, 2, 1, '2013-05-04 08:00:31'),
(56, 1, 2, 1, '2013-05-04 08:02:19'),
(57, 1, 1, 1, '2013-05-04 08:04:01'),
(58, 1, 1, 1, '2013-05-04 08:04:10'),
(59, 1, 3, 1, '2013-05-04 08:05:17'),
(60, 1, 2, 1, '2013-05-04 08:05:33'),
(61, 1, 1, 1, '2013-05-04 08:06:05'),
(62, 1, 2, 1, '2013-05-04 08:14:55'),
(63, 1, 3, 1, '2013-05-04 08:15:04'),
(64, 1, 1, 1, '2013-05-04 08:15:22'),
(65, 1, 2, 1, '2013-05-04 08:16:52'),
(66, 1, 3, 1, '2013-05-04 08:17:00'),
(67, 1, 2, 1, '2013-05-04 08:17:21'),
(68, 1, 2, 1, '2013-05-04 08:18:55'),
(69, 1, 2, 1, '2013-05-04 08:20:20'),
(70, 1, 2, 1, '2013-05-04 08:20:23'),
(71, 1, 2, 1, '2013-05-04 08:37:17'),
(72, 1, 2, 1, '2013-05-04 08:37:32'),
(73, 1, 3, 1, '2013-05-04 08:37:42'),
(74, 1, 4, 1, '2013-05-04 08:38:40'),
(75, 1, 2, 1, '2013-05-04 08:45:04'),
(76, 2, 3, 1, '2013-05-04 08:46:33'),
(77, 1, 1, 1, '2013-05-04 10:59:19'),
(78, 1, 1, 1, '2013-05-04 11:00:54'),
(79, 1, 7, 1, '2013-05-04 12:59:36');

-- --------------------------------------------------------

--
-- テーブルの構造 `priority_mst`
--

CREATE TABLE IF NOT EXISTS `priority_mst` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- テーブルのデータのダンプ `priority_mst`
--

INSERT INTO `priority_mst` (`id`, `body`, `created_at`) VALUES
(1, '少し疑問点がある', '2013-05-04 08:24:52'),
(2, '実は聞きたいことがある', '2013-05-04 08:26:08'),
(3, '研修について行けてない', '2013-05-04 08:26:18'),
(4, '寒いからどうにかしてほしいよーー', '2013-05-04 08:38:30'),
(7, '激おこぷんぷん丸', '2013-05-04 12:59:28');

-- --------------------------------------------------------

--
-- テーブルの構造 `question_log`
--

CREATE TABLE IF NOT EXISTS `question_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_profile_id` int(11) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT '0',
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `is_soleved` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_profile_id` (`user_profile_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- テーブルのデータのダンプ `question_log`
--

INSERT INTO `question_log` (`id`, `user_profile_id`, `priority`, `body`, `is_soleved`, `created_at`) VALUES
(1, 1, 0, 'åŠ©ã‘ã¦ãƒ¼', 0, '2013-05-03 05:49:49'),
(2, 1, 0, 'åŠ©ã‘ã¦ãƒ¼', 0, '2013-05-03 05:51:17'),
(3, 1, 0, 'åŠ©ã‘ã¦ãƒ¼', 0, '2013-05-03 05:52:54'),
(4, 1, 0, 'åŠ©ã‘ã¦', 0, '2013-05-03 05:59:44'),
(5, 1, 0, '助けてー', 0, '2013-05-03 06:09:07'),
(6, 1, 0, 'Please Help Me', 0, '2013-05-03 06:09:23'),
(7, 1, 0, '&lt;a href=&quot;hoge.html&quot;&gt;ここがわかりません&lt;/a&gt;', 0, '2013-05-03 06:09:49'),
(8, 1, 0, '&lt;a href=&quot;hoge.html&quot;&gt;ここがわかりません&lt;/a&gt;', 0, '2013-05-03 06:31:20'),
(9, 1, 0, '&lt;a href=&quot;hoge.html&quot;&gt;ここがわかりません&lt;/a&gt;', 0, '2013-05-03 09:30:45'),
(10, 1, 0, 'お助けください', 0, '2013-05-03 09:31:11');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_profile`
--

CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- テーブルのデータのダンプ `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_name`, `created_at`) VALUES
(1, 'takashi_honda', '2013-05-03 03:00:30'),
(2, 'takumi_kashima', '2013-05-04 08:39:44');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
