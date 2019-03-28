export function makeRequest(url, options) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await window.fetch(url, options);

    } catch (connectionError) {
      reject({ status: 500, message: 'Server unavailable' });
      return;
    }
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.indexOf('json') !== -1;

    if (response.ok) {
      if (isJson) {
        const json = await response.json();
        resolve([json, response]);
      } else {
        resolve([null, response]);
      }
    } else {
      const error = { status: response.status };
      reject([error, response]);
    }
  });
}

export default function ajax(url, token, contentType) {
  const options = {};
  options.headers = new Headers();

  if (token) {
    options.headers.append('authorization', `Bearer ${token}`);
  }

  return {
    get() {
      options.method = 'GET';
      return makeRequest(url, options);
    },
    post(body) {
      options.method = 'POST';
      if (contentType === 'json') {
        options.headers.append('Content-Type', 'application/json');
        options.body = JSON.stringify(body);
      } else if (contentType === 'file') {
        const formData = new FormData();
        options.headers.append('enctype', 'multipart/form-data');
        formData.append('file', body);
        options.body = formData;
      }
      return makeRequest(url, options);
    },
  };
}
