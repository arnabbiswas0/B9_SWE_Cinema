CREATE DATABASE  IF NOT EXISTS `cinemasystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cinemasystem`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cinemasystem
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seatID` int NOT NULL AUTO_INCREMENT,
  `roomID` varchar(45) NOT NULL,
  `seatName` varchar(45) NOT NULL,
  PRIMARY KEY (`seatID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,'1','A1'),(2,'1','A2'),(3,'1','A3'),(4,'1','A4'),(5,'1','A5'),(6,'1','B1'),(7,'1','B2'),(8,'1','B3'),(9,'1','B4'),(10,'1','B5'),(11,'1','C1'),(12,'1','C2'),(13,'1','C3'),(14,'1','C4'),(15,'1','C5'),(16,'1','D1'),(17,'1','D2'),(18,'1','D3'),(19,'1','D4'),(20,'1','D5'),(21,'1','E1'),(22,'1','E2'),(23,'1','E3'),(24,'1','E4'),(25,'1','E5'),(26,'1','F1'),(27,'1','F2'),(28,'1','F3'),(29,'1','F4'),(30,'1','F5'),(31,'2','A1'),(32,'2','A2'),(33,'2','A3'),(34,'2','A4'),(35,'2','A5'),(36,'2','B1'),(37,'2','B2'),(38,'2','B3'),(39,'2','B4'),(40,'2','B5'),(41,'2','C1'),(42,'2','C2'),(43,'2','C3'),(44,'2','C4'),(45,'2','C5'),(46,'2','D1'),(47,'2','D2'),(48,'2','D3'),(49,'2','D4'),(50,'2','D5'),(51,'2','E1'),(52,'2','E2'),(53,'2','E3'),(54,'2','E4'),(55,'2','E5'),(56,'2','F1'),(57,'2','F2'),(58,'2','F3'),(59,'2','F4'),(60,'2','F5'),(61,'3','A1'),(62,'3','A2'),(63,'3','A3'),(64,'3','A4'),(65,'3','A5'),(66,'3','B1'),(67,'3','B2'),(68,'3','B3'),(69,'3','B4'),(70,'3','B5'),(71,'3','C1'),(72,'3','C2'),(73,'3','C3'),(74,'3','C4'),(75,'3','C5'),(76,'3','D1'),(77,'3','D2'),(78,'3','D3'),(79,'3','D4'),(80,'3','D5'),(81,'3','E1'),(82,'3','E2'),(83,'3','E3'),(84,'3','E4'),(85,'3','E5'),(86,'3','F1'),(87,'3','F2'),(88,'3','F3'),(89,'3','F4'),(90,'3','F5');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10 20:37:40
