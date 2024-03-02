const mysql = require('mysql2/promise');
const db = require ('../data/database');

class Food{

    static async getAllFood(){
        const connection = mysql.createPool(db);
        const [result] = await connection.query('SELECT * FROM food');
        
        return result
    }


    static async markPreference(cat, foodId, prefer){
       
        const connection = mysql.createPool(db);
        const [result] = await connection.query('select love, hate from food where id = ?', [foodId]);
        
        const loveArray = result[0].love;
        const hateArray = result[0].hate;

        if(prefer == 'love' && loveArray.includes(cat)){
           return false
        }  else if (prefer == 'love' && !loveArray.includes(cat) ){

            loveArray.push(cat); 

            if(!hateArray.includes(cat)){
                
                await connection.query(`UPDATE food SET love = JSON_ARRAY(?)  WHERE id = ?`, [loveArray, foodId]);
                return true

            }else{
                await connection.query(`UPDATE food SET love = JSON_ARRAY(?)  WHERE id = ?`, [loveArray, foodId]);
                const newhateArray = hateArray.filter((i) => i !== cat);
                await connection.query(`UPDATE food SET hate = JSON_ARRAY(?)  WHERE id = ?`, [newhateArray, foodId]);
                return true
            }

        }else if(prefer == 'hate' && hateArray.includes(cat) ){
            return false

        } else if (prefer == 'hate' && !hateArray.includes(cat) ){

            hateArray.push(cat); 

            if(!loveArray.includes(cat)){
                
                await connection.query(`UPDATE food SET hate = JSON_ARRAY(?)  WHERE id = ?`, [hateArray, foodId]);
                return true

            }else{
                await connection.query(`UPDATE food SET hate = JSON_ARRAY(?)  WHERE id = ?`, [hateArray, foodId]);
                const newloveArray = loveArray.filter((i) => i !== cat);
                await connection.query(`UPDATE food SET love = JSON_ARRAY(?)  WHERE id = ?`, [newloveArray, foodId]);
                return true
            }

        }else if(prefer === 'cancel'){

            if(!loveArray.includes(cat) && !hateArray.includes(cat)){
                return false
            }else if(loveArray.includes(cat)){
                const newloveArray = loveArray.filter((i) => i !== cat);
                await connection.query(`UPDATE food SET love = JSON_ARRAY(?)  WHERE id = ?`, [newloveArray, foodId]);
            }else if(hateArray.includes(cat)){
                const newhateArray = hateArray.filter((i) => i !== cat);
                await connection.query(`UPDATE food SET hate = JSON_ARRAY(?)  WHERE id = ?`, [newhateArray, foodId]);
            }

            return true

        }



        // const aaa = aa[0][0].meat;
        // aaa.push(cat);
        // console.log(aaa);
        // await connection.query(`UPDATE food SET meat = JSON_ARRAY(?)  WHERE id = ?`, [aaa, foodId]);

    }


}


module.exports = Food;