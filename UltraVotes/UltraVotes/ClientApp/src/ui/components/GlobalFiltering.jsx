import React from 'react'

export const GlobalFiltering = ({ filter, setFilter, placeholder = "Ingresa algun texto para realizar la busqueda" }) => {

    const onChange = ({target}) => {
        setFilter(target.value)
    }

  return (
    <>
        {/* <span>
            Buscar: {' '}
            <input 
                value= {filter || ''}
                onChange={({target}) => setFilter(target.value)}
            />
        </span> */}

        
    <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
            <div className="search d-flex">
            <i className="fa fa-search"></i>
            <input type="text" 
                className="form-control" 
                placeholder={placeholder}
                onChange={onChange}
                />
            {/* <button className="btn btn-primary">Buscar</button> */}
            </div>
        </div>
    </div>
    </>
    
  )
}
