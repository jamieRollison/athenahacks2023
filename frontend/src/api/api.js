import api from "../axios";
import { Buffer } from "buffer";

const backendUrl = "http://localhost:3000/api/";

export const getAccessToken = async () => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(import.meta.env.VITE_SPOTIFY_CLIENT_ID + ':' + import.meta.env.VITE_SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type':'application/x-www-form-urlencoded'
    },
    data: {
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    } 
  };
  
  return await api.post(authOptions.url, {}, {params: {'grant_type': 'client_credentials', json:true}, headers: authOptions.headers}).then((res) => {
   return res.data.access_token
  });
}

export const getLikes = async (postId) => {
  const requestString = `/likes/${postId}`;

  const res = await api.get(backendUrl + requestString);

  return res.data;
};

export const removeLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`;

  const res = await api.delete(backendUrl + requestString);

  return res.data;
};

export const addLike = async (postId, userId) => {
  const requestString = `likes/${postId}/${userId}`;

  const res = await api.post(backendUrl + requestString).then((res) => {
    return res;
  });

  return res.data;
};

export const songSearch = async (query) => {
  console.log(query);
  const requestString = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`;
  const res = await api.get(requestString, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});

  return res.data.tracks.items;
}

export const findOrCreateUser = async (patientInfo) => {
  const requestString = `/users`;
  const res = await api.post(backendUrl + requestString, patientInfo);
  return res.data;
};
