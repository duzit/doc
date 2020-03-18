## 微前端改造

### 前端门户 portal
* public\pi-monorepo.min.js
  实例化及全局资源注册
* public\index.html

  > 引入 public\pi-monorepo.min.js

  ```
  <script src="<%= BASE_URL %>pi-monorepo.min.js"></script>
  ```

  > 引入前端项目入口文件

  ```
  <% if (NODE_ENV === "production") { %>
  <script src="/jobs/js/monorepo.js"></script>
  <% } else { %>
  <script src="/jobs/monorepo.js"></script>
  <script src="/quality/monorepo.js"></script>
  <% } %>
  ```

* src\main.js

  > 引用全局方法 window.g_monorepo，初始化实例及资源

  ```
  window.g_monorepo.app.register(
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(Layout)
    })
  );

  window.g_monorepo.app.bootstrap();
  ```

  > 全局方法注册，例如判断按钮权限getUserElementRule()，前端项目使用

* src\utils\request.js 导出全局的axios，拦截器在门户做
`window.gRequest = service`

* 公共样式统一定义在前端门户
* 菜单加载，配置文件或api请求
* 环境变量，以env.js为例，需要包含所有前端项目需要的环境变量

### 前端项目 project
* jobs\vue.config.js

  > 引入monorepo.config，修改打包方式，输出项目入口文件

  ```
  const monorepoConfig = require('./monorepo.config')
  monorepoConfig.chainWebpack(config, monorepoConfig.monorepoDir);
  config.entry('monorepo').add('./src/monorepo.entry.js'); 项目入口文件
  ```

* 新增文件 monorepo.entry.js，注册路由，store等资源

  ```
  window.g_monorepo.project.register({
    routes: [
      {
        path: '/workorder/salesOrder',
        component: () => import (/* webpackChunkName: "jobs-index" */ '@/views/workorder/index'),
        name: '销售订单'
      },
    ],
    stores: import('./store/modules'),
    bootstrap: import(/* webpackChunkName: "bootstrap" */ './icons/index'),
  });
  ```
* jobs\src\store\modules.js 引入项目中用到的vuex，注册到门户，
  注册时需区分项目，例如jobs，quality。取值时this.$store.state.quality.flag。

  ```
  import jobs from './jobs'

  export default {
    jobs,
  }
  ```

* svg 注册
  `bootstrap: import(/* webpackChunkName: "bootstrap" */ './icons/index')`

* jobs\src\utils\request.js
  api请求使用门户的全局axios
  `export default window.gRequest`

* 全局注册的组件改为按需引用

### 发布
* 门户的index.html引用项目打包后的入口文件，目前发布需手动改一下入口文件名称，
  后续会改为用脚本自动替换。scripts\build.sh