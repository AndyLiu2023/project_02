const Food = require('../models/food.model');

async function getAllFoodInfo(req, res, next){

    let foods

    try {   
        foods = await Food.getAllFood();
       

    } catch (error) {
        return
    }
    
    res.status(200).send(foods)

}


async function markPrefer(req, res, next){

        

        try {
            
            const result = await Food.markPreference(req.body.cat, req.body.foodId, req.body.prefer);
            
            if(result){
            res.status(201).send({
                msg: '標註已更新'
            })
            }else{
                res.send({
                    msg: '標註重複或未標註'
                })
            }
            

        } catch (error) {
            console.log('wrong!');
            return
        }


}


module.exports ={
    getAllFoodInfo: getAllFoodInfo,
    markPrefer: markPrefer

}