/*
20220720 13:00

﻿CREATE SCHEMA votes 
--drop table votes.Users
CREATE TABLE votes.Users(
[UserId] NVARCHAR (256) NOT NULL PRIMARY KEY,
[Password] NVARCHAR (1024) NULL,
[Name] NVARCHAR (60) NOT NULL,
[LastName] NVARCHAR (60) NOT NULL,
[Email] NVARCHAR (256) NULL,
[Document] NVARCHAR (20) NOT NULL,
[Phone] NVARCHAR (20) NULL,
[DepartmentId] NVARCHAR (50) NULL,
[AreaId] NVARCHAR (50) NULL,
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
'luiseduardo1218@gmail.com', '1020', '311', 'ti', 'develop', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL)


SELECT * FROM votes.Users
*/

/*
20220720 19:00


--drop table votes.MasterVote 
CREATE TABLE votes.MasterVote (
    MasterVoteId INT NOT NULL IDENTITY PRIMARY KEY,
	MasterVoteCategoryId tinyint not null FOREIGN KEY REFERENCES votes.MasterVoteCategory (MasterVoteCategoryId),
	MasterVoteRestrictionId tinyint not null FOREIGN KEY REFERENCES votes.MasterVoteRestriction (RestrictionId),
	Name         NVARCHAR (100)   NOT NULL,
	StatusId	 tinyint  not null FOREIGN KEY REFERENCES votes.Status (StatusId),
	FromDate	 DATETIME NULL,
	ToDate		 DATETIME NULL,
	Points		 tinyint,
	Candidates   tinyint NOT NULL,
	CreatedDate  DATETIME        DEFAULT (getdate()) NOT NULL,
    CreatedBy    NVARCHAR (256)  NOT NULL,
    UpdatedDate  DATETIME        NULL,
    UpdatedBy    NVARCHAR (256)  NULL
);

INSERT INTO votes.MasterVote (MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId, FromDate, ToDate, Points, Candidates, CreatedDate, CreatedBy)
VALUES 
(1, 1, 'Compañerismo', 1, '2022-07-20 12:18:00', '2022-07-27 17:00:00', 10, 2, GETDATE(), '1020')

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

/*
20220723

--drop table votes.Status 
CREATE TABLE votes.Status
(
	StatusId tinyint IDENTITY PRIMARY KEY,
	Description NVARCHAR(50),
	SortOrder TINYINT
)

INSERT INTO votes.Status (Description, SortOrder) VALUES
('Abierta',2),
('Cerrada',3),
('En Progreso',1)

SELECT * FROM votes.Status


--drop table votes.MasterVoteCategory
CREATE TABLE votes.MasterVoteCategory
(
	MasterVoteCategoryId tinyint IDENTITY PRIMARY KEY,
	Description NVARCHAR(50)
)

INSERT INTO votes.MasterVoteCategory (Description) VALUES
('Compañia'),
('Departamento')


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


INSERT INTO votes.MasterVote (MasterVoteCategoryId, Name, StatusId, FromDate, ToDate, Points)
VALUES (1, 'Compañerismo', 1, '2022-07-20 12:18:00', '2022-07-27 17:00:00', 10, GETDATE(), '1020')


INSERT INTO votes.MasterVote (MasterVoteCategoryId, Name, StatusId, FromDate, ToDate, Points, CreatedDate, CreatedBy)
OUTPUT INSERTED.MasterVoteId
VALUES (1, 'Compañerismo', 1, '2022-07-20 12:18:00', '2022-07-27 17:00:00', 10, GETDATE(), '1020')



SELECT	MasterVoteId, 
		MasterVoteCategoryId, 
		(SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
		Name, 
		StatusId,
		(SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
		FromDate, 
		ToDate, 
		Points, 
		CreatedDate, 
		CreatedBy, 
		UpdatedDate, 
		UpdatedBy
FROM	votes.MasterVote mv
ORDER BY MasterVoteId DESC


select *
from votes.MasterVoteCategory

SELECT	MasterVoteCategoryId,
		Description
FROM	votes.MasterVoteCategory
ORDER BY Description



SELECT	MasterVoteCategoryId,
		Description
FROM	votes.MasterVoteCategory
ORDER BY Description


SELECT	StatusId,
		Description,
		SortOrder
FROM	votes.Status
ORDER BY SortOrder



SELECT * FROM votes.MasterVote

20220730
--drop table votes.MasterVoteRestriction 
CREATE TABLE votes.MasterVoteRestriction
(
	RestrictionId tinyint IDENTITY PRIMARY KEY,
	Description NVARCHAR(50),
	SortOrder TINYINT
)

INSERT INTO votes.MasterVoteRestriction (Description, SortOrder) VALUES
('Ninguna',0),
('Gerencia',1),
('Área',2)


*/
