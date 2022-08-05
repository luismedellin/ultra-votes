export const msalConfig = {
    auth: {
        clientId: "3de90c9a-197f-494c-a3d1-a834851dfcd4", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/c5520394-f881-4824-b860-39f8ffd0f60f", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", //defaults to application start page
        postLogoutRedirectUri: "/",
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
  };