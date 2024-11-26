const makePost = (url: string, body: string, options: object) => {
  const headers = options.headers || {};
  return fetch(url, {
    body,
    headers,
    method: "POST",
  }).then((res) => {
    if (res.statusText === "No Content") {
      return res;
    }
    return res.json();
  });
};

const makeJSONPost = (url: string, data: any, options: { headers: {} }) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";

  return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
  const url = `https://gestionbibliotecaingweb20242.us.auth0.com/oauth/token`;
  const headers = { "content-type": "application/json" };
  const body = {
    client_id: "PCpqLXCjPiXHKvpNNaNBWYcQeIl89jJf",
    client_secret:
      "I6STa5BtRwetfpmgTfdtKA0VRj7cjAinVR0UN14fZ3Oye1gsukkQzdaKf-EYAYri",
    audience: "https://gestionbibliotecaingweb20242.us.auth0.com/api/v2/",
    grant_type: "client_credentials",
  };
  return makeJSONPost(url, body, { headers });
};

export const createAuth0User = async (
  data: any,
  token: any,
  tokenType: any
) => {
  const url = `https://gestionbibliotecaingweb20242.us.auth0.com/api/v2/users`;
  const headers = {
    Authorization: `${tokenType} ${token}`,
  };
  const body = data;
  return makeJSONPost(url, body, { headers });
};

export const createUser = (data: any) => {
  const url = `/api/auth0`;
  const body = { data };
  return makeJSONPost(url, body, { headers: {} });
};
