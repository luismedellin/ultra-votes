
SELECT 
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'luiseduardo1218@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV







SELECT 
	CASE 
	WHEN Points > 0 AND (Points- VotedPoints)  = 0 THEN 'Closed'
	WHEN Candidates > 0 AND (Candidates - Votes)  = 0 THEN 'Closed'
	ELSE 'Open' END status,
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'luiseduardo1218@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV
-------------------------------------------









SELECT 
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'maria@gmail.com'
	--WHERE UserId = 'luiseduardo1218@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV





SELECT 
	CASE 
	WHEN Points > 0 AND (Points- VotedPoints)  = 0 THEN 'Closed'
	WHEN Candidates > 0 AND (Candidates - Votes)  = 0 THEN 'Closed'
	ELSE 'Open' END status,
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'maria@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV




-----------------------

SELECT 
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'alejandra@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV





SELECT 
	CASE 
	WHEN Points > 0 AND (Points- VotedPoints)  = 0 THEN 'Closed'
	WHEN Candidates > 0 AND (Candidates - Votes)  = 0 THEN 'Closed'
	ELSE 'Open' END status,
	*
FROM (
SELECT	mv.MasterVoteId, MasterVoteCategoryId, MasterVoteRestrictionId, Name, StatusId,
		FromDate, ToDate, 

		ISNULL(v.Points, 0) VotedPoints, 
		mv.Points, 
		ISNULL(v.Votes, 0) Votes,
		Candidates
FROM	votes.MasterVote mv
LEFT JOIN (
	SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
	FROM	votes.Vote
	WHERE UserId = 'alejandra@gmail.com'
	GROUP BY MasterVoteId
) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV
---------------------


EXEC votes.GetVotesByUser ''
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
				CategoryId, (SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.CategoryId)Category,
				RestrictionId, (SELECT Description FROM votes.MasterVoteRestriction c WHERE c.RestrictionId = mv.RestrictionId)Restriction,
				Title, 
				Subtitle,
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

SELECT	* 
FROM	votes.Status

x



SELECT *
FROM 

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


SELECT *
FROM votes.MasterVote


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


SELECT CandidateId, MasterVoteId, UserId, Name, LastName, DepartmentId, AreaId, Avatar, IsFinalist
FROM	votes.Candidate
WHERE	MasterVoteId = 1


