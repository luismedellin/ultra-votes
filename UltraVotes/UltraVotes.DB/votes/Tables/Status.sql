CREATE TABLE [votes].[Status] (
    [StatusId]    TINYINT       IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([StatusId] ASC)
);

