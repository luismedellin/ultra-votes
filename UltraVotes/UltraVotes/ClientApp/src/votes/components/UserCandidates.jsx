import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCandidateStore } from '../../hooks';

export const UserCandidates = React.memo(() => {
    const { id } = useParams();
    const { candidates, getCandidates} =  useCandidateStore();

    useEffect(() => {
      getCandidates(id);
    }, [])

    return (
        <aside className="card">
            <div className="card-body">
                <h2 className="text-center">Candidatos {candidates.length}</h2>
                <div>
                
                {
                    candidates.map(candidate => (
                        <div key={candidate.candidateId} className="card d-flex flex-row mb-3 p-2">
                            <div style={{width: "5rem"}}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div style={{width: "15rem"}}>
                                <div>{candidate.fullName}</div>
                                <div>{candidate.departmentId}</div>
                                <div>{candidate.areaId}</div>
                            </div>
                            <div style={{width: "5rem"}}>
                                <div className="d-flex justify-content-end align-items-center ps-3">
                                    <button className="btn btn-primary btn-sm me-2 ">
                                        <i className="fa fa-solid fa-user-pen" aria-hidden="true"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                </div>
            </div>
        </aside>
    )
})