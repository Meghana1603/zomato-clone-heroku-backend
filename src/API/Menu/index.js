//Libraries
import express from "express";

//Database Model
import { MenuModel, ImageModel } from "../../database/allModels";
import { ValidateId } from "../../validation/menu";

const Router = express.Router();

/*
Route   /menu/list/:_id
Des     Get all list of menu based on id
Params  _id
Access  Public
Method  GET
*/
Router.get("/list/:_id", async (req,res) => {
    try{
        await ValidateId(req.params);
        const {_id} = req.params;

        const menus = await MenuModel.findById(_id);

        return res.json({menus});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route   /menu/image/:_id
Des     Get all menu images based on id
Params  _id
Access  Public
Method  GET
*/
Router.get("/image/:_id", async (req,res) => {
    try{
        await ValidateId(req.params);
        const {_id} = req.params;

        const menus = await ImageModel.findOne(_id);

        return res.json({menus});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;