CREATE TABLE [votes].[Vote] (
    [VoteId]       INT            IDENTITY (1, 1) NOT NULL,
    [MasterVoteId] INT            NOT NULL,
    [UserId]       NVARCHAR (256) NOT NULL,
    [CandidateId]  NVARCHAR (256) NOT NULL,
    [Points]       TINYINT        NULL,
    [CreatedDate]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy]    NVARCHAR (256) NOT NULL,
    PRIMARY KEY CLUSTERED ([VoteId] ASC),
    FOREIGN KEY ([MasterVoteId]) REFERENCES [votes].[MasterVote] ([MasterVoteId])
);

