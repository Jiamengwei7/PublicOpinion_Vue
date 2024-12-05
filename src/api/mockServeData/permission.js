import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === '段春雨' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home', // 命名路由
              label: '首页',
              icon: 's-home',
              url: 'home/index.vue'
            },
            {
              path: '/dataset',
              name: 'dataset', // 命名路由
              label: '数据集展示',
              icon: 's-home',
              url: 'dataset/index.vue'
            },
            {
              path: '/extraction',
              name: 'extraction', // 命名路由
              label: '事件抽取',
              icon: 's-home',
              url: 'extraction/index.vue'
            },
            {
              path: '/relation',
              name: 'relation', // 命名路由
              label: '关系抽取',
              icon: 's-home',
              url: 'relation/index.vue'
            },
            {
              path: '/fusion',
              name: 'fusion', // 命名路由
              label: '表征融合',
              icon: 's-home',
              url: 'fusion/index.vue'
            },
            {
              path: '/knowledge',
              name: 'knowledge', // 命名路由
              label: '知识图谱',
              icon: 's-home',
              url: 'knowledge/index.vue'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
