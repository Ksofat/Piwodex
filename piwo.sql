-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2024 at 06:17 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `piwo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achivements`
--

CREATE TABLE `achivements` (
  `AchivementID` int(11) NOT NULL,
  `Description` varchar(60) NOT NULL,
  `TierRequired` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achivements`
--

INSERT INTO `achivements` (`AchivementID`, `Description`, `TierRequired`) VALUES
(1, 'First S tier', 'S'),
(2, 'Lack of taste', 'A'),
(3, 'You have got a lot of guts', 'G'),
(4, 'Cry-baby', 'Z');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `beers`
--

CREATE TABLE `beers` (
  `BeerID` int(11) NOT NULL,
  `BeerName` varchar(20) NOT NULL,
  `BarCode` varchar(20) NOT NULL,
  `Tier` varchar(1) NOT NULL,
  `BeerImage` blob DEFAULT NULL,
  `AlcoholContent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beers`
--

INSERT INTO `beers` (`BeerID`, `BeerName`, `BarCode`, `Tier`, `BeerImage`, `AlcoholContent`) VALUES
(1, 'Żywiec', '5901559140009', 'A', NULL, 5),
(2, 'Łomża Jasne', '5903538900628', 'B', NULL, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `collectedbeers`
--

CREATE TABLE `collectedbeers` (
  `CollectedBeerID` int(11) NOT NULL,
  `CollectedDate` datetime NOT NULL,
  `PointsAwarded` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BeerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collectedbeers`
--

INSERT INTO `collectedbeers` (`CollectedBeerID`, `CollectedDate`, `PointsAwarded`, `UserID`, `BeerID`) VALUES
(1, '2024-04-06 14:00:00', 5, 2, 1),
(2, '2024-04-06 14:15:00', 3, 2, 2),
(3, '2024-04-07 16:00:00', 3, 3, 2),
(4, '2024-04-07 16:30:00', 0, 3, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `discussions`
--

CREATE TABLE `discussions` (
  `DiscussionID` int(11) NOT NULL,
  `Message` text NOT NULL,
  `ModifiedDate` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `StoreID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discussions`
--

INSERT INTO `discussions` (`DiscussionID`, `Message`, `ModifiedDate`, `UserID`, `StoreID`) VALUES
(1, 'Nie ma Romperta -Rep', '2024-04-06 15:30:00', 1, 1),
(2, 'Jest Rompercik B)', '2024-04-06 16:00:00', 1, 2),
(3, 'Fajna promocja, żywiec 6+6', '2024-04-07 17:30:00', 3, 3),
(4, 'DROGO', '2024-04-07 18:00:00', 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stores`
--

CREATE TABLE `stores` (
  `StoreID` int(11) NOT NULL,
  `StoreName` varchar(20) NOT NULL,
  `LocationX` decimal(20,10) NOT NULL,
  `LocationY` decimal(20,10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`StoreID`, `StoreName`, `LocationX`, `LocationY`) VALUES
(1, 'Żabka', 17.0581820000, 51.1162430000),
(2, 'Żabka', 17.0575350000, 51.1145580000),
(3, 'Biedronka', 17.0529500000, 51.1152560000);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userachievements`
--

CREATE TABLE `userachievements` (
  `UserAchievementID` int(11) NOT NULL,
  `AchivedDate` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `AchivementID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userachievements`
--

INSERT INTO `userachievements` (`UserAchievementID`, `AchivedDate`, `UserID`, `AchivementID`) VALUES
(1, '2024-04-08 10:05:00', 2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `NIckname` varchar(20) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UserType` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `NIckname`, `Email`, `Password`, `CreatedDate`, `UserType`) VALUES
(1, 'Ksofar', '265161@student.pwr.edu.pl', 'hszszszsz', '2024-04-05 12:05:00', 'A'),
(2, '11mat11', 'maticraft13@gmail.com', '11haslo11', '2024-04-05 12:10:00', NULL),
(3, 'k3k_', 'polaris@suga.ro', 'PayDay2', '2024-04-05 12:15:00', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `achivements`
--
ALTER TABLE `achivements`
  ADD PRIMARY KEY (`AchivementID`),
  ADD UNIQUE KEY `AchivementID` (`AchivementID`);

--
-- Indeksy dla tabeli `beers`
--
ALTER TABLE `beers`
  ADD PRIMARY KEY (`BeerID`),
  ADD UNIQUE KEY `BeerID` (`BeerID`),
  ADD UNIQUE KEY `BarCode` (`BarCode`);

--
-- Indeksy dla tabeli `collectedbeers`
--
ALTER TABLE `collectedbeers`
  ADD PRIMARY KEY (`CollectedBeerID`),
  ADD UNIQUE KEY `CollectedBeerID` (`CollectedBeerID`),
  ADD KEY `IX_Relationship1` (`UserID`),
  ADD KEY `IX_Relationship2` (`BeerID`);

--
-- Indeksy dla tabeli `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`DiscussionID`),
  ADD UNIQUE KEY `DiscussionID` (`DiscussionID`),
  ADD KEY `IX_Relationship5` (`UserID`),
  ADD KEY `IX_Relationship6` (`StoreID`);

--
-- Indeksy dla tabeli `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`StoreID`),
  ADD UNIQUE KEY `StoreID` (`StoreID`);

--
-- Indeksy dla tabeli `userachievements`
--
ALTER TABLE `userachievements`
  ADD PRIMARY KEY (`UserAchievementID`),
  ADD UNIQUE KEY `UserAchievementID` (`UserAchievementID`),
  ADD KEY `IX_Relationship3` (`UserID`),
  ADD KEY `IX_Relationship4` (`AchivementID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserID` (`UserID`),
  ADD UNIQUE KEY `NIckname` (`NIckname`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achivements`
--
ALTER TABLE `achivements`
  MODIFY `AchivementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `beers`
--
ALTER TABLE `beers`
  MODIFY `BeerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `collectedbeers`
--
ALTER TABLE `collectedbeers`
  MODIFY `CollectedBeerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `discussions`
--
ALTER TABLE `discussions`
  MODIFY `DiscussionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `StoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userachievements`
--
ALTER TABLE `userachievements`
  MODIFY `UserAchievementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collectedbeers`
--
ALTER TABLE `collectedbeers`
  ADD CONSTRAINT `BeersToCollectedBeers` FOREIGN KEY (`BeerID`) REFERENCES `beers` (`BeerID`),
  ADD CONSTRAINT `UsersToColectedBeers` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `StoresToDiscussions` FOREIGN KEY (`StoreID`) REFERENCES `stores` (`StoreID`),
  ADD CONSTRAINT `UsersToDiscussions` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `userachievements`
--
ALTER TABLE `userachievements`
  ADD CONSTRAINT `AchivementsToUserAchievements` FOREIGN KEY (`AchivementID`) REFERENCES `achivements` (`AchivementID`),
  ADD CONSTRAINT `UsersToUserAchievements` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
