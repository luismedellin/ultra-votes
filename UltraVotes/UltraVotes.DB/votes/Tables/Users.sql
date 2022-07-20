CREATE TABLE [votes].[Users] (
    [UserId]       NVARCHAR (256)  NOT NULL,
    [Password]     NVARCHAR (1024) NULL,
    [Name]         NVARCHAR (60)   NOT NULL,
    [LastName]     NVARCHAR (60)   NOT NULL,
    [Email]        NVARCHAR (256)  NULL,
    [Document]     NVARCHAR (20)   NOT NULL,
    [Phone]        NVARCHAR (20)   NULL,
    [DepartmentId] NVARCHAR (50)   NULL,
    [BossId]       NVARCHAR (256)  NULL,
    [CountryId]    NVARCHAR (50)   NOT NULL,
    [Avatar]       NVARCHAR (256)  NULL,
    [CreatedDate]  DATETIME        DEFAULT (getdate()) NOT NULL,
    [CreatedBy]    NVARCHAR (256)  NOT NULL,
    [UpdatedDate]  DATETIME        NULL,
    [UpdatedBy]    NVARCHAR (256)  NULL,
    PRIMARY KEY CLUSTERED ([UserId] ASC)
);



