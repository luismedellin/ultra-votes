import { useEffect } from 'react'
import { useMasterVoteStore } from '../../hooks';

export const VotesPage = () => {

  const { votes, startLoadingMasterVotes } = useMasterVoteStore();

  useEffect(() => {
    startLoadingMasterVotes();
  }, [])

  return (
    <main className="container">
      <section className="col-6">
      <h1 className="animate__animated animate__bounce">Votaciones</h1>
      <div class="row">
        {
          votes.map(vote => (
            <div key={ vote.masterVoteId } className="col-sm-8" >
              <div className="card">
                <div className="card-header">
                  <h5 className="text-header">
                    #{ vote.masterVoteId } - { vote.name }
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <span class="badge bg-success">{ vote.status }</span>
                    <span>{ vote.masterVoteCategoryId }</span>
                    <span class="badge bg-dark">{ vote.points }</span>
                  </p>
                  <i class="fas fa-clock"></i>
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
