<template>
    <el-container class="app_wrapper">
        <el-container class="app_content">
          <section class="app_content_out">
            <!-- 导航 -->
            <nav-header></nav-header>
            <!-- 内容 -->
            <section class="app_main">
              <!-- 主体视图 -->
              <router-view :key="key"></router-view>
              <!-- 返回顶部 -->
              <section class="to_top" @click="toTop" v-if="isShow">
                <img src="@/assets/icon/toTop.png" alt="顶部">
              </section>
            </section>
            <!-- 底部 -->
            <nav-footer></nav-footer>
          </section>
        </el-container>
    </el-container>
</template>

<script>

export default {
  name: 'layout',
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    // 监听
    window.addEventListener('scroll', this.handleShow)
  },
  destroyed() {
    // 销毁
    window.removeEventListener('scroll', this.handleShow)
  },
  components: {
    NavHeader: () => import('./navHeader'),
    NavFooter: () => import('./navFooter')
  },
  methods: {
    // 回到顶部
    toTop() {
      let time = setInterval(function () {
        document.documentElement.scrollTop = document.documentElement.scrollTop - 50
        if (document.documentElement.scrollTop === 0) {
          clearInterval(time)
        }
      }, 1)
    },
    // 控制按钮显示隐藏
    handleShow() {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 500) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>