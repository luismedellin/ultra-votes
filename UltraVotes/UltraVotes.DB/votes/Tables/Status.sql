CREATE TABLE [votes].[Status] (
    [StatusId]    TINYINT       IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (50) NULL,
    [SortOrder]   TINYINT       NULL,
    PRIMARY KEY CLUSTERED ([StatusId] ASC)
);



