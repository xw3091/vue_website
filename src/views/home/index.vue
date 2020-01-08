<template>
  <div class="home">
    <div id="container"></div>
    <el-divider></el-divider>
    <div v-if="isShow">
      <el-card v-for="item in cardList" :key="item.index">
        <el-image :src="item.src"></el-image>
        <p>{{item.title}}</p>
      </el-card>
    </div>
  </div>
</template>
<script>
import home1 from '@/assets/images/home.jpeg'
import home2 from '@/assets/images/shop1.jpeg'
import home3 from '@/assets/images/shop2.jpeg'
import highcharts from 'highcharts'
import { home } from '@/axios'

export default {
  name: 'home',
  data() {
    return {
      options: {},
      chart: null,
      province: [],
      sales: [],
      income: [],
      production: [],
      cardList: [],
      isShow: false
    }
  },
  mounted() {
    this.home()
  },
  beforeDestroy() {
    this.chart = null
  },
  methods: {
    home() {
      this.isShow = false
      this.province = []
      this.sales = []
      this.income = []
      this.cardList = []
      home({}).then(res => {
        const data = res.data
        for (let index in data.list) {
          this.province[index] = data.list[index].province
          this.production[index] = data.list[index].production
          this.sales[index] = data.list[index].sales
          this.income[index] = data.list[index].income
          // 随机图片
          const src = [home1, home2, home3]
          src.sort(function () {
            return 0.5 - Math.random()
          })
          // 重新组合obj
          const cardObj = {}
          cardObj.index = parseInt(index)
          cardObj.src = src[2]
          cardObj.title = data.list[index].province
          this.cardList[index] = cardObj
        }
        // 数据加载完成,渲染图表
        this.setChart()
        this.isShow = true
      }).catch(err => {
        console.log(err)
      })
    },
    // 生成图表
    setChart() {
      this.options = {
        title: {
          text: '本月产量、销量与收益'
        },
        xAxis: {
          categories: this.province,
          crosshair: true
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          shared: true
        },
        series: [{
          name: '产量',
          type: 'column',
          tooltip: {
            valueSuffix: '台'
          },
          data: this.sales
        }, {
          name: '销量',
          type: 'spline',
          dashStyle: 'shortdot',
          tooltip: {
            valueSuffix: '台'
          },
          data: this.production
        }, {
          name: '收益',
          type: 'spline',
          tooltip: {
            valueSuffix: '万元'
          },
          data: this.income
        }]
      }
      this.chart = highcharts.chart('container', this.options)
    }
  }
}
</script>
