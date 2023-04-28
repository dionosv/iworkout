<template>

<div class="login">
    <form @submit.prevent="signin">
        <div class="main">
            <div class="main1">
                <img src="@/assets/bluetext.png" class="mainlogo">
            </div>
            <div class="main2">
                <h4>{{prompt}}</h4>
            </div>
        </div>

           
        <div class="alert alert-danger" id="alert" role="alert" v-if="masuk.length > 0">{{masuk}}</div>

        <div class="email" id="fr">
            <label for="Email">Email</label>
            <br>
            <input type="email" name="" id="" placeholder="dion.hananto@binus.ac.id" v-model="email"> 
        </div>


        <div class="pass" id="fr">
            <label for="pass">Password</label>
            <br>
            <input type="password" id="fieldpass" placeholder="banana123" v-model="pw">


        </div>
        <div class="showpass" @click="showpw" oncontextmenu="return false;">
            <img src="@/assets/toogle/eye-open.svg" v-if="toogle">
            <img src="@/assets/toogle/eye-close.svg" v-else>

            <label>Click to {{fpass}} password </label>
        </div>

        <div class="tmb">
            <button type="submit" class="btn btn-primary" id="fr2">Sign In</button>
            <!-- <label class="signuptxt"><router-link to="/signup">Sign Up</router-link> if you don't have an account</label> -->
        </div>

    </form>
    <!-- <button type="button" class="btn btn-success" @click="logout">remove</button> -->

</div>
</template>

<script>
import router from '@/router'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {logout ,login} from './func/all'

export default {
    data() {
        return {
            prompt : "Sign In",
            email:"",
            masuk : "",
            pw : "",
            toogle : true,
            fpass : "show"
        }
    },
    methods: {
        showpw(){
            if(this.toogle){
                document.getElementById('fieldpass').type  = 'text'
                this.toogle = !this.toogle
                this.fpass = 'hide'
            }

            else{
                document.getElementById("fieldpass").type = 'password'
                this.toogle = !this.toogle
                this.fpass = 'show'
            }
        },

        user_logout(){
            logout()
        },
        red_alert(peringatan){
            this.masuk = peringatan
            setTimeout(() => {this.masuk = ''}, 4500);
        },

        signin(){
            (async () => {
            const {status, msg} = await login(this.email, this.pw);

            if (status === true) {
                window.location.reload();
            } else {
                this.red_alert(msg)
            }
            })();
        }

    },
}
</script>

<style scoped>

.main{
    display: flex;
    justify-content: center;
    align-self: center
}

.main2 h4{
    font-weight: bold;
}
.mainlogo{
    width: auto;
    height: 30px;
    margin-right: 15px;

}
.login{
    display: flex;
  justify-content: center;
}

.signuptxt{
    margin-top: 5%;
    font-size: 12px ;
}

.signuptxt a{
    text-decoration: none;
}


.showpass{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    font-size: 13px;
    margin-top: 5%;
    margin-bottom: 3%;
}

.showpass img{
    margin-right: 5px;
    width: 25px;
    height: auto;
}

#alert {
    margin-top: 6%;
    margin-bottom: 6%;
}

#fr{
    text-align: left;
    margin-top:3%
}

#fr input{
    width: 100%;
    height: 40px;
    border: none;
    background-color : #ffffff; 
    border-radius: 6px;
    padding: 2%;
    margin-top: 2%;
}

#fr2{
    margin-top: 3%;
}
.tmb{    
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}

form{
    margin-top: 30px;
    width: 410px;
    background-color: #F1F6F9;
    padding: 20px;
    border-radius: 8px;
}
</style>