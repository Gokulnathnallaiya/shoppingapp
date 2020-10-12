
import * as queryString from 'query-string';

const stringifiedParams = queryString.stringify({
  client_id:'187895093455-eqss0arll7079s387dhojlqibovcs322.apps.googleusercontent.com',
  redirect_uri: 'http://react-ecom-app.herokuapp.com/',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;