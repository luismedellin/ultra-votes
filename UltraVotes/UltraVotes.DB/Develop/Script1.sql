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
'luiseduardo1218@gmail.com', '1020', '311', 'ti', 'develop', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL),
('maria@gmail.com','123','Maria C','Torres',
'maria@gmail.com', '1020', '311', 'financiera', 'juridica', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL),
('mary@gmail.com','123','Mary','Franco',
'mary@gmail.com', '1020', '311', 'financiera', 'contabilidad', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL),
('alejandra@gmail.com','123','Alejandra','Giraldo',
'aleja@gmail.com', '1020', '311', 'ti', 'dev', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL),
('alejandro@gmail.com','123','Alejandro','Giraldo',
'alejandro@gmail.com', '1020', '311', 'comercial', 'diseño', '1020', 'colombia', '', GETDATE(), '1020', NULL, NULL)


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


20220708:
CREATE TABLE votes.Vote(
VoteId INT IDENTITY PRIMARY KEY NOT NULL,
MasterVoteId INT not null FOREIGN KEY REFERENCES votes.MasterVote (MasterVoteId),
UserId NVARCHAR(256) NOT NULL,
CandidateId NVARCHAR(256) NOT NULL,
Points tinyint,
CreatedDate  DATETIME        DEFAULT (getdate()) NOT NULL,
CreatedBy    NVARCHAR (256)  NOT NULL,
)


INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(1, 'luiseduardo1218@gmail.com', 'mary@gmail.com', 2, GETDATE(), 'luiseduardo1218@gmail.com')

INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(1, 'luiseduardo1218@gmail.com', 'alejandra@gmail.com', 1, GETDATE(), 'luiseduardo1218@gmail.com')




INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(1, 'maria@gmail.com', 'mary@gmail.com', 3, GETDATE(), 'maria@gmail.com')

INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(1, 'maria@gmail.com', 'alejandra@gmail.com', 2, GETDATE(), 'maria@gmail.com')


INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(2, 'maria@gmail.com', 'mary@gmail.com', 0, GETDATE(), 'maria@gmail.com')

INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(2, 'maria@gmail.com', 'alejandra@gmail.com', 0, GETDATE(), 'maria@gmail.com')




INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(2, 'alejandra@gmail.com', 'mary@gmail.com', 0, GETDATE(), 'alejandra@gmail.com')


INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(2, 'alejandra@gmail.com', 'alejandro@gmail.com', 0, GETDATE(), 'alejandra@gmail.com')


INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(3, 'alejandra@gmail.com', 'mary@gmail.com', 3, GETDATE(), 'alejandra@gmail.com')

INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(3, 'alejandra@gmail.com', 'alejandro@gmail.com', 2, GETDATE(), 'alejandra@gmail.com')



INSERT INTO votes.Vote (MasterVoteId, UserId, CandidateId, Points, CreatedDate, CreatedBy) VALUES
(3, 'alejandra@gmail.com', 'luiseduardo1218@gmail.com', 1, GETDATE(), 'alejandra@gmail.com')





EXEC votes.GetVotesByUser 'luiseduardo1218@gmail.com'
EXEC votes.GetVotesByUser 'maria@gmail.com'
EXEC votes.GetVotesByUser 'alejandra@gmail.com'
EXEC votes.GetVotesByUser 'mary@gmail.com'

--DROP PROCEDURE votes.GetVotesByUser
CREATE PROCEDURE votes.GetVotesByUser(
	@UserId NVARCHAR (256)
)
AS 
BEGIN 

	DECLARE @True BIT = 1,
			@False BIT = 0

	SELECT	*,
			CASE 
				WHEN Points > 0 AND (Points- VotedPoints)  = 0 THEN @False
				WHEN Candidates > 0 AND (Candidates - Votes)  = 0 THEN @False
				WHEN GETDATE() NOT BETWEEN FromDate AND ToDate THEN @False
				WHEN StatusId = 2 THEN @False
				ELSE @True END 
			AS IsAvailable
	FROM (
		SELECT	mv.MasterVoteId, 
				MasterVoteCategoryId, (SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
				MasterVoteRestrictionId, (SELECT Description FROM votes.MasterVoteRestriction c WHERE c.RestrictionId = mv.MasterVoteRestrictionId)Restriction,
				Name, 
				StatusId, (SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
				FromDate, ToDate, 
				ISNULL(v.Points, 0) VotedPoints, mv.Points, 
				ISNULL(v.Votes, 0) Votes, Candidates
		FROM	votes.MasterVote mv
		LEFT JOIN (
			SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
			FROM	votes.Vote
			WHERE UserId = @UserId
			GROUP BY MasterVoteId
		) v ON mv.MasterVoteId = v.MasterVoteId
	) AS MV

END

20220808

--DROP TABLE votes.Candidate
CREATE TABLE votes.Candidate(
CandidateId	INT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
MasterVoteId INT FOREIGN KEY REFERENCES votes.MasterVote (MasterVoteId),
UserId NVARCHAR(256) NOT NULL,
Name  NVARCHAR(60) NOT NULL,
LastName  NVARCHAR(60) NOT NULL,
DepartmentId NVARCHAR (50) NULL,
AreaId NVARCHAR (50) NULL,
Avatar NVARCHAR(256) NOT NULL,
IsFinalist BIT NOT NULL,
)



INSERT INTO votes.Candidate (MasterVoteId,
UserId,
Name,
LastName,
DepartmentId,
AreaId,
Avatar,
IsFinalist)
SELECT	mv.MasterVoteId,
		UserId,
		u.Name,
		LastName,
		DepartmentId,
		AreaId,
		Avatar, 
		0
FROM votes.Users u,
votes.MasterVote mv

*/
