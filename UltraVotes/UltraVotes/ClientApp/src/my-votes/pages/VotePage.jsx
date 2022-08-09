import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

import { useMyVotesStore, useUiStore } from '../../hooks';
import { DetailVoteModal } from '../components/DetailVoteModal';
import { VoteInformation } from '../';

export const VotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { openModal } = useUiStore();

    const { user } = useSelector( state => state.auth );
    const { startLoadingMyVotes, isLoading, myVotes, getVote, currentVote } = useMyVotesStore();
    const [vote, setVote] = useState(null);

    const { 
        register,
        control
    } = useForm();

    useEffect(() => {
        // if(user.username){
        //   startLoadingMyVotes(user.username);
        // }
        startLoadingMyVotes('luiseduardo1218@gmail.com');
    }, [id, user])

    useEffect(() => {
        const load = async() => {
        
            // const myVote = await getVote(id);
            // setVote(myVote);
            await getVote(id);
        }
        
        if(myVotes.length){
            load();
        }
     }, [myVotes])

     useEffect(() => {
        setVote(currentVote);

     }, [currentVote])


    const onSelectChanged = (idVotacion) => {
        navigate(`../mis-votaciones/votar/${idVotacion}`)
    }

    const onViewDetail = () => {
        openModal();
    }

     if(!vote){
        return <p>Loading...</p>
    }

    return (
        <>
        <main id="LoginPage" 
            className="container mx-auto border row justify-content-md-center animate__animated animate__fadeIn" 
            style={{minHeight: '60vh'}}>

        <div className="col col-md-3 p-3 d-none d-md-block">
            <VoteInformation vote={{...vote}} />
        </div>

        <div className="col col-md-5 p-2">

            <div className="mb-2">
                <Controller
                    control={control}
                    name="vote"
                    defaultValue={'0'}
                    render={({ ref }) => (
                        <Select
                            inputRef={ref}
                            classNamePrefix="form-select"
                            options={myVotes}
                            {...register('vote')}
                            defaultValue={{ value: vote.masterVoteId, label: vote.title }}
                            onChange={ ({value}) => onSelectChanged(value)  }l
                        />
                    )}
                />
            </div>

            <div className="d-lg-none d-md-none d-xxl-none">
            {/* <div className=""> */}
                <button 
                    className="btn btn-outline-primary"
                    onClick={ onViewDetail }
                    >Ver información</button>
            </div>

            <div>
                Candidatos: { vote?.candidatesToVote.length }
            </div>

        </div>

        <DetailVoteModal>
            <VoteInformation vote={{...vote}} />
        </DetailVoteModal>

        </main>
        </>
    )
}
