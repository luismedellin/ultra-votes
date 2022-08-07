export const msalConfig = {
    auth: {
        clientId: "038fcc16-edac-4392-9fa3-bea0998bb48b", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/c5520394-f881-4824-b860-39f8ffd0f60f", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", //defaults to application start page
        postLogoutRedirectUri: "https://localhost:44475/",
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read", "email"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };

export const protectedResources = {
  apiTodoList: {
      todoListEndpoint: "http://localhost:5000/api/todolist",
      dashboardEndpoint: "http://localhost:5000/api/dashboard",
      scopes: ["Enter_the_Web_Api_Scope_here"],
  },
}

export const appRoles = {
    TaskUser: "TaskUser",
    TaskAdmin: "TaskAdmin"
};