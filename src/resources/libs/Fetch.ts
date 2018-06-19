import 'whatwg-fetch';
const keyFile = require('./Keys.json');

export let POST = (uri: string, data: Object, isAuth: boolean = true, options?: any) => {
  return getToken(isAuth)
    .then(token => {
      const request: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(options || {}).tokenUser || token}`
        } as any,
        body: JSON.stringify(data || {})
      };

      return getFetch(uri, request);
    });
};

export let PATCH = (uri: string, data: Object, isAuth: boolean = true, options?: any) => {
  return getToken(isAuth)
    .then(token => {
      const request: RequestInit = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(options || {}).tokenUser || token}`
        } as any,
        body: JSON.stringify(data)
      };

      return getFetch(uri, request);
    });
};

export let PUT = (uri: string, data: Object, isAuth: boolean = true, options?: any) => {
  return getToken(isAuth)
    .then(token => {
      const request: RequestInit = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(options || {}).tokenUser || token}`
        } as any,
        body: JSON.stringify(data || {})
      };

      return getFetch(uri, request);
    });
};

export let DELETE = (uri: string, data: Object = {}, isAuth: boolean = true, options?: any) => {
  return getToken(isAuth)
    .then(token => {
      const request: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(options || {}).tokenUser || token}`
        } as any,
        body: JSON.stringify(data || {})
      };

      return getFetch(uri, request);
    });
};

export let GET = (uri: string, isAuth: boolean = true, options?: any) => {
  return getToken(isAuth)
    .then(token => {
      const request: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(options || {}).tokenUser || token}`
        } as any
      };
      return getFetch(uri, request);
    });
};

function getFetch(uri: string, request: RequestInit) {
  return fetch(uri, request)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } 
      
      const errors = await response.json();
      
      throw new Error(JSON.stringify(errors));
    });
}

function getToken(isAuth: boolean): Promise<string | null> {
  sessionStorage.setItem('token', keyFile.token);
  const token = sessionStorage.getItem('token');
  if (isAuth && !token) {
    return Promise.reject(new Error('token.not.found'));
  }
  return Promise.resolve(token);
}
