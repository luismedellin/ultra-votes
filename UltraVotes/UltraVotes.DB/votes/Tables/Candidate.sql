CREATE TABLE [votes].[Candidate] (
    [CandidateId]  INT            IDENTITY (1, 1) NOT NULL,
    [MasterVoteId] INT            NULL,
    [UserId]       NVARCHAR (256) NOT NULL,
    [Name]         NVARCHAR (60)  NOT NULL,
    [LastName]     NVARCHAR (60)  NOT NULL,
    [DepartmentId] NVARCHAR (50)  NULL,
    [AreaId]       NVARCHAR (50)  NULL,
    [Avatar]       NVARCHAR (256) NOT NULL,
    [IsFinalist]   BIT            NOT NULL,
    PRIMARY KEY CLUSTERED ([CandidateId] ASC),
    FOREIGN KEY ([MasterVoteId]) REFERENCES [votes].[MasterVote] ([MasterVoteId])
);

