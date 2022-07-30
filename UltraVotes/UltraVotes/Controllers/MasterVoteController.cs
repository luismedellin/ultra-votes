﻿using Microsoft.AspNetCore.Mvc;
using UltraVotes.Core.DTOs;
using UltraVotes.Core.Services;

namespace UltraVotes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterVoteController : ControllerBase
    {
        private readonly IMasterVoteService masterVoteService;

        public MasterVoteController(IMasterVoteService masterVoteService)
        {
            this.masterVoteService = masterVoteService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            var masterVotes = await masterVoteService.GetAllVotes();

            return Ok(masterVotes);
        }

        [HttpGet("getMasterVote/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var masterVote = await masterVoteService.GetVoteById(id);

            return Ok(masterVote);
        }


        [HttpPost()]
        public async Task<IActionResult> Post(MasterVoteDto masterVote)
        {
            try
            {
                var savedMasterVote = await masterVoteService.SaveMasterVote(masterVote);
                return Ok(savedMasterVote);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
