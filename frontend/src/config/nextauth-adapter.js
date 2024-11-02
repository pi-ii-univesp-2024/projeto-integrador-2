// import axios from "axios";

const BaseURL = "http://localhost:8000";

// export async function makeAuthRequest(endpoint, data, method = "POST") {
//   try {
//     const response = await axios({
//       url: `${BaseURL}/api/${endpoint}`,
//       method: method,
//       data: data,
//       withCredentials: true,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

import axios from 'axios';

export default function DRFAdapter(req, res) {
  return {
    async createUser(user) {
      try {
        const backendUser = await makeAuthRequest(
          'user',
          {
            name: user.name,
            email: user.email,
            email_verified: !!user.emailVerified,
            image: user.image,
            invite_token: req.cookies.invite_token,
          },
          'POST'
        );

        return backendUser;
      } catch (err) {
        console.log('Error creating user');
        console.log(err.response.data.extra.fields);
        throw err;
      }
    },
    async getUser(id) {
      try {
        let user = await makeAuthRequest('user', {
          id: id,
        });

        return user;
      } catch (err) {
        //console.log(err);
        return;
      }
    },
    async getUserByEmail(email) {
      try {
        let user = await makeAuthRequest('user', {
          email: email,
        });

        return user;
      } catch (err) {
        //console.log(err);
        return;
      }
    },
    async getUserByAccount({providerAccountId, provider}) {
      try {
        let user = await makeAuthRequest('account', {
          provider_id: provider,
          account_id: providerAccountId,
        });

        return user;
      } catch (err) {
        //console.log(err);
      }
    },
    async updateUser(user) {
      try {
        let updatedUser = await makeAuthRequest(
          'user',
          {
            id: user.id,
            name: user.name,
            email: user.email,
            email_verified: true,
            image: user.image,
          },
          'PUT'
        );
        return updatedUser;
      } catch (err) {
        return;
      }
    },
    async linkAccount(account) {
      console.log('linkAccount', account);
      try {
        await makeAuthRequest(
          'account',
          {
            user_id: account.userId,
            provider_id: account.provider,
            provider_type: account.type,
            provider_account_id: account.providerAccountId,
            access_token: account.access_token,
            access_token_expires: new Date(
              account.expires_at * 1000
            ).toISOString(),
          },
          'POST'
        );

        return account;
      } catch (err) {
        console.log('Error linking account');
        throw err;
      }
    },
    async createSession({userId}) {
      console.log('createSession', userId);
      try {
        let sessionAndUser = await makeAuthRequest(
          'session',
          {
            user_id: userId,
          },
          'POST'
        );

        return toAdapterSession(sessionAndUser.session);
      } catch (err) {
        console.log('Error creating session');
        throw err;
      }
    },
    async getSessionAndUser(sessionToken) {
      try {
        let sessionAndUser = await makeAuthRequest('session', {
          session_id: sessionToken,
        });

        return {
          session: toAdapterSession(sessionAndUser.session),
          user: sessionAndUser.user,
        };
      } catch (err) {
        //console.log(err);
        return;
      }
    },
    async updateSession({sessionToken}) {
      console.log('updateSession', sessionToken);
      return;
    },
    async deleteSession(sessionToken) {
      try {
        await makeAuthRequest(
          'session',
          {
            session_id: sessionToken,
          },
          'DELETE'
        );

        return;
      } catch (err) {
        console.log('Error deleting session');
        throw err;
      }
    },
    async createVerificationToken(verificationToken) {
      return verificationToken;
    },
    async useVerificationToken(verificationToken) {
      const {identifier, token} = verificationToken;
      try {
        const backendToken = await makeAuthRequest(
          'verification-token',
          {
            identifier: identifier,
            token: token,
          },
          'DELETE'
        );
        backendToken.expires = backendToken.expires_at;
        return backendToken;
      } catch (err) {
        return null;
      }
    },
  };
}

export async function makeAuthRequest(url, data, method = 'GET') {
  let fetchData = {
    method: method,
    data: data,
    url: 'http://localhost:3000/' + 'auth/' + url + '/',
    headers: {
      'X-NEXTAUTH-TOKEN': 'secretkey',
    },
  };
  const response = await axios(fetchData);
  return await response.data;
}

function toAdapterSession(backendSession) {
  return {
    sessionToken: backendSession.token,
    userId: backendSession.user_id,
    expires: new Date(backendSession.expires),
  };
}
