<template>
  <div class="shop">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="url in urls" :key="url">
        <el-image :src="url"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>
    <el-card v-for="item in cardList" :key="item">
      商品 {{item}}
    </el-card>
  </div>
</template>
<script>
import shop1 from '@/assets/images/home.jpeg'
import shop2 from '@/assets/images/shop1.jpeg'
import shop3 from '@/assets/images/shop2.jpeg'

export default {
  name: 'shop',
  data() {
    return {
      urls: [
        shop1,
        shop2,
        shop3
      ],
      isShow: false,
      cardList: 10,
      websock: null
    }
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket() { // 初始化weosocket
      const wsuri = process.env.VUE_APP_URL + 'home'
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen()
      this.websock.onmessage = this.websocketonmessage()
      this.websock.onerror = this.websocketonerror()
      this.websock.onclose = this.websocketclose()
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      let actions = {
        sessionId: 'bdsSc1SD0565cxAs',
        userId: 36
      }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      console.log(redata)
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) { // 关闭
      console.log('断开连接', e)
    },
  }
}
</script>
