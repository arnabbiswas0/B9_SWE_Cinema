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
-- Table structure for table `paymentcard`
--

DROP TABLE IF EXISTS `paymentcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentcard` (
  `paymentCardId` int NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(155) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `nameOnCard` varchar(75) DEFAULT NULL,
  `expDate` varchar(80) DEFAULT NULL,
  `userId` int NOT NULL,
  `cvv` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`paymentCardId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentcard`
--

LOCK TABLES `paymentcard` WRITE;
/*!40000 ALTER TABLE `paymentcard` DISABLE KEYS */;
INSERT INTO `paymentcard` VALUES (1,NULL,NULL,NULL,NULL,11,NULL),(2,NULL,NULL,NULL,NULL,12,NULL),(3,NULL,NULL,NULL,NULL,13,NULL),(4,NULL,NULL,NULL,NULL,14,NULL),(5,NULL,NULL,NULL,NULL,15,NULL),(6,NULL,NULL,NULL,NULL,16,NULL),(7,NULL,NULL,NULL,NULL,17,NULL),(8,NULL,NULL,NULL,NULL,18,NULL),(9,NULL,NULL,NULL,NULL,19,NULL),(10,NULL,NULL,NULL,NULL,20,NULL),(11,'undefined',NULL,NULL,'',21,''),(12,NULL,NULL,NULL,NULL,22,NULL),(13,NULL,NULL,NULL,NULL,23,NULL);
/*!40000 ALTER TABLE `paymentcard` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-09 19:42:45
