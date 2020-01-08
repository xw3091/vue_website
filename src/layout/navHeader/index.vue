<template>
    <header class="header_nav">
        <ul>
            <li v-for="item in navName" :key="item.name">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
    </header>
</template>
<script>
export default {
    name: 'header-nav',
    data() {
        return  {
            navName: [{
                name: '首页',
                path: '/home'
            }, {
                name: '商城',
                path: '/shop'
            }, {
                name: '活动',
                path: '/activ'
            }, {
                name: '合作',
                path: '/coope'
            }, {
                name: '更多',
                path: '/more'
            }]
        }
    }
}
</script>

