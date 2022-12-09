import express from "express";
import { addCommentToEmptyFile, getDataFromJson, getSizeOfPages, writeDataToJson } from "../utils.js";
const router = express.Router();


router.post("/create", (req, res) =>{
    const data = req.body;
    try {
        if (data.data !== undefined) {
            Object.keys(data.data).forEach(key => {
                if (typeof data[key] === "string") {
                    if (data[key] === "") {
                        throw new Error("Provided data is invalid. Please verify your inputs!");
                    }
                }
            });

            let isUnique = true;
            data.data.id = +data.data.id;
            data.data.post_id = +data.data.post_id;

            try {
                for(let i=1; i <= getSizeOfPages("./data.json"); i++) {
                    getDataFromJson("./data.json", i).forEach(comment => {
                        if (comment.id == data.data.id) {
                            isUnique = false;
                        }
                    });
                }
            } catch (error) {
                addCommentToEmptyFile("./data.json", data.data);
                return res.status(201).json({message: "Comment has succcessfully been created!"});
            }
            if (!isUnique) {
                throw new Error("Comment with such id already exists!");
            }
            writeDataToJson("./data.json", data.data);
            return res.status(201).json({message: "Comment has succcessfully been created!"});
        } else {
            Object.keys(data).forEach(key => {
                if (typeof data[key] === "string") {
                    if (data[key] === "") {
                        throw new Error("Provided data is invalid. Please verify your inputs!");
                    }
                }
            });
            let isUnique = true;
            data.id = +data.id;
            data.post_id = +data.post_id;

            try {
                for(let i=1; i <= getSizeOfPages("./data.json"); i++) {
                    getDataFromJson("./data.json", i).forEach(comment => {
                        if (comment.id == data.id) {
                            isUnique = false;
                        }
                    });
                }
            } catch (error) {
                addCommentToEmptyFile("./data.json", data);
                return res.status(201).json({message: "Comment has succcessfully been created!"});
            }
            if (!isUnique) {
                throw new Error("Comment with such id already exists!");
            }
            writeDataToJson("./data.json", data);
            return res.status(201).json({message: "Comment has succcessfully been created!"});
        }
    } catch (error) {
        if (error.message === "Provided data is invalid. Please verify your inputs!") {
            res.status(404).json({message: "Your provided data is invalid. Please request valid data!"});
        } else if (error.message === "Comment with such id already exists!") {
            res.status(406).json({message: "Comment with such id already exists!"});
        } else if (error.message === "There is no such page!") {
            res.status(404).json({message: "There is no such page!. Please try another one!"});
        }
    }
});

router.get("/page/:pageNumber", (req, res) => {
    const {pageNumber} = req.params;
    try {
        let comments = getDataFromJson("./data.json", pageNumber);
        console.log("comments", comments);
        let pageCount = getSizeOfPages("./data.json");
        res.status(200).json({pageCount, comments});
    } catch (error) {
        console.log("Error in get page: " + error.message);
        if (error.message === "Provided JSON file is empty!") {
            res.status(404).json({message: "JSON file is empty. Please create a new comment to see it!"});
        } else {
            res.status(404).json({message: error.message});
        }
    }
});

export default router;