/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 100110
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 100110
 File Encoding         : utf-8

 Date: 04/24/2018 11:13:23 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article_t`
-- ----------------------------
DROP TABLE IF EXISTS `article_t`;
CREATE TABLE `article_t` (
  `id` varchar(255) NOT NULL COMMENT '文章的id',
  `title` varchar(255) NOT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `content` text,
  `type_id` int(10) DEFAULT NULL,
  `creat_time` datetime DEFAULT NULL,
  `watch_times` int(200) DEFAULT NULL,
  `like` int(200) DEFAULT NULL,
  `dislike` int(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article_t`
-- ----------------------------
BEGIN;
INSERT INTO `article_t` VALUES ('1', '小程序踩坑之vivo', 'vivo手机发送http请求', 'wwen', '<p>输入内容</p><p><img src=\"http://localhost:3000/public/images/0.8675675883988421.png\" style=\"max-width:100%;\"><br></p>', '2', '2018-04-26 16:50:33', '20', null, null), ('655f267700f7482aaa09089099daf2c2', 'express文件上传', 'vivo手机发送http请求', 'wwen', '<p>这就kncsdknvdsvfmvfvfvfdsvwefewfwefscdscsdcsdffewfewfew是个坑</p>', '2', '2018-04-01 16:50:33', '10', null, null), ('8743hfjwejfne', 'express', 'express文件上传', 'wwen', '<p>express框架</p>', '4', '2018-04-18 16:50:33', '10', null, null), ('c314d1c93e214d64b19263fc689b5a1c', 'keng看哪个', '三叉戟多少才能看见的是把 v 吃德克士 v 吧', 'wwen', '<p>啊上厕所都不常见的是啊时间才能记得上次的是啊上次那家滴水成冰啊上次看男神邓超</p>', '2', '2018-04-10 16:50:33', '0', '0', '0'), ('cbcab2ec8faa4d579faa1874fcec378e', 'express文件', 'vivo手机发送http请求', 'wwen', '<h1>没有什么能阻止</h1><p><span style=\"font-weight: bold;\">因为是在是没有任何问题</span><br></p><p><span style=\"font-style: italic;\">腾讯的坑太多</span><span style=\"font-weight: bold;\"><br></span></p>', '2', '2018-03-02 15:08:20', '10', null, null);
COMMIT;

-- ----------------------------
--  Table structure for `reply_t`
-- ----------------------------
DROP TABLE IF EXISTS `reply_t`;
CREATE TABLE `reply_t` (
  `reply_id` varchar(255) NOT NULL,
  `article_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `reply_t`
-- ----------------------------
BEGIN;
INSERT INTO `reply_t` VALUES ('1', '1', '1312', '是真的吗？', '2018-04-10 16:50:33'), ('2', '1', '1312', '是真的吗？', '2018-04-10 16:50:33');
COMMIT;

-- ----------------------------
--  Table structure for `type_t`
-- ----------------------------
DROP TABLE IF EXISTS `type_t`;
CREATE TABLE `type_t` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `remarke` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `type_t`
-- ----------------------------
BEGIN;
INSERT INTO `type_t` VALUES ('1', '前端', '前端'), ('2', '小程序', null), ('3', '公众号', null), ('4', 'NodeJS', null), ('5', 'PHP', null), ('6', 'Nginx', null), ('7', '', null), ('19', '猪', '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
