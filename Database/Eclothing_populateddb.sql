CREATE DATABASE  IF NOT EXISTS `p18_eclothing_populated` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p18_eclothing_populated`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: p18_eclothing_populated
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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `cart_status` enum('Active','InActive') DEFAULT 'Active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_customer` (`c_id`),
  CONSTRAINT `fk_cart_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'Active','2026-07-09 15:31:38'),(2,2,'Active','2026-07-09 15:31:38'),(3,3,'Active','2026-07-09 15:31:38');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `p_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `uq_cart_product` (`cart_id`,`p_id`),
  KEY `fk_cart_items_product` (`p_id`),
  CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,1,2,'2026-07-09 15:31:38'),(2,1,3,1,'2026-07-09 15:31:38'),(3,2,2,3,'2026-07-09 15:31:38'),(4,2,4,1,'2026-07-09 15:31:38'),(5,3,5,2,'2026-07-09 15:31:38');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `is_deleted` int NOT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men',0),(2,'Women',0),(3,'Kids',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `u_id` (`u_id`),
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,4,'Near Bus Stand','Nagpur','Maharashtra','440001'),(2,5,'Shivaji Nagar','Pune','Maharashtra','411005'),(3,6,'Civil Lines','Chandrapur','Maharashtra','442401'),(4,7,'Pune','Pune','Maharashtra','411001'),(5,10,'Kachiboli','Hyderabad','Telanagana','564321'),(6,11,'Mumbai','Mumbai','Maharashtra','443212'),(7,13,'Civil lines, Satara','Satara','Maharashtra','442001'),(8,16,'','','',''),(9,17,'Wardha','Wardha','Maharashtra','403212'),(10,18,'Singhpore','Singphore','Maharashtra','403212');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `p_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `fk_order_items_order` (`order_id`),
  KEY `fk_order_items_product` (`p_id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_order_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,2,1499.00),(2,1,2,1,799.00),(3,2,4,1,999.00),(4,3,3,1,1899.00),(5,3,5,1,1199.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('Pending','Confirmed','Shipped','Out For Delivery','Delivered','Cancelled','Returned') DEFAULT 'Pending',
  `payment_status` enum('Pending','Paid','Failed','Refunded') DEFAULT 'Pending',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customer` (`c_id`),
  CONSTRAINT `fk_orders_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2026-07-09 15:31:38',3797.00,'Delivered','Paid'),(2,2,'2026-07-09 15:31:38',999.00,'Shipped','Paid'),(3,3,'2026-07-09 15:31:38',3098.00,'Pending','Pending');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_method` enum('Cash On Delivery','UPI','Credit Card','Debit Card','Net Banking') NOT NULL,
  `payment_status` enum('Pending','Successful','Failed','Refunded') DEFAULT 'Pending',
  `transaction_id` varchar(100) DEFAULT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `order_id` (`order_id`),
  UNIQUE KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,'UPI','Successful','TXN100001','2026-07-09 15:31:38'),(2,2,'Credit Card','Successful','TXN100002','2026-07-09 15:31:38'),(3,3,'Cash On Delivery','Pending',NULL,'2026-07-09 15:31:38');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int NOT NULL,
  `subcat_id` int NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `size` enum('XS','S','M','L','XL','XXL') DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `approval_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `is_deleted` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`p_id`),
  KEY `fk_product_seller` (`s_id`),
  KEY `fk_product_subcategory` (`subcat_id`),
  CONSTRAINT `fk_product_seller` FOREIGN KEY (`s_id`) REFERENCES `seller` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product_subcategory` FOREIGN KEY (`subcat_id`) REFERENCES `subcategory` (`subcat_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,8,1,'Formal White Shirt','Premium cotton formal shirt','L',1499.00,'Approved',0,'2026-07-30 23:56:07','2026-07-31 00:53:43'),(2,8,1,'Slim Fit Blue Shirt','Slim fit office shirt','M',1299.00,'Approved',0,'2026-07-30 23:59:01','2026-07-31 00:53:43'),(3,8,2,'Printed T-Shirt','100% cotton printed t-shirt','M',799.00,'Approved',0,'2026-07-31 00:03:37','2026-07-31 00:53:43'),(4,8,3,'Blue Denim Jeans','Stretchable denim jeans','L',1799.00,'Approved',0,'2026-07-31 00:05:05','2026-07-31 00:53:43'),(5,8,4,'Formal Trousers','Comfort fit formal trousers','L',1399.00,'Approved',0,'2026-07-31 00:06:28','2026-07-31 00:53:43'),(6,8,6,'Floral Summer Dress','Women floral dress','M',1899.00,'Approved',0,'2026-07-31 00:20:02','2026-07-31 00:53:43'),(7,8,7,'Blue Kurti','Rayon casual kurti','XL',999.00,'Approved',0,'2026-07-31 00:21:45','2026-07-31 00:53:43'),(8,8,8,'Stylish Crop Top','Fashion crop top','S',799.00,'Approved',0,'2026-07-31 00:23:36','2026-07-31 00:53:43'),(9,8,11,'Kids Printed T-Shirt','Soft cotton kids t-shirt','XS',599.00,'Approved',0,'2026-07-31 00:24:55','2026-07-31 00:53:43'),(10,8,14,'Kids Blue Jeans','Comfortable kids jeans','S',899.00,'Approved',0,'2026-07-31 00:26:54','2026-07-31 00:53:43'),(11,9,4,'Grey Office Trousers','Office wear trousers','XL',1494.00,'Pending',0,'2026-07-31 07:01:51','2026-07-31 07:01:51'),(12,9,7,'Pink Kurti','Cotton causal kurti','M',850.00,'Pending',0,'2026-07-31 07:03:50','2026-07-31 07:03:50'),(13,9,12,'Kids Floral Dress','Cute floral frock','XS',999.00,'Pending',0,'2026-07-31 07:05:44','2026-07-31 07:05:44'),(14,10,5,'Denim Jacket','Blue denim jacket','S',899.00,'Approved',0,'2026-07-31 13:30:10','2026-07-31 14:37:53'),(15,10,13,'Winter Hoodie','Kids fleece hoodie','S',1000.00,'Approved',0,'2026-07-31 13:31:44','2026-07-31 14:37:53');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_product_images` (`p_id`),
  CONSTRAINT `fk_product_images` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'db0c696e-9014-4702-b22b-23b39303f01d_shirt.jpg'),(3,2,'618e3196-89d7-4c9e-a465-ce8062fb7cf0_solidblue.webp'),(4,3,'09b31736-94b6-4c1a-a0b5-a92abbbcf4ec_printedtshirt.webp'),(5,4,'6a24792d-5161-436b-b035-f6fd68ff850c_Stretchabledenimjeans.webp'),(6,5,'4b8d5db4-bcaa-4410-a78f-ffca6a4ca8fb_formaltrousers.jfif'),(7,6,'c6e70a83-e000-49ab-8862-afe73647bed1_floraldress.jfif'),(8,7,'0d7ced04-4479-46db-8965-9644b64eaa5e_rayonkurti.jfif'),(9,8,'fa5e4571-e4d8-4340-ac4f-54b02a83551c_croptop.webp'),(10,9,'9eb37a5a-9fbc-4f92-81fa-56da93013181_kidstshirt.jpg'),(11,10,'6eb94aea-9f82-4300-bb91-cf1375fc2b22_kidsjeans.avif'),(12,11,'5465ea68-8c37-49ab-995c-3d00f36a1073_officewear.jpg'),(13,12,'51b33241-c254-4c16-aeaf-79757e158610_pinkkurti.webp'),(14,13,'e6f320a8-3e2a-4aba-8897-23b94759bb72_cutefloral.webp'),(15,14,'d9b6d635-4f36-4234-9304-8542eb83b82e_denimjacket.webp'),(16,15,'8c097945-e93c-42d4-ac1e-14b183315aea_hoodie.jfif');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_inventory`
--

DROP TABLE IF EXISTS `product_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `initial_stock` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `fk_inventory_product` (`p_id`),
  CONSTRAINT `fk_inventory_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_inventory`
--

LOCK TABLES `product_inventory` WRITE;
/*!40000 ALTER TABLE `product_inventory` DISABLE KEYS */;
INSERT INTO `product_inventory` VALUES (1,1,50,'2026-07-31 00:30:23'),(2,2,30,'2026-07-31 00:30:23'),(3,3,45,'2026-07-31 00:30:23'),(4,4,20,'2026-07-31 00:30:23'),(5,5,60,'2026-07-31 00:30:23'),(6,6,35,'2026-07-31 00:30:23'),(7,7,40,'2026-07-31 00:30:23'),(8,8,25,'2026-07-31 00:30:23'),(9,9,55,'2026-07-31 00:30:23'),(10,10,15,'2026-07-31 00:30:23'),(11,11,85,'2026-07-31 07:08:14'),(12,12,65,'2026-07-31 07:08:14'),(13,13,100,'2026-07-31 07:08:14'),(14,14,100,'2026-07-31 13:34:23'),(15,15,80,'2026-07-31 13:34:23');
/*!40000 ALTER TABLE `product_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sold`
--

DROP TABLE IF EXISTS `product_sold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sold` (
  `sold_id` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `sold_qty` int NOT NULL,
  `sold_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sold_id`),
  KEY `fk_sold_product` (`p_id`),
  CONSTRAINT `fk_sold_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_sold_qty` CHECK ((`sold_qty` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sold`
--

LOCK TABLES `product_sold` WRITE;
/*!40000 ALTER TABLE `product_sold` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_sold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(3,'Customer'),(2,'Seller');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `shop_name` varchar(150) NOT NULL,
  `gst_number` varchar(20) NOT NULL,
  `business_address` varchar(255) NOT NULL,
  PRIMARY KEY (`s_id`),
  UNIQUE KEY `u_id` (`u_id`),
  UNIQUE KEY `gst_number` (`gst_number`),
  CONSTRAINT `fk_seller_user` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,2,'Rahul Fashion Hub','27ABCDE1234F1Z5','FC Road, Pune'),(2,3,'Sneha Clothing Store','27PQRSX5678L2Z6','JM Road, Pune'),(3,8,'ABC Fashion Store','GST123456789','FC Road, Pune'),(4,9,'urban Store','GST12','Delhi, Nagpur'),(5,12,'Gopal Stores','GST12345','Saraf Line, Wardha'),(6,14,'Diva Shop','GST238','Hyderabad'),(7,15,'Muskan Shop collection','GST33','Delhi'),(8,19,'urban Storeee','GST12121','Delhii, Nagpur'),(9,20,'Tashastu','GST1110','Gachiboli, Hyderabad'),(10,21,'Savana Clothes','GST1112','Singaphore');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `subcat_id` int NOT NULL AUTO_INCREMENT,
  `cat_id` int NOT NULL,
  `subcat_name` varchar(255) NOT NULL,
  `is_deleted` int DEFAULT NULL,
  PRIMARY KEY (`subcat_id`),
  UNIQUE KEY `uq_subcategory` (`cat_id`,`subcat_name`),
  CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,1,'Shirts',0),(2,1,'T-Shirts',0),(3,1,'Jeans',0),(4,1,'Trousers',0),(5,1,'Jackets',0),(6,2,'Dresses',0),(7,2,'Kurtis',0),(8,2,'Tops',0),(9,2,'Jeans',0),(10,2,'Sarees',1),(11,3,'Kids T-Shirts',0),(12,3,'Kids Dresses',0),(13,3,'Kids Hoodies',0),(14,3,'Kids Jeans',0),(15,3,'School Uniform',1);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `fk_users_role` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Admin','admin@eclothing.com','9000000001','admin123',1,'2026-07-09 15:31:38',0),(2,2,'Rahul','rahul@gmail.com','9000000002','$2a$2a$10$7wM0oFj4y9kJzLkX8L5xYu4t4u4Y6hL9Q0OQ8L7k1g2mWzV8QxFzS',1,'2026-07-09 15:31:38',0),(3,2,'Sneha','sneha@gmail.com','9000000003','sneha123',1,'2026-07-09 15:31:38',0),(4,3,'Amit','amit@gmail.com','9000000004','amit123',1,'2026-07-09 15:31:38',0),(5,3,'Priya','priya@gmail.com','9000000005','priya123',1,'2026-07-09 15:31:38',0),(6,3,'Rohan','rohan@gmail.com','9000000006','rohan123',1,'2026-07-09 15:31:38',0),(7,3,'Saloni','saloni@gmail.com','9876543210','123456',1,'2026-07-22 22:27:46',0),(8,2,'ABC Fashion','seller@gmail.com','9876543211','123456',1,'2026-07-22 22:52:48',0),(9,2,'Urban','urbann@gmail.com','56564444','12345',0,'2026-07-22 22:59:36',0),(10,3,'Pooja','pooja@gmail.com','90876543221','123456',1,'2026-07-23 20:07:01',0),(11,3,'Testing','testing@gmail.com','123456789','123456',1,'2026-07-23 20:30:09',1),(12,2,'Gopal Stores','gopal@gmail.com','908988888','12345',0,'2026-07-23 20:36:04',1),(13,3,'Samir','samir@gmail.com','987654323','123456',1,'2026-07-23 22:04:59',0),(14,2,'Ayushi','ayushi@gmail.com','9876556666','12345',0,'2026-07-23 22:21:10',0),(15,2,'Nilima','nilima@gmail.com','78654332','123456',0,'2026-07-23 22:38:49',0),(16,3,'','','','',1,'2026-07-23 22:39:25',0),(17,3,'Shivani','shivani@gmail.com','8797777777','$2a$10$EOFKEz7xaOWfjALm19KgNuUazQVG8ZR0.5SGp5gEUXW5UN9GMso7e',1,'2026-07-24 12:08:57',0),(18,3,'Gautami','gautami@gmail.com','987654422','$2a$10$WQllKxb2XuXXJSbL0s58teSTunCfVPwd5c.LNDxAhkUTfOsQCMfpu',1,'2026-07-24 20:36:57',0),(19,2,'Urban','urbannn@gmail.com','5656444400','$2a$10$.FswP5c1D4XBcNroaL0btOAXdc11xSK1fhm/hWgDhpWnN6xN8arnq',1,'2026-07-24 20:39:12',0),(20,2,'Supriya','supriya@gmail.com','8791234544','$2a$10$bRvyAY9NkevVeU3iJ3R4juZjpZ0ECFm90Ln6flTwEMxY28lN0gaYq',1,'2026-07-31 06:46:19',0),(21,2,'John','john@gmail.com','9909765766','$2a$10$4xbadl5EqF44INivA3EFF.VzyJibp8s2eFWask90n7ifWwkQ71oyq',1,'2026-07-31 06:50:13',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `p_id` int NOT NULL,
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`wishlist_id`),
  UNIQUE KEY `uq_customer_product` (`c_id`,`p_id`),
  KEY `fk_wishlist_product` (`p_id`),
  CONSTRAINT `fk_wishlist_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,1,1,'2026-07-09 15:31:38',0),(2,1,3,'2026-07-09 15:31:38',0),(3,2,2,'2026-07-09 15:31:38',0),(4,2,4,'2026-07-09 15:31:38',0),(5,3,1,'2026-07-09 15:31:38',0);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-31 17:34:50
