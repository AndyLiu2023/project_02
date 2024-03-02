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


const brandArray = ref([])
const meatArray = ref([])
const foodtypeArray = ref([])
const packageArray = ref([])

const newBrandArray = ref([])
const newMeatArray = ref([])
const newFoodtypeArray = ref([])
const newPackageArray = ref([])



function cleanDataToArray(Data){
        
    Data.forEach( (i) => {
        brandArray.value.push(i.brand);
        foodtypeArray.value.push(i.foodtype);
        packageArray.value.push(i.package);
        i.meat.forEach(
            (b) =>{
                meatArray.value.push(b);
            }
        )

    } )




    newBrandArray.value = [...new Set(brandArray.value)];
    newFoodtypeArray.value = [...new Set(foodtypeArray.value)];
    newPackageArray.value = [...new Set(packageArray.value)];
    newMeatArray.value = [...new Set(meatArray.value)];

  

}

cleanDataToArray(props.foodData);

const checkBrands = ref([])
const checkFoodtype = ref([])
const checkMeat = ref([])
const checkPackage = ref([])

// function filter(checkArray, food){
    
//     let checkResult = []

//         food.meat.forEach( (i) => {
//             checkResult.push(checkArray.includes(i))
//          }
//           )

//             if(checkArray.includes(food.brand)){
//                 return true
//             }else if(checkArray.includes(food.foodtype)){
//                 return true
//             }else if(checkArray.includes(food.package)){
//                 return true
//             }
//             else if(checkResult.includes(true)){
//                 return true
//             }else{
//                 return false
//             }

// }


function filter(food){
    
    let checkMeatResult = [];

        food.meat.forEach( (i) => {
            checkMeatResult.push(checkMeat.value.includes(i))
         }
          )
   let checkedResult = [ checkBrands.value.includes(food.brand), 
                        checkFoodtype.value.includes(food.foodtype),
                        checkPackage.value.includes(food.package),  
                        checkMeatResult.includes(true)  ]
   

    
        if(checkBrands.value.length == 0 && checkFoodtype.value.length == 0 && checkPackage.value.length == 0 && checkedResult[3]){
        
            return checkedResult.includes(true);
               
        }else if(checkBrands.value.length == 0 && checkedResult[1] && checkPackage.value.length == 0 && checkedResult[3]){
        
            return checkedResult.includes(true);
           
        }else if(checkBrands.value.length == 0 && checkFoodtype.value.length == 0 && checkedResult[2] && checkedResult[3]){
        
            return checkedResult.includes(true);
           
        }else if(checkBrands.value.length == 0 && checkedResult[1] && checkedResult[2] && checkedResult[3]){
        
            return checkedResult.includes(true);
       
        } else if(checkBrands.value.length == 0 && checkFoodtype.value.length == 0 && checkedResult[2] && checkMeat.value.length == 0 ){
        
            return checkPackage.value.includes(food.package);
       
        } else if(checkBrands.value.length == 0 && checkedResult[1] && checkedResult[2] && checkMeat.value.length == 0 ){
        
            return checkPackage.value.includes(food.package);
       
        } else if(checkBrands.value.length == 0 && checkedResult[1] && checkPackage.value.length == 0  && checkMeat.value.length == 0 ){
        
            return  checkFoodtype.value.includes(food.foodtype)
       
        } else if( checkedResult[0] && checkedResult[1] && checkedResult[2] && checkedResult[3]){
           
            return checkBrands.value.includes(food.brand)
            
        }else if(checkedResult[0] && checkedResult[1] && checkedResult[2] && checkMeat.value.length == 0 ){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkedResult[1] && checkPackage.value.length == 0 && checkedResult[3]){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkFoodtype.value.length == 0 && checkedResult[2] && checkedResult[3]){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkedResult[1] && checkPackage.value.length == 0 && checkMeat.value.length == 0 ){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkFoodtype.value.length == 0 && checkPackage.value.length == 0 && checkedResult[3]){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkFoodtype.value.length == 0 && checkedResult[2] && checkMeat.value.length == 0){
            
            return checkBrands.value.includes(food.brand)
        }else if(checkedResult[0] && checkFoodtype.value.length == 0 && checkPackage.value.length == 0 && checkMeat.value.length == 0){
            
            return checkBrands.value.includes(food.brand)
        }

 
}


</script>

<template >
    <h2>篩選搜尋</h2>
    <div class="filter-area-div">
        <div class="filter-cate-div">
            <h4>品牌：</h4>
            <ul class="filter-cate-ul">
                <li v-for="food in newBrandArray">
                    <input  type="checkbox" :id="food" :value="food" v-model="checkBrands" />
                    <label  :for="food">{{ food}}</label>
                </li>
            </ul>
        </div>
        <div class="filter-cate-div">
            <h4>成分：</h4>
            <ul class="filter-cate-ul">
                <li v-for="meattype in newMeatArray">
                    <input  type="checkbox" :id="meattype" :value="meattype" v-model="checkMeat" />
                    <label  :for="meattype">{{meattype}}</label>
                </li>
            </ul>
        </div>
        <div class="filter-cate-div">
            <h4>類型：</h4>
            <ul class="filter-cate-ul">
                <li v-for="foodtype in newFoodtypeArray">
                    <input  type="checkbox" :id="foodtype" :value="foodtype" v-model="checkFoodtype" />
                    <label  :for="foodtype">{{ foodtype }}</label>
                </li>
            </ul>
        </div>  
        <div class="filter-cate-div"> 
            <h4>包裝：</h4>
            <ul class="filter-cate-ul">
                <li v-for="pack in newPackageArray">
                    <input  type="checkbox" :id="pack" :value="pack" v-model="checkPackage" />
                    <label  :for="pack">{{ pack }}</label>
                </li>
            </ul>
        </div>
    </div>

    <div v-for="food in props.foodData" >
        <ul class="foodlist-ul"   v-if="filter(food)">
            <li class="foodlist-ul-li" >
                <ul class="foodlist-ul-ul" :class="{love: addMark(food.love, props.cat), hate:addMark(food.hate, props.cat)}">
                 
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
.filter-area-div{
    display: flex;
    flex-direction: column;
}

.filter-cate-ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.filter-cate-ul li{
    margin: 0.5rem 0.25rem;
    
}

label{
    cursor: pointer;
    background-color: aqua;
}



input[type=checkbox]{
    display: none;
}

input[type=checkbox]~label{
    background-color:var(--color-6) ;
    padding: 0.25rem;
    border-radius: 50px;
}


input[type=checkbox]:checked~label{
    background-color:var(--color-7) ;
    color: var(--color-6);
}


@media  (min-width: 60rem){

.filter-cate-ul{
    justify-content: center;    
}

.filter-cate-div{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0.25rem 1rem 

}

}


</style>