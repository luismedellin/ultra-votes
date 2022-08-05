export const LoginPage = () => {
  return (
    <main className="d-flex align-items-center justify-content-center mt-2" style={{minHeight: '60vh'}}>
      <div className="col col-md-3 border p-4 ">
      
        <form>
        <div className="mb-4 d-flex justify-content-center col-8 m-auto" 
          style={{backgroundColor: '#FF8200'}}
          >
          <img src={process.env.PUBLIC_URL + '/img/ultra_logo_light.svg'} height="70px" width="70px" alt="logo" />
        </div>
        
        <h2 className="text-center mb-4">Iniciar sesión:</h2>

        <div className="d-flex justify-content-center">
          <button type="button" 
              className="btn btn-outline-danger mb-4" 
              // style={{backgroundColor:"#eb3c00"}}
              >
              <i className="fab fa-microsoft text-danger"></i>&nbsp;
              Iniciar sesión con Office 365</button>
        </div>

        <hr />

        <div className="form-outline mb-4">
          <label className="form-label" for="mail">Correo Electronico</label>
          <input type="email" id="mail" className="form-control" />
          
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="password">Contraseña</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <div className="row mb-4">
          <div className="col d-flex ">
            <div className="form-check">
              <label className="form-check-label" for="rememberme"> Recordarme </label>
              <input className="form-check-input" type="checkbox" value="" id="rememberme" checked />
            </div>
          </div>

          <div className="col ps-0">
            <a href="#!">Recuperar contraseña</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-primary btn-block mb-4">Iniciar sesión</button>
        </div>

        {/* <hr />

        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div> */}
      </form>
      </div>
    </main>
  );
};
