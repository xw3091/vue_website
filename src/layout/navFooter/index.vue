<template>
    <footer class="footer_nav">
        <section>{{text}} {{time}}</section>
    </footer>
</template>

<script>
export default {
    name: 'footer-nav',
    data() {
        return  {
            time: '',
            text: 'XU'
        }
    },
    created() {
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let date = new Date().getDate()
        this.time = year + '-' + month + '-' + date
    }
}
</script>
