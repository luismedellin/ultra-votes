import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select'

import { useMyVotesStore } from '../../hooks';

export const MyVotesPage = () => {
  const { user } = useSelector( state => state.auth );
  const { startLoadingMyVotes, isLoading, myVotes } = useMyVotesStore();


  const { 
    register,
    control
} = useForm();


  useEffect(() => {
    // if(user.username){
    //   startLoadingMyVotes(user.username);
    // }
    startLoadingMyVotes('luiseduardo1218@gmail.com');
  }, [user])

  const onSelectChanged = (value) => {
    
  }
  
  if (!isLoading) {
    return <p>Loading...</p>
  }
  console.log(myVotes)

  return (
    <main id="LoginPage" className="d-flex align-items-center justify-content-center mt-2" style={{minHeight: '60vh'}}>
      <div className="col col-md-3 p-4 ">
        <div className="mb-4 d-flex justify-content-center col-8 m-auto" 
          style={{backgroundColor: '#FF8200'}}
          >
          <img src={process.env.PUBLIC_URL + '/img/ultra_logo_light.svg'} height="70px" width="70px" alt="logo" />
        </div>

        <h2 className="text-center mb-4">Mis Votaciones</h2>  

        <fieldset>
          <legend>Por favor escoja una de las votaciones disponibles:</legend>

          <div className="row mb-3">
              <div className="col">
                  {/* <select className="form-select">
                      <option>Escoja una votación</option>
                  </select> */}
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
                              defaultValue={{ value: 0, label: 'Seleccione una votación' }}
                              onChange={ ({value}) => onSelectChanged(value)  }l
                          />

                      )}
                  />
              </div>
            </div>
        </fieldset>

      </div>
    </main>
  )
}
