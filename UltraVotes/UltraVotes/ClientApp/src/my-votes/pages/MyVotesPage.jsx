import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useMyVotesStore } from '../../hooks';

export const MyVotesPage = () => {
  const { user } = useSelector( state => state.auth );
  debugger;
  const { startLoadingMyVotes, isLoading } = useMyVotesStore();

  useEffect(() => {
    debugger;
    startLoadingMyVotes(user.username);
  }, [])
  
  if (!isLoading) {
    return <p>Loading...</p>
}

  return (
    <main id="LoginPage" className="d-flex align-items-center justify-content-center mt-2" style={{minHeight: '60vh'}}>
      <div className="col col-md-3 p-4 ">
        <div className="mb-4 d-flex justify-content-center col-8 m-auto" 
          style={{backgroundColor: '#FF8200'}}
          >
          <img src={process.env.PUBLIC_URL + '/img/ultra_logo_light.svg'} height="70px" width="70px" alt="logo" />
        </div>

        <h2 className="text-center mb-4">Mis Votaciones</h2>  

        <fieldset disabled>
          <legend>Por favor escoja una de las votaciones disponibles:</legend>

          <div className="row mb-3">
              <div className="col">
                  <select className="form-select">
                      <option>Escoja una votación</option>
                  </select>
              </div>
            </div>
        </fieldset>

      </div>
    </main>
  )
}
