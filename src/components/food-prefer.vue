<script setup>
import { ref } from  'vue'

import 喜歡 from '../components/food-sub-love.vue'
import 討厭 from '../components/food-sub-hate.vue'

const props = defineProps(['foodData', 'cat'])
const emit = defineEmits(['markfood'])

const subCurrentTab = ref('')
const subTabs ={
    喜歡,
    討厭,

}

const markFood = (foodid, prefer) => {
    
    emit('markfood', foodid, prefer)
}



</script>

<template>
    <h2>貓貓喜歡/討厭</h2>
   
    <div class="nav-sub-div">
       
        <button
            v-for="(_, tab) in subTabs"
            :key ="tab"
            @click="subCurrentTab = tab"
                >  {{ tab }} 
        </button>
    </div>
    <div class="switch-div">
            <component :is="subTabs[subCurrentTab]" 
            :foodData ="foodData"
            :cat="cat" 
            @markfood="markFood"
            ></component>
    </div>
</template>

<style scoped>
.nav-sub-div button{
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: var(--border-radius-1);
    background-color: var(--color-1);

}

.nav-sub-div button:hover{
    background-color: var(--color-3);
    color: var(--color-2);
}



</style>