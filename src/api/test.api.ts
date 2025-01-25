import * as api from './';

/**
 * 接口管理
 */
export default {
  // 登录
  login: (params: any) => api.post('/login', params),
}