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
  `category` varchar(15) DEFAULT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `director` varchar(30) DEFAULT NULL,
  `producer` varchar(30) DEFAULT NULL,
  `cast` varchar(1000) DEFAULT NULL,
  `synopsis` TEXT DEFAULT NULL,
  `reviews` TEXT DEFAULT NULL,
  `poster` varchar(500) DEFAULT NULL,
  `trailer` varchar(500) DEFAULT NULL,
  `isOut` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idmovie`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'SAW X','Horror','R','Kevin Greutert','James Wan','Tobin Bell, Shawnee Smith, Synnøve Macody Lund, Steven Brand, Renata Vaca, Michael Beach, Paulette Hernández, Octavio Hinojosa, Joshua Okamoto','John Kramer (Tobin Bell) is back. The most chilling installment of the SAW franchise yet explores the untold chapter of Jigsaw''s most personal game. Set between the events of SAW I and II, a sick and desperate John travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer - only to discover the entire operation is a scam to defraud the most vulnerable. Armed with a newfound purpose, John returns to his work, turning the tables on the con artists in his signature visceral way through a series of ingenious and terrifying traps. A Lionsgate release. Twisted Pictures presents, a Burg/Koules production.','Great Horror movie!', 'https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/232577/Saw-X_2023.jpg','https://www.youtube.com/embed/t3PzUo4P21c', 'true'),
(2,'EXPEND4BLES','Action','R','Scott Waugh','Allen Dam','Jason Statham, 50 Cent, Megan Fox, Dolph Lundgren, Tony Jaa, Iko Uwais, Randy Couture, Jacob Scipio, Levy Tran, Andy Garcia, Sylvester Stallone','A new generation of stars join the world''s top action stars for an adrenaline-fueled adventure in Expend4bles. Reuniting as the team of elite mercenaries, Jason Statham, Dolph Lundgren, Randy Couture, and Sylvester Stallone are joined for the first time by Curtis \“50 Cent\” Jackson, Megan Fox, Tony Jaa, Iko Uwais, Jacob Scipio, Levy Tran, and Andy Garcia. Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world''s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give \“new blood\” a whole new meaning. Lionsgate and Millennium Media present A Nu Boyana Studios and Templeton Media Production in Association With Grobman Films in Association with Media Capital Technologies.', 'Great Action Movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/232154/expend4bles-EXP4_ONLINE_POSTER_DIGITAL_HERO_7A_RGB_R1_rgb.jpg','https://www.youtube.com/embed/DhlaBO-SwVE','true'),
(3,'BLUE BEETLE','Adventure','PG-13','Angel Manuel Soto','Galen Vaisman','Xolo Maridueña, Adriana Barraza, Damián Alcázar, Elpidia Carrillo, Becky G, Bruna Marquezine, Raoul Max Trujillo, Susan Sarandon, George Lopez, Belissa Escobedo, Harvey Guillen','Mexican-American teenager Jaime Reyes gains super powers when a mysterious scarab binds to his spine and provides him with a powerful suit of blue alien armor.','Great Adventure Movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231534/BLBTL_VERT_MONTAGE_2764x4096_DOM_EM.jpg','https://www.youtube.com/embed/vS3_72Gb-bI','true'), 
(4,'SPIDER-MAN: ACROSS THE SPIDER-VERSE','Animation','PG','Joaquim Dos Santos','Bob Persichetti','Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson, Issa Rae, Daniel Kaluuya, Jason Schwartzman, Brian Tyree Henry, Luna Lauren Velez, Greta Lee, Rachel Dratch, Jorma Taccone, Shea Whigham','Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, Spider-Man™: Across the Spider-Verse. After reuniting with Gwen Stacy, Brooklyn''s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse''s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most. Anyone can wear the mask – it''s how you wear it that makes you a hero.','Great Animation Movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/226752/SM-Across-SV_final_2023.jpg','https://www.youtube.com/embed/cqGjhVJWtEg','true'),
(5,'OPPENHEIMER','Thriller','R','Christopher Nolan','Emma Thomas','Cillian Murphy, Emily Blunt, Robert Downey Jr., Matt Damon, Rami Malek, Florence Pugh, Ben Safdie, Michael Angarano, Josh Hartnett, Kenneth Branagh, Casey Affleck, Dane DeHaan, Dylan Arnold','Written and directed by Christopher Nolan, Oppenheimer is an IMAX®-shot epic thriller that thrusts audiences into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it.','Great Thriller movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/230575/OPR_Tsr1Sheet3_Look2_RGB_3SM.jpg','https://www.youtube.com/embed/uYPbbksJxIg','true'),
(9,'STRAYS','Comedy','R','Josh Greenbaum','Jessica Switch','Will Ferrell, Jamie Foxx, Will Forte, Isla Fisher, Randall Park, Josh Gad, Harvey Guillen, Brett Gelman, Rob Riggle, Jamie Demetriou, Sofía Vergara','When Reggie (Will Ferrell), a naïve, relentlessly optimistic Border Terrier, is abandoned on the mean city streets by his lowlife owner, Doug (Will Forte; The Last Man on Earth, Nebraska), Reggie is certain that his beloved owner would never leave him on purpose. But once Reggie falls in with a fast-talking, foul-mouthed Boston Terrier named Bug (Oscar® winner Jamie Foxx), a stray who loves his freedom and believes that owners are for suckers, Reggie finally realizes he was in a toxic relationship and begins to see Doug for the heartless sleazeball that he is. Determined to seek revenge, Reggie, Bug and Bug''s pals—Maggie (Isla Fisher; Now You See Me, Wedding Crashers), a smart Australian Shepherd who has been sidelined by her owner''s new puppy, and Hunter (Randall Park; Always Be My Maybe, Aquaman), an anxious Great Dane who''s stressed out by his work as an emotional support animal—together hatch a plan and embark on an epic adventure to help Reggie find his way home.', 'Great dog movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231033/STR_Look2_Adv1Sheet8_1080x1920pxH_RGB_1.jpg','https://www.youtube.com/embed/26Xq6_g2r6Q','true'),
(10,'GRAN TURISMO', 'Drama','PG-13','Neill Blomkamp','Jason Hall','David Harbour, Orlando Bloom, Archie Madekwe, Takehiro Hira, Darren Barnet', 'Based on the unbelievable, inspiring true story of a team of underdogs - a struggling, working-class gamer, a failed former race car driver, and an idealistic motorsport exec - who risk it all to take on the most elite sport in the world.','Great racing movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231714/GT_OnLine_6072x9000_TSR_Swirl_03.jpg','https://www.youtube.com/embed/GVPzGBvPrzw','true'),
(11,'MISSION: IMPOSSIBLE-DEAD RECKONING','Action','PG-13','Christopher McQuarrie','David Ellison','Tom Cruise, Hayley Atwell, Ving Rhames, Simon Pegg, Rebecca Ferguson','In Mission: Impossible - Dead Reckoning Part One, Ethan Hunt (Tom Cruise) and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan''s past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission -- not even the lives of those he cares about most.','Great Action and Adventure Movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/223028/midrp1dom2037x3000payoffdigital1sht01fin18.jpg','https://www.youtube.com/embed/2m1drlOZSDw','false'),
(12,'ELEMENTAL','Animation','PG','Peter Sohn','Denise Ream','Leah Lewis, Mamoudou Athie, Ronnie del Carmen, Shila Ommi, Wendi McLendon-Covey','Disney and Pixar''s \“Elemental,\” an all-new, original feature film set in Element City, where fire-, water-, land- and air-residents live together. The story introduces Ember, a tough, quick-witted and fiery young woman, whose friendship with a fun, sappy, go-with-the-flow guy named Wade challenges her beliefs about the world they live in. Directed by Peter Sohn, produced by Denise Ream, and featuring the voices of Leah Lewis and Mamoudou Athie as Ember and Wade, respectively, \“Elemental\” releases on June 16, 2023.','Great Disney Movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/230347/STANDARD_ELM_Payoff_Train_1s_v90_Mech7.jpg','https://www.youtube.com/embed/2m1drlOZSDw','false'), 
(13,'THE EQUALIZER 3','Action','R','Antoine Fuqua','David J. Bloomfield','Denzel Washington, Dakota Fanning, David Denman, Eugenio Mastrandrea, Gaia Scodellaro','Since giving up his life as a government assassin, Robert McCall (Denzel Washington) has struggled to reconcile the horrific things he''s done in the past and finds a strange solace in serving justice on behalf of the oppressed. Finding himself surprisingly at home in Southern Italy, he discovers his new friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends'' protector by taking on the mafia.','Great action and thriller movie!','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/227748/TheEqualizer3_2023.jpg','https://www.youtube.com/embed/406jOVmKqAE','false'),
(14,'NEW MOVIE XYZ','Action','PG','----','----','----','----','-----','https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/227748/TheEqualizer3_2023.jpg','https://www.youtube.com/embed/406jOVmKqAE','true');
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
