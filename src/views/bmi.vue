<template>
    <div class="bmi">
        <form>
            <div class="main">
                <div class="main1">
                    <img src="@/assets/bluetext.png" class="mainlogo">
                </div>
                <div class="main2">
                    <h4>{{prompt}}</h4>
                </div>
            </div>

            <div class="note">
                <h4>Body Mass Index</h4>
            </div>

            <div class="masukan">
                <input type="number" placeholder="Weight (Kg)" v-model="berat">
                <input type="number" placeholder="Height (Cm)" v-model="tinggi">
            </div>

            
        </form>
    </div>

    <div class="bmi2">
        <Transition>
        <div class="keluar" v-if="state">
            <label>BMI</label>
            <h2>
                {{ result }}
            </h2>
            <label>Status</label>
            <h3 id="desc">
                {{ notes }}
            </h3>
            <button v-if="shownbtn" class="btn btn-dark" id="saveacc" @click="saveprocedure">Save BMI</button>
        </div>
    </Transition>
    </div>    


    <div class="bmi2" v-if="savebtn">
        <Transition>
        <div class="keluar">
            <div class="reminder">
                <img src="@/components/icons/success.png" alt="">
                Data Saved !
            </div>
        </div>
    </Transition>
    </div>    

</template>

<script>
import { checkstate } from './func/all';
export default {
    data() {
        return {
            tinggi : null,
            berat : null,
            result : null,
            notes : null,
            prompt : 'BMI',
            state : false,
            acc:true,
            savebtn:false,
            shownbtn:false
        }
    },
    mounted() {
        this.acc=checkstate()
    },

    watch: {
        berat(newWeight, oldWeight) {
            this.cekbmi();
        },
        tinggi(newHeight, oldHeight) {
            this.cekbmi();
        }
  },
       
    methods: {
        cekbmi(){
            if(this.tinggi && this.berat){
                if((this.berat >= 30 && this.berat <= 300) && ( this.tinggi > 100 && this.tinggi < 220 )){
                    this.tooglebutton()
                    this.result = (this.berat / this.tinggi / this.tinggi * 10000).toFixed(1)
                    //keterangan
                    if(this.result<18.5){
                        this.notes = 'Underweight'
                    }
                    else if(this.result>=18.5 && this.result<=24.9){
                        this.notes = 'Healthy'
                    }
                    else if(this.result>=25 && this.result<=29.9 ){
                        this.notes =  'Overweight'
                    }
                    else if(this.result >= 30){
                        this.notes = 'Obesity'
                    }
                    this.state = true
                    
                }
            }
            else {
                this.result = ""
                this.notes = ""
                this.state = false
            }
        },
        saveprocedure(){
            //toogle procedure
            if(!this.savebtn){//if false baru bisa di pencet, jd gabisa di pencet pencet
                this.savebtn = !this.savebtn
                setTimeout(() => {
                    this.savebtn = !this.savebtn
                }, 3000);
                //disable button
                this.tooglebutton()

                
            }
        },
        tooglebutton(){
            if(this.acc){//if login
                this.shownbtn = !this.shownbtn
            }
            else{
                this.shownbtn = false
            }
        }
    },

}
</script>

<style>
.main{
    display: flex;
    justify-content: center;
    align-self: center
}
.note h4{
    display: flex;
    justify-content: center;
    align-self: center;
    margin : 3%;
    font-size: medium;
    font-family: 'Inter-Regular';
}

.main2 h4{
    font-family: 'Inter-Bold';
}

.mainlogo{
    width: auto;
    height: 30px;
    margin-right: 15px;
}

.desc{
    color: red;
}
.masukan{
    display: flex;
    flex-direction: column;
}

.masukan input{ 
    border-radius: 6px;
    margin-top: 2%;
    margin-bottom: 2%;
    width: 100%;
    padding: 2%;
    border-style: none;
}

form{
    margin-top: 30px;
    width: 410px;
    padding: 15px;
    margin-bottom: 3%;
    border-radius: 25px;
    background: linear-gradient(155deg, #ffffff, #d4dee4);
    box-shadow:  23px 23px 46px #c6c6c6,
             -23px -23px 46px #ffffff;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.reminder{ 
    font-family: "Inter-SemiBold";
    display: flex;
    align-items: center;
    font-size: 17px;
}

.reminder img{
    height: 35px;
    width: auto;
    margin-right: 10px;
}
.bmi{
    display: flex;
    justify-content: center;
}
.bmi2{
    margin-top: 3%;
    display: flex;
    justify-content: center;
}
.keluar{
    width: 410px;
    padding: 15px;
    margin-bottom: 3%;
    border-radius: 25px;
    background: #ffffff;
    box-shadow:  23px 23px 46px #c6c6c6,
             -23px -23px 46px #ffffff;
    font-size: medium;
    text-align: center;
}

.keluar h2{
    font-family: 'Inter-ExtraBold';
}

.keluar h3{
    font-family: 'Inter-Regular';
}

.keluar label{
    font-family: 'Inter-Light';
}

#saveacc{
    margin-top: 3%;
    margin-bottom : 3%;
    font-family: 'Inter-SemiBold';
}

@media (max-width: 777px) {
    form{
        width: 330px;
    }

    .keluar{
        width: 330px;
    }
    
}

</style>