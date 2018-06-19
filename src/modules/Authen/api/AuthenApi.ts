import { POST, GET, PATCH } from '../../../resources/libs/Fetch';

export let signIn = (body: any): Promise<IListResponse> => {
  return POST(`/api/user/login`, body, true);
};

export let signUp = (body: any): Promise<IListResponse> => {
  return POST(`/api/user`, body, true);
};

export let forgotPass = (email: string): Promise<IListResponse> => {
  return GET(`/api/user/forgot?email=${email}`);
};

export let resetPass = (body: any): Promise<IListResponse> => {
  return PATCH(`/api/user/reset`, body, true);
};

export let verifyUser = (token: string): Promise<IListResponse> => {
  return GET(`/api/user/verify?token=${token}`);
};

export let resendVerifyUser = (username: string): Promise<IListResponse> => {
  return GET(`api/user/${username}/verify`);
};
