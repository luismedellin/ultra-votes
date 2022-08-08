import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VotesMenu } from '../'

import { useMasterDataStore, useMasterVoteStore } from "../../hooks";


export const SummaryVotePage = () => {
    const { id } = useParams();
    const { getDefaultMasterVote } = useMasterVoteStore();
    const [masterVote, setMasterVote] = useState(null);

    useEffect(() => {
        const load = async() => {
           const myMasterVote = await getDefaultMasterVote(id);
           setMasterVote(myMasterVote);
        }
    
        load();
     }, [id]);

     if (!masterVote){
        return <p>Cargando...</p>
      }

  return (
    <main className="container">
        <div className="d-flex justify-content-md-center">
            <VotesMenu />

            <section className="card col-8">
                <div className="card-body">
                    <h2 className="d-flex justify-content-between">
                        <div>
                            Nombre votación: <small className="text-muted">{masterVote.name}</small>
                        </div>
                        <div className="col-2">
                            <span className="badge bg-success">{ masterVote.status }</span>
                        </div>
                    </h2>
                    
                    <div>
                    <fieldset disabled>
                        <legend>Resumen de votación:</legend>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría: </label>
                                <select className="form-select">
                                    <option>{masterVote.category}</option>
                                </select>
                            </div>
                            
                            <div className="col-6">
                                <label htmlFor="restriction" className="form-label">Restricción por votación: *</label>
                                <select className="form-select">
                                    <option>{masterVote.restriction}</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                            <label htmlFor="category" className="form-label">Puntos: </label>
                            <input type="text" className="form-control" value={masterVote.points} />
                            </div>
                            
                            <div className="col-6">
                                <label htmlFor="restriction" className="form-label">Número de candidatos:</label>
                                <input type="text" className="form-control" value={masterVote.candidates} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                            <label htmlFor="category" className="form-label">Desde: </label>
                            <input type="text" className="form-control" value={masterVote.fromDateText} />
                            </div>
                            
                            <div className="col-6">
                                <label htmlFor="restriction" className="form-label">Hasta:</label>
                                <input type="text" className="form-control" value={masterVote.toDateText} />
                            </div>
                        </div>
                        
                        <hr/>
                        <h3>Estadisticas</h3>
                        <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Usuarios Participantes</th>
                                <th>Votantes</th>
                                <th>Pendientes</th>
                                <th>Notificaciones enviadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{masterVote.users.length}</td>
                                <td>{masterVote.voters}</td>
                                <td>{masterVote.users.length - (masterVote.voters)}</td>
                                <td>{masterVote.sentNotifications}</td>
                            </tr>
                        </tbody>
                        </table>
                        
                    </fieldset>
                    </div>
                    
                </div>
            </section>
        </div>
    </main>
  )
}
