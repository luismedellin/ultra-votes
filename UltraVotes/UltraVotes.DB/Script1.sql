/*
20220720 13:00

﻿CREATE SCHEMA votes 

--drop table votes.Users
CREATE TABLE votes.Users(
[UserId] NVARCHAR (256) NOT NULL PRIMARY KEY,
[Password] NVARCHAR (1024) NULL,
[Name] NVARCHAR (60) NOT NULL,
[LastName] NVARCHAR (60) NOT NULL,C:\Users\luis.velandia\Documents\code\ultra\ultra-votes\UltraVotes\UltraVotes.DB\votes
[Email] NVARCHAR (256) NULL,
[Document] NVARCHAR (20) NOT NULL,
[Phone] NVARCHAR (20) NULL,
[DepartmentId] NVARCHAR (50) NULL,
[BossId] NVARCHAR (256) NULL,
[CountryId] NVARCHAR (50) NOT NULL,
[Avatar] NVARCHAR (256),
[CreatedDate] DATETIME DEFAULT GETDATE() NOT NULL,
[CreatedBy] NVARCHAR (256) NOT NULL,
[UpdatedDate] DATETIME NULL,
[UpdatedBy] NVARCHAR (256) NULL,
)

INSERT INTO votes.Users VALUES
('luiseduardo1218@gmail.com','123','Luis','Velandia',
'luiseduardo1218@gmail.com', '1020', '311', 'ti', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL)

SELECT * FROM votes.Users
*/

/*
20220720 19:00


--drop table votes.MasterVote 
CREATE TABLE votes.MasterVote (
    MasterVoteId INT NOT NULL IDENTITY PRIMARY KEY,
	MasterVoteCategoryId tinyint not null FOREIGN KEY REFERENCES votes.MasterVoteCategory (MasterVoteCategoryId),
	Name         NVARCHAR (100)   NOT NULL,
	StatusId	 tinyint  not null FOREIGN KEY REFERENCES votes.Status (StatusId),
	FromDate	 DATETIME NULL,
	ToDate		 DATETIME NULL,
	Points		 tinyint, 
	CreatedDate  DATETIME        DEFAULT (getdate()) NOT NULL,
    CreatedBy    NVARCHAR (256)  NOT NULL,
    UpdatedDate  DATETIME        NULL,
    UpdatedBy    NVARCHAR (256)  NULL
);

INSERT INTO votes.MasterVote (MasterVoteCategoryId, Name, StatusId, FromDate, ToDate, Points, CreatedDate, CreatedBy)
VALUES 
(1, 'Compañerismo', 1, '2022-07-20 12:18:00', '2022-07-27 17:00:00', 10, GETDATE(), '1020')

SELECT * FROM votes.MasterVote

*/

/*
20220722


drop table votes.MasterVoteCategory
CREATE TABLE votes.MasterVoteCategory
(
	MasterVoteCategoryId tinyint IDENTITY PRIMARY KEY,
	Description NVARCHAR(50)
)

INSERT INTO votes.MasterVoteCategory (Description) VALUES
('Compañia'),
('Departamento')

--drop table votes.Status 
CREATE TABLE votes.Status
(
	StatusId tinyint IDENTITY PRIMARY KEY,
	Description NVARCHAR(50)
)

INSERT INTO votes.Status (Description) VALUES
('Abierta'),
('Cerrada'),
('En Progreso')
*/