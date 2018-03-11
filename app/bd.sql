-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 11-Mar-2018 às 04:54
-- Versão do servidor: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BlogDev`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Newsletter`
--

CREATE TABLE `Newsletter` (
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Post`
--

CREATE TABLE `Post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `text` mediumtext NOT NULL,
  `img_url` varchar(255) NOT NULL DEFAULT 'Nothing',
  `img_alt` varchar(255) NOT NULL DEFAULT 'Nothing',
  `User_nickname` varchar(20) NOT NULL,
  `User_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Post`
--

INSERT INTO `Post` (`id`, `title`, `date`, `text`, `img_url`, `img_alt`, `User_nickname`, `User_name`) VALUES
(1, 'Aquele que será o primeiro post da merda do nosso blog pra eu poder testar a capacidade de aguentar o tranco dessa desgraça.', '2018-03-21', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet eu velit vitae efficitur. Integer maximus ut ipsum quis ullamcorper. Quisque vel bibendum justo, ut lobortis sapien. Sed posuere nisi velit, vitae vehicula ipsum porta nec. In hac habitasse platea dictumst. Aliquam eget placerat eros, nec vulputate libero. Vivamus cursus orci a lorem euismod, sit amet suscipit tellus ullamcorper. Aliquam nec euismod sapien, non pulvinar felis. Fusce id nunc non ipsum tempor gravida at ac urna. Curabitur id odio ut lacus placerat pulvinar. Duis euismod, magna vitae imperdiet pulvinar, nibh lectus fringilla felis, sit amet pretium dolor ligula eget enim. Donec sed condimentum lorem. Suspendisse in diam posuere, porttitor dolor in, interdum ante.\r\n\r\nAenean suscipit tincidunt turpis, at egestas tortor fringilla in. Sed quis massa mattis, ullamcorper est sed, interdum metus. Aliquam faucibus purus dui, vitae lacinia augue viverra eget. Nullam commodo commodo pellentesque. Aenean eget auctor ipsum. Nam ligula sapien, vestibulum nec auctor vitae, imperdiet eget massa. Fusce vitae lobortis ante. Aenean aliquam, lectus porta posuere pretium, arcu nisi pretium ex, id porttitor elit felis finibus odio. Nam orci risus, varius sit amet lectus non, blandit imperdiet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec libero augue, porttitor eu ipsum quis, efficitur eleifend tellus. Suspendisse gravida ex vitae erat volutpat, non egestas massa laoreet. Duis id efficitur mi.\r\n\r\nSed lectus magna, ornare sed condimentum vestibulum, fermentum vitae lacus. Duis quis ipsum nec augue consequat consequat luctus eget leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ut consequat justo. Quisque vel nulla eu lacus volutpat viverra. Quisque fringilla a eros sit amet accumsan. Nulla semper tempor orci, vitae iaculis lorem congue non. Nam a imperdiet neque. Duis cursus, velit in rutrum viverra, libero ligula cursus ante, quis euismod justo ante sed mi. Suspendisse gravida orci blandit nunc molestie, sed dictum justo porttitor. Donec vestibulum tellus mi. Aliquam in vulputate dui. Suspendisse lorem metus, ornare eget metus at, porttitor maximus ante. Integer et aliquet purus. Donec ullamcorper interdum libero, sit amet malesuada magna. Donec mattis ullamcorper metus vitae iaculis.\r\n\r\nSed faucibus erat nec ante consectetur pellentesque. Morbi in lorem non velit egestas ornare. Morbi tincidunt erat orci. Nunc vitae posuere dui. Ut enim metus, malesuada at sapien consectetur, pharetra commodo mauris. Suspendisse vitae convallis nunc, in dapibus leo. In gravida placerat purus, in varius elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque bibendum velit urna, eu elementum nibh scelerisque id. Nullam ut dui elementum, scelerisque nisl vitae, iaculis tortor. Fusce nec mauris justo. Aenean sed iaculis lorem, quis tempus quam. Nullam aliquam sodales lectus at lacinia.\r\n\r\nPellentesque eget euismod libero, hendrerit euismod sem. Cras pellentesque nulla vel metus malesuada, non elementum nulla mollis. Fusce massa orci, eleifend vel quam vel, aliquet tincidunt risus. Curabitur eros quam, ornare in sem id, egestas gravida ligula. Aenean tincidunt gravida enim, sed maximus ex posuere sed. Proin sit amet tortor sem. Donec vitae dolor vitae velit posuere luctus vitae at ipsum. Nam ac dui sit amet felis congue commodo ac et lectus. In accumsan fermentum augue non convallis. Proin in aliquet turpis, ultricies accumsan sapien. Ut semper lacus eu diam sagittis efficitur. ', 'app/resources/img/stock-img-entry.jpg', 'Estou te vendo, huehuehue.', 'batata', 'Dunha da Silva Batatão'),
(3, 'Vamos lá, mais uma vez testar quanto de capacidade o noda fez nessa merda de título, espero não destruir tudo e quebrar todo o HTML dele, ele vai ficar chateado.', '2018-03-01', '\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet eu velit vitae efficitur. Integer maximus ut ipsum quis ullamcorper. Quisque vel bibendum justo, ut lobortis sapien. Sed posuere nisi velit, vitae vehicula ipsum porta nec. In hac habitasse platea dictumst. Aliquam eget placerat eros, nec vulputate libero. Vivamus cursus orci a lorem euismod, sit amet suscipit tellus ullamcorper. Aliquam nec euismod sapien, non pulvinar felis. Fusce id nunc non ipsum tempor gravida at ac urna. Curabitur id odio ut lacus placerat pulvinar. Duis euismod, magna vitae imperdiet pulvinar, nibh lectus fringilla felis, sit amet pretium dolor ligula eget enim. Donec sed condimentum lorem. Suspendisse in diam posuere, porttitor dolor in, interdum ante.\r\n\r\nAenean suscipit tincidunt turpis, at egestas tortor fringilla in. Sed quis massa mattis, ullamcorper est sed, interdum metus. Aliquam faucibus purus dui, vitae lacinia augue viverra eget. Nullam commodo commodo pellentesque. Aenean eget auctor ipsum. Nam ligula sapien, vestibulum nec auctor vitae, imperdiet eget massa. Fusce vitae lobortis ante. Aenean aliquam, lectus porta posuere pretium, arcu nisi pretium ex, id porttitor elit felis finibus odio. Nam orci risus, varius sit amet lectus non, blandit imperdiet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec libero augue, porttitor eu ipsum quis, efficitur eleifend tellus. Suspendisse gravida ex vitae erat volutpat, non egestas massa laoreet. Duis id efficitur mi.\r\n\r\nSed lectus magna, ornare sed condimentum vestibulum, fermentum vitae lacus. Duis quis ipsum nec augue consequat consequat luctus eget leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ut consequat justo. Quisque vel nulla eu lacus volutpat viverra. Quisque fringilla a eros sit amet accumsan. Nulla semper tempor orci, vitae iaculis lorem congue non. Nam a imperdiet neque. Duis cursus, velit in rutrum viverra, libero ligula cursus ante, quis euismod justo ante sed mi. Suspendisse gravida orci blandit nunc molestie, sed dictum justo porttitor. Donec vestibulum tellus mi. Aliquam in vulputate dui. Suspendisse lorem metus, ornare eget metus at, porttitor maximus ante. Integer et aliquet purus. Donec ullamcorper interdum libero, sit amet malesuada magna. Donec mattis ullamcorper metus vitae iaculis.\r\n\r\nSed faucibus erat nec ante consectetur pellentesque. Morbi in lorem non velit egestas ornare. Morbi tincidunt erat orci. Nunc vitae posuere dui. Ut enim metus, malesuada at sapien consectetur, pharetra commodo mauris. Suspendisse vitae convallis nunc, in dapibus leo. In gravida placerat purus, in varius elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque bibendum velit urna, eu elementum nibh scelerisque id. Nullam ut dui elementum, scelerisque nisl vitae, iaculis tortor. Fusce nec mauris justo. Aenean sed iaculis lorem, quis tempus quam. Nullam aliquam sodales lectus at lacinia.\r\n\r\nPellentesque eget euismod libero, hendrerit euismod sem. Cras pellentesque nulla vel metus malesuada, non elementum nulla mollis. Fusce massa orci, eleifend vel quam vel, aliquet tincidunt risus. Curabitur eros quam, ornare in sem id, egestas gravida ligula. Aenean tincidunt gravida enim, sed maximus ex posuere sed. Proin sit amet tortor sem. Donec vitae dolor vitae velit posuere luctus vitae at ipsum. Nam ac dui sit amet felis congue commodo ac et lectus. In accumsan fermentum augue non convallis. Proin in aliquet turpis, ultricies accumsan sapien. Ut semper lacus eu diam sagittis efficitur. ', 'Nothing', 'Nothing', 'batata', 'Dunha da Silva Batatão');

-- --------------------------------------------------------

--
-- Estrutura da tabela `User`
--

CREATE TABLE `User` (
  `name` varchar(255) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `privilege` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `User`
--

INSERT INTO `User` (`name`, `nickname`, `password`, `privilege`) VALUES
('Dunha da Silva Batatão', 'batata', '$2y$10$A5WudRXDE4sdlFkiSoarl.BkShB.Y49SDqrEm52iQ34ZDIdjGTk0O[]', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Newsletter`
--
ALTER TABLE `Newsletter`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Post_User_idx` (`User_nickname`,`User_name`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`nickname`,`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `fk_Post_User` FOREIGN KEY (`User_nickname`,`User_name`) REFERENCES `User` (`nickname`, `name`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
