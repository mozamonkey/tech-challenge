import { 
  FETCHED_USER, 
  FETCH_USER_START, 
  FETCH_USER_ERROR, 
  RESET_USER,

  FETCHED_USER_ALBUM,
  FETCH_USER_ALBUM_START,
  FETCH_USER_ALBUM_ERROR,

  FETCH_USER_ALBUM_PHOTOS_ERROR,
  FETCHED_USER_ALBUM_PHOTOS,
  FETCH_USER_ALBUM_PHOTOS_START
} from './types';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export function startFetchingUser() {
  return({type: FETCH_USER_START});
}

export function startFetchingAlbum() {
  return({type: FETCH_USER_ALBUM_START});
}

export function startFetchingAlbumPhotos() {
  return({type: FETCH_USER_ALBUM_PHOTOS_START});
}

export function GetUsers()
{
  const uri = `${BASE_URL}/users`;

  let postFetchParams = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
  };

  return fetch(uri, postFetchParams)
    .then(httpResponse => {
      return httpResponse.json();
    })
    .then(data => {
      if (!data) {
        // now call our reducers and pass in the type of FETCH_USER_ERROR
        // the payload will be the message
        return({type: FETCH_USER_ERROR, payload: "Failed to fetch users"});
      }

      // the response will contain email, firstName, lastName, token
      // and userNumber
      return({type: FETCHED_USER, payload: data});
    });
}

export function GetUserAlbum(userId)
{
  const uri = `${BASE_URL}/albums?userId=${userId}`;

  let postFetchParams = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
  };

  return fetch(uri, postFetchParams)
    .then(httpResponse => {
      return httpResponse.json();
    })
    .then(data => {
      if (!data) {
        return({type: FETCH_USER_ALBUM_ERROR, payload: "Failed to fetch user albums"});
      }

      return({type: FETCHED_USER_ALBUM, payload: data});
    });
}

export function GetUserAlbumPhotos(albumId)
{
  const uri = `${BASE_URL}/photos?albumId=${albumId}`;

  let postFetchParams = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
  };

  return fetch(uri, postFetchParams)
    .then(httpResponse => {
      return httpResponse.json();
    })
    .then(data => {
      if (!data) {
        return({type: FETCH_USER_ALBUM_PHOTOS_ERROR, payload: "Failed to fetch user albums photos"});
      }

      return({type: FETCHED_USER_ALBUM_PHOTOS, payload: data});
    });
}