const mysql = require('mysql2/promise');
const db = require ('../data/database');

class Cat{
 

static async getAllCat(){

    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM cat');
    return result


}

static async addCat(cat){
    const connection = mysql.createPool(db);
  
    

    try {
        await connection.query('INSERT INTO cat (name) VALUES(?)', [cat]);
            
        
    } catch (error) {
        return false
    }
    
}

static async removeCat(catId ,catname){
    
    const connection = mysql.createPool(db);

    try {
        await connection.query('DELETE FROM cat WHERE id = ?', [catId]);
        
        await connection.query(`UPDATE food set love = JSON_REMOVE( love, JSON_UNQUOTE(JSON_SEARCH(love,'one', '${catname}'))) WHERE JSON_contains(love, '["${catname}"]') = 1 `)
        
        await connection.query(`UPDATE food set hate = JSON_REMOVE( hate, JSON_UNQUOTE(JSON_SEARCH(hate,'one', '${catname}'))) WHERE JSON_contains(hate, '["${catname}"]') = 1 `)
        
        return true
    } catch (error) {
        return false
    }
    

}


}


module.exports = Cat;