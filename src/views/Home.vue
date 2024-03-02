<script setup>
import { ref, watch } from 'vue';

import  heading  from '../components/heading.vue';

import 所有商品 from '../components/food-list.vue';
import 篩選 from '../components/food-filter.vue';
import 已標記 from '../components/food-prefer.vue';


const baseURL = "http://localhost:5173/api";

const foods = ref(null);

const foodsupdate = ref(1);

const currentCat = ref(null);

let resmsg = ref(null);

// 頁籤設定

const currentTab = ref('已標記')
const tabs ={
    所有商品,
    篩選,
    已標記 
}


// 取得所有食物

// fetch(`${baseURL}/food`)
// .then(response => response.json())
// .then(data => foods.value = data)

    fetch(`${baseURL}/food`)
    .then(response => {
        if(response.ok){
            
            return response.json()
        }
        
        })
    .then(data => {foods.value = data;
    })

    
    
// 標記或取消標記食物

function markToFood(foodid, prefer){
        
    if (currentCat.value == null){
        alert('請先選擇貓咪！');
        return
    }else{
        
    fetch(`${baseURL}/food/${foodid}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            cat: currentCat.value,
            foodId: foodid,
            prefer: prefer
         })
    })
    .then(response => {
        
        if(response.ok){
            foodsupdate.value += 1;
            return response.json()
        }
    })
    .then(
        function (data){
            resmsg.value = data;
            
        }

    )
    }
    
}

watch(foodsupdate, (newVal, oldVal) => {

    fetch(`${baseURL}/food`)
    .then(response => {
        if(response.ok){
            
            return response.json()
        }
        
        })
    .then(data => {foods.value = data;
    })
    
})

 // 貓咪切換

function saveCurrentCat(cat){
    currentCat.value = cat
}


</script>

<template>
    <header>
        <heading @currentcatname="saveCurrentCat" /> 
        <div class="nav-div">
            <button
            v-for="(_, tab) in tabs"
            :key ="tab"
            @click="currentTab = tab"
                >  {{ tab }} </button>
        </div>
        <div class="switch-div">
            <component :is="tabs[currentTab]" 
            :foodData="foods"
            :cat="currentCat" 
            @markfood="markToFood"  ></component>
        </div>
    </header>
    <body>
  
    </body>


    <!-- <header>
    <heading /> 
    <navi @getallfooddata="getallFood()" />
    </header>
    <body>
  
    </body> -->

<!-- <ul>
    <li v-for="food in foods" :key ="food.id" >
        <p > {{ food.brand }} </p>
        <p v-for ="meat in food.meat" :key="food.meat">{{ meat }} </p>
    </li>
</ul> -->


</template>

<style scoped>


.nav-div{
    text-align: center;
    background-color: var(--color-2);
    border-radius: var(--border-radius-1);
    margin: 0.5rem 0;
    padding: 1rem 0;

}

.nav-div button{
    margin: 0 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: var(--border-radius-1);
    background-color: var(--color-1);
}

.nav-div button:hover{
    background-color: var(--color-3);
    color: var(--color-2);
}

.switch-div{
    padding: 1.5rem 0;
    background-color: var(--color-2);
    border-radius: var(--border-radius-1);
}

</style>