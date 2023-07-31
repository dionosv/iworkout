<template>
    <div class="content" v-if="render">
        <div class="greeting">
            <h2>Hello, {{ displayname }}</h2>
        </div>

        <div class="allblock">
            <router-link to="/bmi">
                    <div class="square">
                    BMI
                    </div>
            </router-link>
        </div>

        <div class="detail">     
        <table>
            <div class="title">
                <h3>Exercise List</h3>
                <h5>
                    <router-link to="/exercise">Edit your preferences</router-link>
                </h5>
                <h5>Category : {{ this.cat  }}</h5>
                <h5>Difficulty : {{ this.dif  }}</h5>
                <!-- <h4>Do this exercise that listed below</h4> -->
            </div>
            <tbody>
                <tr v-for="exercise in filteredExercises" :key="exercise.id">
                    <div class="bagi">
                        <h2>
                            <td>{{ exercise.exercise_name }}</td>
                        </h2>
                        <video width="320" height="240" controls autoplay muted loop>
                            <source :src="exercise.videoURL[0]" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <h4>
                            <td>{{ exercise.steps[0] }}</td>
                        </h4>
                    </div>
                </tr>
            </tbody>
        </table>
        </div>

    </div>

    <div class="avoid">
        <h2>Hello, {{ displayname }}</h2>
        <h3>This feature only available on mobile devices</h3>
        <img src="@/components/icons/mobile-app.png" alt="">
    </div>
</template>

<script>
import workoutData from './func/workoutdb.json';
import { getemail } from './func/all';
import { getDocs, query, collection, where} from "firebase/firestore";
import {db} from'./func/firedata'
export default {
    data() {
        return {
            displayname : 'User',
            datastate : false,
            render :false,
            exercises: workoutData,
            dif : 'x',
            cat : 'x',
        }
    },
    computed: {
        filteredExercises() {
        const filtered = this.exercises.filter(
            exercise => exercise.Difficulty === this.dif && exercise.Category === this.cat
        );
        return filtered.slice(0, 15);
        },
    },

    methods: {
        async detailprocedure(email) {
            const userdataRef = collection(db, "userdata");
            const q = query(userdataRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.displayname = doc.data().nama
                this.datastate = doc.data().detaildata
                this.dif = doc.data().preferencesdata.difficulty
                this.cat = doc.data().preferencesdata.categories
            });
            this.render = true
        },
    },
    mounted() {
        this.detailprocedure(getemail())
    },
}
</script>

<style scoped>
.content {display: none;}
.avoid{
    margin-top: 5%;
    display: flex;
    align-items: center;
    flex-direction: column; 
}

.avoid img{
    width:150px;
    margin-top :20px;
    height: auto;
}

.avoid h2{
    font-family:"Inter-Bold";
}
.avoid h3{
    font-family: "Inter-Regular";
    font-size: 20px;
}


@media (max-width: 777px) {

    .content{display: block;}
    .avoid{display : none;}
    .square{
        width: 80px;
        height: 40px;
        border-radius: 15px;
        border-style: solid;
        border-width: 4px;
        border-color: #13386b;
        display: grid;
        place-items: center;
        color: #13386b;
    }

    .allblock{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row; 
        margin-left:  15% ;
        margin-right: 15%;
        gap: 15px;
    }

    .allblock a{
        text-decoration: none;
        font-family: "Inter-Bold";
        font-size: 13px;
    }
    .greeting{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 50px;
        margin-bottom: 6%;
    }

    .greeting h2{
        font-family: "Inter-Bold";
        font-size : 20px
    }

    .greeting h3{
        font-family: "Inter-Regular";
        font-size: 15px;
    }

    .detail{
        margin : 25px;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .detail h2{
        font-family: 'Inter-Bold';
        font-size: 20px;
    }

    .detail h3{
        font-family: 'Inter-Regular';
        font-size: 15px;
    }

    table{
        margin-top: 35px;
    }

    .bagi{
        display: flex;
        align-content: center;
        flex-direction: column;
        margin-top: 15px;
    }

    .bagi h2{
        font-family: 'Inter-Bold';
        font-size: 20px;
    }

    .bagi h4{
        font-family: 'Inter-Regular';
        font-size: 13px;
    }

    .title h3{
        font-family: 'Inter-Bold';
        font-size: 25px;
    }

    .title h4{
        font-family: 'Inter-SemiBold';
        font-size: 15px;
    }
    .title h5{
        font-family: 'Inter-Regular';
        font-size: 15px;
    }
}
</style>