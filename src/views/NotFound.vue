<template>
    <div class="notfound-page-container">
        这是404页面 <router-link to="/personal"> 回到首页</router-link>
    </div>
</template>

<script>
    export default {
        name:'404'
    }
</script>

<style lang="less">
.notfound-page-container{
    text-align: center;
    height: 400px;
    line-height: 400px;
    font-size: 40px;
}
</style>