<script setup>
import { ref } from 'vue'

const cats = ref(null);

const newCat = ref(null);

let errormsg = ref(null);

let resmsg = ref(null);

const baseURL = "http://localhost:5173/api";

// fetch(`${baseURL}/cat`)
// .then(response => response.json())
// .then(data => cats.value = data)


fetch(`${baseURL}/cat`)
.then(response => {
        if(response.ok){
       
         return response.json()
     }else{
        return errormsg = 'wrong';
     }
    })
.then(data => { 
    cats.value = data.cats;
    
});




async function sendingNewCat(){


    fetch(`${baseURL}/cat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCat.value, addedCat: cats.value})
    })
    .then(response => {
        
        if(response.ok){
        return response.json()}
    })
    .then(function (data){
        
        resmsg.value = data.msg;
        cats.value = data.cats;
        setTimeout(( () => {resmsg.value = null} ), 2000);
    } 

    )
   
   
   
}

async function deleteCat(catId, catname){

//     try {
//         await fetch(`${baseURL}/cat/${catId}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ catId: catId})
// })
//     } catch (error) {
//         alert('Something went wrong!');
//         return;
//     }
    fetch(`${baseURL}/cat/${catId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catId: catId, catname: catname})
    })
    .then(response => {
        
        if(response.ok){
        return response.json()}
    })
    .then(function (data){
        
        resmsg.value = data.msg;
        cats.value = data.cats;
        setTimeout(( () => {resmsg.value = null} ), 2000);
    } 

    )

}

if(resmsg.value){
    
}


</script>


<template>

    <h1>目前貓咪</h1>
    <ul class="cat-ul">
        <li v-for="cat in cats" :key="cat.id" class="cat-li">
            <p class="cat-p">{{ cat.name }}</p>
            <button @click="deleteCat(cat.id, cat.name)" class="delete-btn">x</button>
        </li>
    </ul>
    <p v-if="resmsg" class="message"> {{ resmsg }}</p>

    <form @submit.prevent="sendingNewCat()">
        <input v-model.lazy="newCat" name="catname" id="catname"  />
        <button>新增貓貓</button>
    </form>
    <router-link to="/"><p>返回</p></router-link>
</template>

<style scoped >

.cat-ul{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
}

.cat-li{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    padding: 0 0.25rem;
    border-radius: var(--border-radius-1);
}

.cat-li:hover{
    background-color: var(--color-2);
    
}

.cat-li:hover .delete-btn{
    background-color: var(--color-2);
}

.cat-li p{
    padding: 0.25rem;
    
}

.delete-btn{
    margin: 0.25rem 0;
    padding: 0.25rem;
    text-decoration: none;
    border: none;
    background-color: #93c7ee;
    font-size: 1.25rem;
    color: red;
    cursor: pointer;
}

.delete-btn:hover {
    color: var(--color-1);
}



form{
    margin: 0.5rem auto;
    width: 80%;
    
}

form button{
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: var(--border-radius-1);
    background-color: var(--color-7);
}

form button:hover{
    background-color: var(--color-3);
    color: var(--color-2);
}

.message{
    margin: 0.5rem auto;
    width: 20%;
    padding: 0.5rem;
    background-color: var(--color-6);
    border-radius: var(--border-radius-1);
    color:var(--color-7);

}


</style>