import {camelizeKeys} from 'humps';
import fetch from 'isomorphic-fetch';

import config from '../config';
import {CALL_API} from '../constants';

const API_ROOT = `http://${config.api.host}:${config.api.port}/api/`;
const methods = ['GET', 'POST', 'PUT', 'DELETE'];

const callApi = (endpoint, config = {}) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ?
    API_ROOT + endpoint : endpoint;

  let {body, method = 'GET', headers} = config;

  if (typeof body === 'object') {
    body = JSON.stringify(body);
  }

  if (methods.indexOf(method.toUpperCase()) === -1) {
    throw new Error(
      `Invalid method ${method}, expected it to be one of the ` +
      `following: ${methods.toString()}`
    );
  }

  return fetch(fullUrl,
    {
      body, method,
      headers: Object.assign({
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, headers)
    }
  )
    .then(response =>
      response.json().then(json => ({json, response}))
    )
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      if (typeof config.onSuccess !== 'undefined') {
        config.onSuccess();
      }
      return Object.assign({}, camelizeKeys(json));
    })
    .catch(err => {
      console.log(err);
      if (typeof config.onFailure !== 'undefined') {
        config.onFailure();
      }
    });
};

export default store => dispatch => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return dispatch(action);
  }

  let {endpoint, config} = callAPI;
  const {types} = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  dispatch(actionWith({type: requestType}));

  return callApi(endpoint, config).then(
    response => dispatch(actionWith({
      response,
      type: successType
    })),
    error => dispatch(actionWith({
      type: failureType,
      error: error.message || 'error'
    }))
  );
};
