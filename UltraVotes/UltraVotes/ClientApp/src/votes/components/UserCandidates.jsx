import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCandidateStore } from '../../hooks';

export const UserCandidates = React.memo(({openModal}) => {
    const { id } = useParams();
    const { candidates, getCandidates, onDeleteCandidate, selectCandidate } =  useCandidateStore();

    useEffect(() => {
      getCandidates(id);
    }, [])

    const chooseCandidate = (candidate) => {
        selectCandidate(candidate);
    }

    const deleteCandidate = (candidate) => {
        Swal.fire({
            title: `Deseas eliminar a <strong>${candidate.name}</strong> de la votación?`,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: "#dc3545",   
            cancelButtonColor: "#adb5bd",   
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap me-5 btn btn-primary',
              confirmButton: 'order-2 btn btn-danger',
            }
          }).then(async(result) => {
            if (result.isConfirmed) {
                await onDeleteCandidate(candidate.candidateId);
                Swal.fire('Candidato eliminado', '', 'success')
            }
          })
    }

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
                                    <button 
                                        className="btn btn-primary btn-sm me-2 "
                                        onClick={ () => openModal(candidate) }
                                        >
                                        <i className="fa fa-solid fa-user-pen" aria-hidden="true"
                                        
                                        ></i>
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={ () => deleteCandidate(candidate) }
                                        >
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