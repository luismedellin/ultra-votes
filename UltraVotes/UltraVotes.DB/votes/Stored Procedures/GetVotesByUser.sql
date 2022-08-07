﻿
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