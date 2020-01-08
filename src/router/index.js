import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    routes
})

// 路由跳转遍历
router.beforeEach(async (to, from, next) => {
    // 可做权限验证,路由拦截
    console.log(to.path)
    next()
})

// 路由跳转完成
router.afterEach(to => {
    // 改变标题
    let title = to.meta.title
    window.document.title = title
})

export default router