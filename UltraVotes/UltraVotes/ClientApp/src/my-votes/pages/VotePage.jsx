import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

import { useMyVotesStore } from '../../hooks';

export const VotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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


     if(!vote){
        return <p>Loading...</p>
    }

    return (
        <main id="LoginPage" className="container mx-auto border row justify-content-md-center" style={{minHeight: '60vh'}}>

        <div className="col col-md-3 p-3 d-none d-md-block">
            <h2 className="text-center">{vote.title}</h2>
            
            <div className="mb-2 text-center">
                <p className="fw-normal">{vote.subtitle}</p>
            </div>

            <div className="mb-3 text-center">
                <i className="fas fa-trophy text-warning fs-1 text-centerc animate__animated animate__fadeInDown"></i>
            </div>

            <div className="mb-3 row ">
                <div>
                    <i className="fas fa-clock"></i> &nbsp;
                    Fechas: 
                </div>
                <div className='fw-lighter'>
                    {vote.fromDateText} - {vote.toDateText}
                </div>
            </div>

            <div className="mb-3 row">
                <div className="col">
                    <div>Puntos:</div>
                    <span className="badge bg-secondary">{ vote.points }</span>
                </div>
                <div className="col">
                    <div>Candidatos:</div>
                    <span className="badge bg-secondary">{ vote.candidates }</span>
                </div>
                
            </div>

            

        </div>

        <div className="col col-md-4 p-2">

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
                <button className="btn btn-outline-primary">Ver información</button>
            </div>

            <div>
                Candidatos: { vote?.candidatesToVote.length }
            </div>

        </div>

        </main>
    )
}
