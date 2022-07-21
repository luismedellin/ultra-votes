﻿CREATE TABLE [votes].[MasterVote] (
    [MasterVoteId]         INT            IDENTITY (1, 1) NOT NULL,
    [MasterVoteCategoryId] INT            NOT NULL,
    [Name]                 NVARCHAR (100) NOT NULL,
    [Status]               TINYINT        NOT NULL,
    [FromDate]             DATETIME       NULL,
    [ToDate]               DATETIME       NULL,
    [Points]               TINYINT        NULL,
    [CreatedDate]          DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy]            NVARCHAR (256) NOT NULL,
    [UpdatedDate]          DATETIME       NULL,
    [UpdatedBy]            NVARCHAR (256) NULL,
    PRIMARY KEY CLUSTERED ([MasterVoteId] ASC)
);
