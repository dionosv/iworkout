<template>
    <div class="content" v-if="render">
        <div class="greeting">
            <h2>Hello, {{ displayname }}</h2>
            <h3>fill out the fields below</h3>
        </div>

        <div class="allblock">

        
        <div class="blocks">
            <RouterLink to="/bmi">
                <div class="rectangle">
                    BMI
                </div>
            </RouterLink>
        </div>


        <div class="blocks">
            <RouterLink to="/">
                <div class="rectangle">
                    aaa
                </div>
            </RouterLink>
        </div>

        <div class="blocks">
            <RouterLink to="/">
                <div class="rectangle">
                    aaa
                </div>
            </RouterLink>
        </div>

        </div>

    </div>
</template>

<script>
import { getemail } from './func/all';
import { getDocs, query, collection, where} from "firebase/firestore";
import {db} from'./func/firedata'
export default {
    data() {
        return {
            displayname : 'User',
            datastate : false,
            render :false
        }
    },
    methods: {
        async detailprocedure(email) {
            const userdataRef = collection(db, "userdata");
            const q = query(userdataRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.displayname = doc.data().nama
                this.datastate = doc.data().detaildata
            });
            this.render = true
        },


    },
    mounted() {
        this.detailprocedure(getemail())
    },
}
</script>

<style>
.rectangle {
    background: red;
    border-color: black;
    width : 100px;
    height : 20px;
    text-decoration: none;
}

.blocks{
    /* margin-left : 3%;
    margin-right :3%; */
}

.allblock{
    display: flex;
    justify-content: space-between;
}
</style>