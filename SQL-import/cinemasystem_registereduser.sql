CREATE DATABASE  IF NOT EXISTS `cinemasystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cinemasystem`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cinemasystem
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `registereduser`
--

DROP TABLE IF EXISTS `registereduser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registereduser` (
  `registeredUserID` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `isSubscribed` varchar(5) DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `streetName` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`registeredUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registereduser`
--

LOCK TABLES `registereduser` WRITE;
/*!40000 ALTER TABLE `registereduser` DISABLE KEYS */;
INSERT INTO `registereduser` VALUES (1,'9999999999','test@email.com','test','false',1,'Tester Guy',NULL,NULL,NULL,NULL),(2,'999-999-9999','psemail','$2b$10$yVTJ.QtcBhFCmeisL4qBCuuOXqi0D5WmetcREx.zwbvdNQxPWdbDC','false',1,'ps',NULL,NULL,NULL,NULL),(3,'999-999-9999','testeremail','$2b$10$eHGVtOOwfJsmBi6UGWzh0.O1Ehm5tV0d7hqqkWb3l4STVxuGtjD0O','false',1,'tester',NULL,NULL,NULL,NULL),(4,'999-999-9999','pp','$2b$10$QGktE3EQRerI1mFkW19YheOq9288p91QcIAMXzAoLx7CWdH3tplHC','false',1,'pp',NULL,NULL,NULL,NULL),(5,'999-999-9999','op','$2b$10$zPr8I/5o8CoOtf87MhOv7u4Q.yTAOV4Opm4wFGDsioAa0HsGiRU8G','false',1,'op',NULL,NULL,NULL,NULL),(6,'999-999-9999','q','$2b$10$7MAIh28AG4ZqsUHvXe4c4uLty6nwSHvCjWMB2P5U3WYvkytJfdOZu','false',1,'q',NULL,NULL,NULL,NULL),(7,'999-999-9999','m','$2b$10$C1vC7vXwJr19DTE8XlNGZuxqk9X6Ft.FzReeqlZtJnsJw8bZHc2/G','false',1,'ChangedName',NULL,NULL,NULL,NULL),(8,'999-999-9999','l','$2b$10$WIdtQxtgVQplTAXrQNsEU.v8BzQvbKjqNFaaAJ5RTZgw2Y6nN4V56','false',1,'l',NULL,NULL,NULL,NULL),(9,'999-999-9999','a','$2b$10$WHF5EkS.yUnB/rQPYa84E.oXcykewN1lI2mUfmNy7gydKiTdrj.ZG','false',1,'a',NULL,NULL,NULL,NULL),(10,'999-999-9999','gh','$2b$10$P.DdT.EHw1MxC7zWIc3DKuubrA3mVa9bOZ.2btWJ7UHj0WbEVeiIS','false',1,'gh',NULL,NULL,NULL,NULL),(11,'999-999-9999','za','$2b$10$tfNmz1uL2rjI7uD3qe./1OaNIk1a9EnzcLBoM9cFvmLoKamkk742.','false',1,'zaza',NULL,NULL,NULL,NULL),(12,'999-999-9999','s','$2b$10$leEz6kMey/5qYTjHLGYa9eh5pXua3GMuFlKX165C94BZ6jT2bjMqS','false',1,'ChangedName',NULL,NULL,NULL,NULL),(13,'999-999-9999','er','$2b$10$XiR3Cmnr9lUtCLFcf1RuH.sMjvYgXus128mXO3TRrKhAPIFcVnjhO','false',1,'ChangedName',NULL,NULL,NULL,NULL),(14,'999-999-9999','ldsd','$2b$10$RyiVPnkm4C88s86C1VajZO9X/bW9ve/b5m7GAoBZMBgKDtvgvaEO.','false',1,'Chris',NULL,NULL,NULL,NULL),(15,'999-999-9999','ksaa','$2b$10$n7q8eSpy75R.76AxVVFXcek3XiSDo7K2tQjlmvwRsWzzCMEjh8vti','false',1,'Chris',NULL,NULL,NULL,NULL),(16,'999-999-9999','utyytf','$2b$10$LbdXshm8j.gaHDjBzILOb.WTeq0GF09Y/6WlndV9ZXaNuLVh2V9Sa','false',1,'Chris',NULL,NULL,NULL,NULL),(23,'111-111-1111','cremley29@gmail.com','$2b$10$9xw2R9ZEj5hvUaeH9lv.s.EE/DPgmr6jlakacFSnsz/QK1Dy6JZYS','false',1,'CJ Remley','123 street','Athens','GA','30605');
/*!40000 ALTER TABLE `registereduser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03 15:41:37
