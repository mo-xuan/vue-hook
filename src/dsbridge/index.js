import dsbridge from 'dsbridge'


export const getAppEnvironment = () => {
  const obj = dsbridge.call('getAppEnvironment') || {}
  return typeof obj == 'string' ? JSON.parse(obj) : obj
}


export const getToken = () => {
  return dsbridge.call('getToken')
}
