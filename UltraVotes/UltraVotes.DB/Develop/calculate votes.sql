
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


SELECT 
	CASE 
	WHEN (Candidates - Votes)  = 0 THEN 'Closed'
	WHEN (Points- VotedPoints)  = 0 THEN 'Closed'
	ELSE 'Open' END status,



	*
FROM (
	SELECT	mv.MasterVoteId, 
			MasterVoteCategoryId, 
			(SELECT Description FROM votes.MasterVoteCategory c WHERE c.MasterVoteCategoryId = mv.MasterVoteCategoryId)Category,
			MasterVoteRestrictionId, 
			(SELECT Description FROM votes.MasterVoteRestriction c WHERE c.RestrictionId = mv.MasterVoteRestrictionId)Restriction,
			Name, 
			StatusId,
			(SELECT Description FROM votes.Status s WHERE s.StatusId = mv.StatusId)Status,
			FromDate, 
			ToDate, 
			ISNULL(v.Points, 0) VotedPoints, 
			mv.Points, 
			ISNULL(v.Votes, 0) Votes,
			Candidates,
			CreatedDate, 
			CreatedBy, 
			UpdatedDate, 
			UpdatedBy
	FROM	votes.MasterVote mv
	LEFT JOIN (
		SELECT	MasterVoteId, SUM(Points) Points, COUNT('') Votes
		FROM	votes.Vote
		WHERE UserId = 'luiseduardo1218@gmail.com'
		GROUP BY MasterVoteId
	) v ON mv.MasterVoteId = v.MasterVoteId
) AS MV