const makePost = (url: string, body: string, options: object) => {
  // @ts-expect-error fix type
  const headers = options.headers || {};
  return fetch(url, {
    body,
    headers,
    method: 'POST',
  }).then((res) => {
    if (res.statusText === 'No Content') {
      return res;
    }
    return res.json();
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const makeJSONPost = (url: string, data: any, options: { headers: {} }) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  // @ts-expect-error fix type
  headers['Content-Type'] = 'application/json';

  return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
  const options = {
    method: 'POST',
    headers: {
      cookie:
        'did=s%253Av0%253Af8a7fa92-3ffa-40e5-9e0d-15b62a22567f.0e6Zw6sNTp6Zum0qH6dBXj8N0BGf06z%252Btiv4AedHUHY; did_compat=s%253Av0%253Af8a7fa92-3ffa-40e5-9e0d-15b62a22567f.0e6Zw6sNTp6Zum0qH6dBXj8N0BGf06z%252Btiv4AedHUHY',
      'Content-Type': 'application/json',
    },
    body: '{"client_id":"PCpqLXCjPiXHKvpNNaNBWYcQeIl89jJf","client_secret":"I6STa5BtRwetfpmgTfdtKA0VRj7cjAinVR0UN14fZ3Oye1gsukkQzdaKf-EYAYri","audience":"https://gestionbibliotecaingweb20242.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const res = fetch(
    'https://gestionbibliotecaingweb20242.us.auth0.com/oauth/token',
    options
  ).then((res) => res.json());
  return res;
};

export const createAuth0User = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenType: any
) => {
  const url = `https://gestionbibliotecaingweb20242.us.auth0.com/api/v2/users`;
  const headers = {
    Authorization: `${tokenType} ${token}`,
  };
  const body = data;
  return makeJSONPost(url, body, { headers });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = (data: any) => {
  const url = `/api/auth0`;
  const body = { data };
  return makeJSONPost(url, body, { headers: {} });
};
