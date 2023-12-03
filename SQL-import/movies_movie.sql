CREATE DATABASE  IF NOT EXISTS `movies` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movies`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: movies
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
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `idmovie` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `trailer` varchar(500) DEFAULT NULL,
  `poster` varchar(500) DEFAULT NULL,
  `isOut` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idmovie`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'SAW X','7.5/10','https://www.youtube.com/embed/t3PzUo4P21c','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/232577/Saw-X_2023.jpg','true'),(2,'EXPEND4BLES','5.2/10','https://www.youtube.com/embed/DhlaBO-SwVE','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/232154/expend4bles-EXP4_ONLINE_POSTER_DIGITAL_HERO_7A_RGB_R1_rgb.jpg','true'),(3,'BLUE BEETLE','6.2/10','https://www.youtube.com/embed/vS3_72Gb-bI','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231534/BLBTL_VERT_MONTAGE_2764x4096_DOM_EM.jpg','true'),(4,'SPIDER-MAN: ACROSS THE SPIDER-VERSE','8.7/10','https://www.youtube.com/embed/cqGjhVJWtEg','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/226752/SM-Across-SV_final_2023.jpg','true'),(5,'OPPENHEIMER','8.6/10','https://www.youtube.com/embed/uYPbbksJxIg','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/230575/OPR_Tsr1Sheet3_Look2_RGB_3SM.jpg','true'),(9,'STRAYS','6.3/10','https://www.youtube.com/embed/26Xq6_g2r6Q','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231033/STR_Look2_Adv1Sheet8_1080x1920pxH_RGB_1.jpg','true'),(10,'GRAN TURISMO','7.3/10','https://www.youtube.com/embed/GVPzGBvPrzw','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231714/GT_OnLine_6072x9000_TSR_Swirl_03.jpg','true'),(11,'MISSION: IMPOSSIBLE-DEAD RECKONING','7.9/10','https://www.youtube.com/embed/2m1drlOZSDw','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/223028/midrp1dom2037x3000payoffdigital1sht01fin18.jpg','false'),(12,'ELEMENTAL','7.0/10','https://www.youtube.com/embed/2m1drlOZSDw','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/230347/STANDARD_ELM_Payoff_Train_1s_v90_Mech7.jpg','false'),(13,'THE EQUALIZER 3','7.1/10','https://www.youtube.com/embed/406jOVmKqAE','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/227748/TheEqualizer3_2023.jpg','false'),(14,'NEW MOVIE XYZ','0/10','https://www.youtube.com/embed/406jOVmKqAE','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/227748/TheEqualizer3_2023.jpg','true');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03 15:41:36
