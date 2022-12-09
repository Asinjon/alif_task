import { rootApi } from "./api.js";
import axios from "axios";
import {COMMENT_SUCCESSFULLY_CREATED, COMMENT_WITH_SUCH_ID_EXIST} from "../constants.js";

export const createComment = (data, cb) => {
    axios.post(`${rootApi}/comments/create`, {data})
        .then(res => {
            console.log("res in creatComment():", JSON.stringify(res));
            if (COMMENT_SUCCESSFULLY_CREATED === res.data.message) {
                cb(COMMENT_SUCCESSFULLY_CREATED, true, false);
            }
        })
        .catch(error => {
            console.log("error:", (error));
            Object.keys(error).length > 0 && cb(error.response.data.message, false, true);
        });
};

export const getComments = (page, cb) => {
    axios.get(`${rootApi}/comments/page/${page}`)
        .then(res => {
            cb(res, true, false);
        })
        .catch(error => {
            cb({message: error.response.data.message}, false, true);
        }
    );
};