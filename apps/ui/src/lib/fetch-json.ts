export class FetchError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

const jsonType = 'application/json';

export const fetchJson = (
  input: RequestInfo,
  { headers, ...rest }: RequestInit = {}
) =>
  fetch(input, {
    headers: {
      Accept: jsonType,
      'Content-Type': jsonType,
      ...headers,
    },
    ...rest,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    const error = new FetchError('Fetch error', res);
    throw error;
  });
