import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../";
import { useAuthStore } from "../../hooks";


export const LoginPage = () => {
  const { instance } = useMsal();
  const { startLogin } = useAuthStore();

  const loginOffice = () =>{
    instance.loginPopup(loginRequest)
    .then((loginResponse)=> {
      console.log(loginResponse);
      console.log(loginResponse.accessToken);
      console.log(loginResponse.account.username);

      const request = {
          ...loginRequest,
          account: loginResponse.account,
          scopes: ["api://0b0c98d7-edfe-47f5-9e78-0730ae7bf194/access_as_user"]
      };

      instance.acquireTokenSilent(request).then((response2) => {
        startLogin(response2);
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
          });
      });

    })
    .catch(e => {
        console.error(e);
    });
  }

  return (
    <main id="LoginPage" className="d-flex align-items-center justify-content-center mt-2" style={{minHeight: '60vh'}}>
      <div className="col col-md-3 p-4 ">
      
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
              onClick={ loginOffice }
              // style={{backgroundColor:"#eb3c00"}}
              >
              <i className="fab fa-microsoft text-danger"></i>&nbsp;
              Iniciar sesión con Office 365</button>
        </div>

        <hr />

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="mail">Correo Electrónico</label>
          <input type="email" id="mail" className="form-control" />
          
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <div className="row mb-4">
          <div className="col d-flex ">
            <div className="form-check">
              <label className="form-check-label" htmlFor="rememberme"> Recordarme </label>
              <input className="form-check-input" type="checkbox" value="" id="rememberme" defaultChecked />
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
