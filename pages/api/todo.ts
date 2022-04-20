const uniqid = require('uniqid')
const config = require('./config')

interface todoItem {
    id?: string;
    task: string;
    dueDate: string;
    status: string
 }

export default function handler(req:any, res:any) {
   if (req.method == 'POST') {
       let newItem : todoItem = req.body;
       newItem = {...newItem, id: uniqid()}
      const item : todoItem | false = config.save(newItem);
      if (item) {
       return res.status(200).json({success: true, item})
      }
      return res.status(200).json({success: false, msg: "Error saving item"});

   }

   if (req.method == "GET") {
      if(req.query.id){
         const todoItem : todoItem[] | [] = config.findOne(req.query.id);
         return res.status(200).json({success: true, todoItem})   
      }
      const todoItems : todoItem[] | [] = config.findAll();
      return res.status(200).json({success: true, todoItems})
   }

   if(req.method =="DELETE"){
      const id : string = req.query.id;
      const deleted : boolean =  config.delete(id);
      return res.status(200).json({success: deleted});

   }

   if(req.method =="PUT"){
      const id : string = req.query.id;
      const updated : boolean =  config.updateStatus(id);
      return res.status(200).json({success: updated});

   }

   if (req.method == 'PATCH') {
      const  itemToUpdate : todoItem = req.body;
      const id : string = req.query.id;
     const item : todoItem | false = config.updateTodo(itemToUpdate, id);
     if (item) {
       return res.status(200).json({success: true, item})
     }
    return res.status(200).json({success: false, msg: 'Error updating todo'})

  }
   
    return res.status(405).end()

    
  }

  