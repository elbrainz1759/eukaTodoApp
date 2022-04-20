const fs = require('fs');
const path = require('path')

  export default function db() {

    const filePath = path.resolve('./pages/api/database.json');
    try {
        const db = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(db);
  
      } catch (err) {
        console.log(err);
        return false
      }

}


module.exports = db();
 
  