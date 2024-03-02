<script setup>
import{ ref } from 'vue'

const props = defineProps(['foodData', 'cat'])


const emit = defineEmits(['markfood'])

const markFood = (foodid, prefer) => {
    
    emit('markfood', foodid, prefer)
}


const addMark = (array, id) => {
    if(array.includes(id)){
        return true
    }else{
        return false
    }
}



</script>

<template >
    <h2>所有貓食</h2>
    
    <div>
        <ul class="foodlist-ul">
            <li v-for="food in props.foodData"  class="foodlist-ul-li" >
                <ul class="foodlist-ul-ul" :class="{love: addMark(food.love, props.cat), hate:addMark(food.hate, props.cat)}" >
                 
                    <li><h3>{{ food.brand }}</h3></li>
                    <li>{{ food.name }}</li>
                    <li>
                        <ul class="foodlist-ul-ul-ul">
                            <li v-for="meattype in food.meat">{{ meattype }}  </li>
                        </ul>
                    </li>
                        <ul class="foodlist-ul-ul-ul-second">
                    <li>{{ food.foodtype }}</li>
                    <li>{{ food.package }}</li>
                        </ul>
                    <li class="foodlist-prefer-btn">
                        <button  @click="markFood(food.id, 'love')" >喜歡</button>
                        <button  @click="markFood(food.id, 'hate')">討厭</button>
                        <button  @click="markFood(food.id, 'cancel')">取消偏好</button>
                    </li>
                </ul>
            </li>

        </ul>
       
    </div>



</template>

<style scoped>

</style>