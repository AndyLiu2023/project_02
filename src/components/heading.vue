<script setup>
import { ref} from 'vue';

const emit = defineEmits(['currentcatname'])


const baseURL = "http://localhost:5173/api";

let cats = ref(null);
let selected =ref('');

fetch(`${baseURL}/cat`)
.then(response => response.json())
.then(data => cats.value = data.cats)

const sendingCatName = (cat) => {
    
    emit('currentcatname', cat);
}



</script>

<template>
   
    <div class="heading-div">
        <div class="app-title"> <h1>貓不吃這罐</h1> </div>
        <div class="cat-info"> 
           
            <div class="cat-list-div">
            
                <div class="select-cat-div">
                    <p v-if="!cats">點擊編輯，加入/刪除新貓貓</p>

                    <select v-model="selected" @change="sendingCatName(selected)" >
                       
                        <option disabled value="">選擇貓咪</option>

                        <option v-for="cat in cats" :key="cat.id" :value="cat.name">{{ cat.name }}</option>

                     </select>
              </div>
              <router-link to="/cat"><p class="cat-edit">新增貓貓</p></router-link>
                

            </div>
        
            <div cat-edit>
               
 
             
            </div>
            
           
        </div>

    </div>
 
</template>

<style scoped>

.heading-div {
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--color-2);
    border-radius: var(--border-radius-1);
}

.app-title{
    width: 60%;
}

.cat-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 40%;
}


.select-cat-div{
    margin: 0.5rem 0;
}

.select-cat-div select{

    width: 100%;
    font-size: 1rem;
    padding: 0.25rem;
    background-color: #fff;
    border: 1px solid var(--color-1);
    border-radius: var(--border-radius-1);
    color: #000;
    cursor: pointer;
}


</style>