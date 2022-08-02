CREATE TABLE [votes].[MasterVoteRestriction] (
    [RestrictionId] TINYINT       IDENTITY (1, 1) NOT NULL,
    [Description]   NVARCHAR (50) NULL,
    [SortOrder]     TINYINT       NULL,
    PRIMARY KEY CLUSTERED ([RestrictionId] ASC)
);

