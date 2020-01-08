<template>
  <div class="activ">
    <ul>
      <li v-for="item in nameArray" :key="item.id">
        {{item.name}} {{item.age}} {{item.id}}
      </li>
    </ul>
  </div>
</template>
<script>
import { activ } from '@/axios'

export default {
  name: 'activ',
  data() {
    return {
      text: '活动',
      nameArray: []
    }
  },
  mounted() {
    this.activ()
  },
  methods: {
    activ() {
      activ({}).then(res => {
        const data = res.data
        this.nameArray = data.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
