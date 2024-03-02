const Cat = require('../models/cat.model');

async function getAllCat(req, res, next){

    let cats

    try {   
        cats = await Cat.getAllCat();
       

    } catch (error) {
        return
    }

    res.status(200).send({cats: cats});

}


async function addNewCat(req, res ,next){
    
    let cats
    cats = await Cat.getAllCat();
    try {
        
        const checkExistCat = req.body.addedCat.find(
            (catname) => catname.name === req.body.name 
        )
        if (checkExistCat){
            
            res.send( {  cats: cats, msg: '名字已存在！'} )
        }else{
            await Cat.addCat(req.body.name);
            cats = await Cat.getAllCat();

            res.status(201).send({
                cats: cats,
                msg: '新增成功！'
            })
        }
        
    
    } catch (error) {
     
        res.status(500).send({
            msg: '有點問題'
        })
    }
    



}


async function removeCat(req, res, next){
    let cats

    try {
        const result = await Cat.removeCat(req.body.catId, req.body.catname);
        cats = await Cat.getAllCat();

        if(result){
          
            res.status(201).send({
                cats: cats,
                msg: '移除成功！'
            })
        }else{
           
            res.send({
                msg: '移除失敗！'
            })
        }


    } catch (error) {
      
        res.status(500).send({
        msg: '有點問題'
        })
    }

   

}


module.exports = {
    getAllCat: getAllCat,
    addNewCat: addNewCat,
    removeCat: removeCat,

}