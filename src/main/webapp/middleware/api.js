import {camelizeKeys} from 'humps';
import fetch from 'isomorphic-fetch';
import {fromJS} from 'immutable';

import config from '../config';
import {CALL_API} from '../constants';

const API_ROOT = `http://${config.api.host}:${config.api.port}/`;
const methods = ['GET', 'POST', 'PUT', 'DELETE'];

const callApi = (endpoint, config) => {
  let {body, method = 'GET', apiPrefix = 'api/', headers, params} = config;
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ?
    API_ROOT + apiPrefix + endpoint : endpoint;

  if (params) {
    fullUrl += '?';
    for (let key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        if (Array.isArray(params[key])) {
          params[key].forEach(value => { // eslint-disable-line
            fullUrl += `${key}=${value}&`;
          });
        } else {
          fullUrl += `${key}=${params[key]}&`;
        }
      }
    }
    fullUrl = fullUrl.slice(0, -1);
  }
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
      body, method, params,
      headers: Object.assign({
        'Authorization': localStorage.token,
        'Content-Type': 'application/json'
      }, headers)
    }
  )
    .then(response => response.json()
      .then(json => response.ok ? json : Promise.reject(json))
      .catch(error => response.ok ? {} : Promise.reject(error))
    )
    .then(json => {
      return Array.isArray(json) ? json : Object.assign({}, camelizeKeys(json));
    })
    .catch(error => Promise.reject(error));
};

export default store => dispatch => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return dispatch(action);
  }
  let {endpoint, config = {}} = callAPI;

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
  dispatch(actionWith({
    type: requestType,
    response: fromJS({isFetching: true})
  }));

  return callApi(endpoint, config)
    .then(response => {
      dispatch(actionWith({
        response: fromJS(response),
        type: successType
      }));
      if (typeof config.onSuccess !== 'undefined') {
        return config.onSuccess(response);
      }
    })
    .catch(error => {
      dispatch(actionWith({
        type: failureType,
        response: error
      }));
      if (typeof config.onFailure !== 'undefined') {
        return config.onFailure(error);
      }
    });
};
