CREATE TABLE [votes].[MasterVoteCategory] (
    [MasterVoteCategoryId] TINYINT       IDENTITY (1, 1) NOT NULL,
    [Description]          NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([MasterVoteCategoryId] ASC)
);

