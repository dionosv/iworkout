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
                <h4>Choose your exercise preferences</h4>
            </div>

            <div class="masukan">
                <label>Difficulty</label>
                <select v-model="pilihan">
                    <option value="0"></option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select>

                <label>Categories</label>
                <select v-model="pilihan2">
                    <option value="0"></option>
                    <option value="Barbell">Barbell</option>
                    <option value="Dumbbells">Dumbbells</option>
                    <option value="Kettlebells">Kettlebells</option>
                    <option value="Stretches">Stretches</option>
                    <option value="Cables">Cables</option>
                    <option value="Band">Band</option>
                    <option value="Plate">Plate</option>
                    <option value="TRX">TRX</option>
                    <option value="Bodyweight">Bodyweight</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Machine">Machine</option>
                </select>
            </div>
            <div class="mid">
                <button v-if="shownbtn" class="btn btn-dark" id="saveacc" @click.prevent="saveprocedure">Save Options</button>
            </div>
            
        </form>
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
import { checkstate, getuserid } from './func/all';
import router from "../router"
import { db } from './func/firedata';
import { doc, updateDoc } from 'firebase/firestore';
export default {
    data() {
        return {
            notes : null,
            prompt : 'Options',
            state : false,
            acc:true,
            savebtn:false,
            shownbtn:true,
            pilihan : "",
            pilihan2 : ""
        }
    },
    mounted() {
        this.acc=checkstate()
    },
       
    methods: {
        saveprocedure(){
            //toogle procedure
            const hasil = this.crosscheck()
            if(!this.savebtn && hasil){//if false baru bisa di pencet, jd gabisa di pencet pencet
                this.savebtn = !this.savebtn
                this.upload()
                setTimeout(() => {
                    this.savebtn = !this.savebtn
                }, 3000);
                //disable button
                this.tooglebutton()

                setTimeout(() => {
                    router.push({name : "decide"})
                }, 3000);
            }
        },
        tooglebutton(){this.shownbtn = !this.shownbtn},
        crosscheck(){
            if(this.pilihan.length==0 && this.pilihan2.length == 0){return false}
            return true
        },

        async upload(){
            const tmp = doc(db, "userdata", getuserid());
            await updateDoc(tmp, {
                detail2: true,
                preferencesdata  : {
                    difficulty : this.pilihan,
                    categories : this.pilihan2,
                }
            });
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

.masukan label {
    font-family: "Inter-Regular";
    font-size: 14px;
    margin-left: 10px;
}

.mid{
    display: flex;
    justify-content: center;
}

.masukan{
    margin-top: 20px;
    margin-bottom: 20px;
}
.masukan select{ 
    border-radius: 6px;
    margin-top: 2%;
    margin-bottom: 2%;
    width: 100%;
    padding: 2%;
    border-style: none;
    color: black;
    font-family: "Inter-SemiBold";
}

.masukan option{
    font-family: "Inter-Regular";
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

    display: flex;
    justify-content: center;
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