import React from 'react'

export const VoteInformation = ({vote}) => {
  return (
    <>
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
                {
                    vote.points > 0 && 

                    <div className="col">
                        <div>Puntos:</div>
                        <span className="badge bg-secondary">{ vote.points }</span>
                    </div>
                }
                
                {
                    vote.candidates > 0 && 
                    <div className="col">
                        <div>Candidatos:</div>
                        <span className="badge bg-secondary">{ vote.candidates }</span>
                    </div>
                }
                
            </div>
    </>
  )
}
