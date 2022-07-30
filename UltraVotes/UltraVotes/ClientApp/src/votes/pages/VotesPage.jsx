import { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useMasterVoteStore } from '../../hooks';

export const VotesPage = () => {

  const { votes, startLoadingMasterVotes } = useMasterVoteStore();

  useEffect(() => {
    startLoadingMasterVotes();
  }, [])

  return (
    <main className="container">
      <section className="col-8">
      <h1 className="animate__animated animate__bounce">Votaciones</h1>
      <Link
        className='btn btn-secondary mb-4'
        to="/votaciones/nueva">
          <i className="fa-solid fa-plus"></i> 
          Agregar Votaciones
      </Link>
      <div className="row">
        {
          votes.map(vote => (
            <div key={ vote.masterVoteId } className="col-sm-6 mb-2" >
              <div className="card">
                <div className="card-header">
                  <h5 className="text-header">
                    #{ vote.masterVoteId } - { vote.name }
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <span className="badge bg-success">{ vote.status }</span>&nbsp;
                    <span>{ vote.category }</span>&nbsp;
                    <span className="badge bg-dark">{ vote.points }</span>
                  </p>
                  <i className="fas fa-clock"></i>
                  <p className="card-text">
                    <strong>Desde: </strong>{ vote.fromDate }
                  </p>
                  <p className="card-text">
                    <strong>Hasta : </strong>{ vote.toDate }
                  </p>
                  <a href="#" className="btn btn-primary">Actualizar</a>
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </section>
    </main>
  )
}
