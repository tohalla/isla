export const validateEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(email);

export const getValueFromQueryString = (string, key) => {
  string = string.substring(string.indexOf('?'));
  string = string.substring(string.indexOf(key));
  const next = string.indexOf('&');
  return string.substring(key.length + 1, next > 0 ? next : string.length);
};

export const getPercentage = (value, total) => (Math.floor((value / total) * 100));
