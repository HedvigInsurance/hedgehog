export default {
  baseUrl: '/api/',
  login: {
    login: {
      method: 'get',
      url: 'settings/me',
    },
    authSuccess: {
      method: 'post',
      url: 'settings/auth-success',
    },
  },
  payout: {
    create: {
      url: 'payout',
      method: 'post',
    },
  },
}
