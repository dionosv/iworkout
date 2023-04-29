<template>
    <div class="pesan">
        <img src="/src/assets/whitetext.png" class="foto">
        <h1>Welcome</h1>
        <h3>Elevate Your Fitness, Elevate Your Life!</h3>
        <button @click="redirect" class="btn btn-primary">Go to App</button>
    </div>
    
</template>

<script>
import router from "../router"
export default {
    methods: {
        redirect(){
            router.push({name : 'Account'})
    }}
}
</script>

<style scoped>
img{
    width: 35%;
    height: auto;
}

.pesan h1{
    margin-top: 2%;
    margin-bottom: 2%;
    font-size: 80px;
    font-weight: bold;
}

.pesan h3{
    margin-top: 3%;
    margin-bottom: 3%;
}

</style>