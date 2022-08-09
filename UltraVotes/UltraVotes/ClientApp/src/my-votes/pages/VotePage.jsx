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
        <main id="LoginPage" className="d-flex justify-content-center" style={{minHeight: '60vh'}}>

        <div className="col col-md-3 p-2">
            <h2>{vote.name}</h2>
            <div className="mb-3">
            <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
            <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
            </div>
            <div className="mb-3">
            <label htmlFor="disabledSelect" className="form-label">Disabled select menu</label>
            <select id="disabledSelect" className="form-select">
                <option>Disabled select</option>
            </select>
            </div>
            <div className="mb-3">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled />
                <label className="form-check-label" htmlFor="disabledFieldsetCheck">
                Can't check this
                </label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>

        <div className="col col-md-3 p-2">

            <div className="mb-3">
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
                            defaultValue={{ value: vote.masterVoteId, label: vote.name }}
                            onChange={ ({value}) => onSelectChanged(value)  }l
                        />
                    )}
                />
            </div>

            <div>
                <button className="btn btn-link">Ver información</button>
            </div>

            <div>
                Candidatos: { vote?.candidatesToVote.length }
            </div>

        </div>

        </main>
    )
}
