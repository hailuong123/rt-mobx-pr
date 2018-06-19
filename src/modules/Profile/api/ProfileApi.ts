
import { GET, POST, PUT, DELETE } from '../../../resources/libs/Fetch';

export let changePassword = (userID: string, body: any): Promise<ITokenResponse> => {
  return PUT(`/api/user/${userID}/change-password`, body, true, { tokenUser: body.token });
};

export let getWatchList = (userID: string, body: any): Promise<ITokenResponse> => {
  return GET(`/api/user/${userID}/watch-list`, true, { tokenUser: body.token });
};

export let setWatchList = (userID: string, body: any): Promise<ITokenResponse> => {
  return POST(`/api/user/${userID}/watch-list`, body, true, { tokenUser: body.token });
};

export let editWatchList = (userID: string, watchListId: string, body: any): Promise<ITokenResponse> => {
  return PUT(`/api/user/${userID}/watch-list/${watchListId}`, body, true, { tokenUser: body.token });
};

export let deleteWatchList = (userID: string, watchListId: string, body: any): Promise<ITokenResponse> => {
  return DELETE(`/api/user/${userID}/watch-list/${watchListId}`, body, true, { tokenUser: body.token });
};
