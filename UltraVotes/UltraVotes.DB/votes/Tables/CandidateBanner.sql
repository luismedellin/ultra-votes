CREATE TABLE [votes].[CandidateBanner] (
    [CandidateBannerId] INT            IDENTITY (1, 1) NOT NULL,
    [CandidateId]       INT            NOT NULL,
    [FileName]          NVARCHAR (256) NULL,
    [ImgType]           TINYINT        NULL,
    [ImgPath]           NVARCHAR (256) NULL,
    [Width]             SMALLINT       NULL,
    [Height]            SMALLINT       NULL,
    [SortOrder]         TINYINT        NULL,
    PRIMARY KEY CLUSTERED ([CandidateBannerId] ASC),
    FOREIGN KEY ([CandidateId]) REFERENCES [votes].[Candidate] ([CandidateId])
);

