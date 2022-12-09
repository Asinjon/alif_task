import fs from 'fs';
export const getDataFromJson = (filename = "", page) => {
    console.log("page in getDataFromJson():", page);
    if (fs.existsSync(filename)) {
        if (getSizeOfPages(filename)) {
            if (page && page <= getSizeOfPages(filename)) {
                const comments = JSON.parse(fs.readFileSync(filename).toString());
                return comments[page - 1].data;
            } else {
                throw new Error("There is no such page!");
            }
        }
    } else {
        return JSON.parse('""');
    }
};
export const writeDataToJson = (filename = "", data) => {
    console.log("data in writeDataToJson():", JSON.stringify(data));
    if (fs.existsSync(filename)) {
        if (isAllPageIsFull(filename)) {
            addCommentToNewPage(filename, data);
        } else {
            addCommentToPage(filename, data);
        }
    }
};
export const isAllPageIsFull = (filename = "") => {
    let isFull = true;
    if (fs.existsSync(filename)) {
        for (let pageNumber = 1; pageNumber <= getSizeOfPages(filename); pageNumber++) {
            if (getDataFromJson(filename, pageNumber).length < 10) isFull = false;
        }
        return isFull;
    }
}
export const addCommentToPage = (filename = "", data) => {
    if (fs.existsSync(filename)) {
        const len = getSizeOfPages(filename);
        let allData = [];
        let lastPageData = {"data": ""};
        for (let pageNumber = 1; pageNumber <= len; pageNumber++) {
            if (pageNumber === len) {
                lastPageData["data"] = getDataFromJson(filename, pageNumber);
                lastPageData["data"].push(data);
                allData.push(lastPageData);
            } else {
                allData.push({"data": getDataFromJson(filename, pageNumber)});
            }
            console.log("lastPageData: " + JSON.stringify(lastPageData));
        }
        fs.writeFileSync(filename, JSON.stringify(allData, null, 2));
    }
}
export const addCommentToNewPage = (filename, data) => {
    let lastPage = {"data": [data]};
    console.log("lastPage:", JSON.stringify(lastPage));
    if (fs.existsSync(filename)) {
        let allData = [];
        const len = getSizeOfPages(filename);
        for (let pageNumber = 1; pageNumber <= len; pageNumber++) {
            allData.push({"data": getDataFromJson(filename, pageNumber)});
        }
        allData.push(lastPage);
        fs.writeFileSync(filename, JSON.stringify(allData, null, 2));
    }
};
export const addCommentToEmptyFile = (filename, data) => {
    if (fs.existsSync(filename)) {
        let allData = [];
        allData.push({"data": [data.data]});
        fs.writeFileSync(filename, JSON.stringify(allData, null, 2));
    }
};
export const getSizeOfComments = (filename = "") => {
    if (fs.existsSync(filename)) {
        let count = 0;
        let existData = JSON.parse(fs.readFileSync(filename).toString());
        existData.forEach(section => {
            count += section.data.length;
        });
        return count;
    }
};
export const getSizeOfPages = (filename = "") => {
    if (fs.existsSync(filename)) {
        let existData = JSON.parse(fs.readFileSync(filename).toString());
        if (existData.length === 0) throw new Error("Provided JSON file is empty!");
        return existData.length;
    }
}