export const reducer = (state = { authenticated: false }, action) => {
    switch (action.type) {
    case 'AUTH_USER':
      if(action.payload.keepLoggedIn)
        sessionStorage.setItem('token', action.payload.token);
      return { ...state, authenticated: true, user_token: action.payload.token};
    case 'UNAUTH_USER':
      sessionStorage.removeItem('token');
      return { ...state, authenticated: false };
    default:
      return state;
    }
  };
  