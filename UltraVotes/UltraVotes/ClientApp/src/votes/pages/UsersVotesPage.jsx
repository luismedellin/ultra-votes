import { useParams } from 'react-router-dom';
import { VotesMenu } from '../';

export const UsersVotesPage = () => {

  const { id } = useParams();

  return (
    <>
      <main className="container">
        <div className="justify-content-md-center d-flex">
          <VotesMenu />
          <section className="card col-8">
                <div className="card-body">
                <h2>Usuarios de la votación:</h2>
                </div>

          </section>
        </div>
      </main>

    </>
  )
}
