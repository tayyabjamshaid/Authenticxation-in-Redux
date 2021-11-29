import express from "express"
const listRouter=express.Router()
import {isAuth} from "../utils.js"
import expressAsyncHandler from "express-async-handler"
import List from "../models/ListModel.js"

listRouter.post(
    '/',isAuth,
 
    expressAsyncHandler(async (req, res) => {
       
     console.log(req.body.listItems)
        const list = new List({
          listItems: req.body.listItems,
          
          user: req.user._id,
        });
        const createdList = await list.save();
        console.log(createdList)
       res.send(createdList)
      
    })
  );

  listRouter.get(
    '/',isAuth,
 expressAsyncHandler(async (req, res) => {
      const data=await List.find({});
       res.json(data)
       })
  );
  listRouter.get(
    '/id',
 expressAsyncHandler(async (req, res) => {

  await List.findById(req.body.id).then((data)=>res.send(data));
       
       })
  );
  
  listRouter.put(
    "/updateTitle",isAuth,     
 
    expressAsyncHandler(async (req, res) => {
        const taskId=req.body.taskId

        List.findOneAndUpdate({"listItems._id":taskId},{$set:{"listItems.$.task":req.body.task}})
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
        res.json("Your Title is updated")
              
            }
        })
    })
  );
  listRouter.put(
    "/updateDescription",isAuth,
 
    expressAsyncHandler(async (req, res) => {
        const taskId=req.body.taskId
        const data=await List.findOne({"listItems._id":taskId}).populate("description");
     
       res.send(data)
    })
  );
  
  listRouter.put(
    "/updateProgress",isAuth,
 
    expressAsyncHandler(async (req, res) => {
        const taskId=req.body.taskId

        List.findOneAndUpdate({"listItems._id":taskId},{$set:{"listItems.$.progress":req.body.progress}}).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
        res.json("Your Progress is updated")
              
            }
        })
    })
  );

  listRouter.delete(
    "/delete/:id",isAuth,
 
    expressAsyncHandler(async (req, res) => {
        console.log(req.params.id)
        List.findOneAndDelete(req.params.id,((err,data)=>{
           res.json({data})
        }))
    })
  );

  listRouter.patch(
    "/update/:id",isAuth,
 
    expressAsyncHandler(async (req, res) => {
     
      const { title, progress, task, description, attachment,checkBox } = req.body;

    const updatedPost = { title, progress, task, description, attachment,checkBox, _id: req.params.id };
    const data=await List.findByIdAndUpdate(req.params.id, updatedPost, { new: true });

    res.json(data);
})
  );
  listRouter.patch(
    "/updateAll",isAuth,
 
    expressAsyncHandler(async (req, res) => {
        const taskId=req.body.taskId
List.findOneAndUpdate({"listItems._id":taskId}, { $set: req.body }, { new: true },(err,data)=>{res.send(data)});
    })
  );

  export default listRouter;