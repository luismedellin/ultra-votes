CREATE TABLE [votes].[MasterVote] (
    [MasterVoteId]  INT            IDENTITY (1, 1) NOT NULL,
    [CategoryId]    TINYINT        NOT NULL,
    [RestrictionId] TINYINT        NOT NULL,
    [Title]         NVARCHAR (100) NOT NULL,
    [Subtitle]      NVARCHAR (100) NOT NULL,
    [StatusId]      TINYINT        NOT NULL,
    [FromDate]      DATETIME       NULL,
    [ToDate]        DATETIME       NULL,
    [Points]        TINYINT        NULL,
    [Candidates]    TINYINT        NOT NULL,
    [CreatedDate]   DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy]     NVARCHAR (256) NOT NULL,
    [UpdatedDate]   DATETIME       NULL,
    [UpdatedBy]     NVARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([MasterVoteId] ASC),
    FOREIGN KEY ([CategoryId]) REFERENCES [votes].[MasterVoteCategory] ([MasterVoteCategoryId]),
    FOREIGN KEY ([RestrictionId]) REFERENCES [votes].[MasterVoteRestriction] ([RestrictionId]),
    FOREIGN KEY ([StatusId]) REFERENCES [votes].[Status] ([StatusId])
);







