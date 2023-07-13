const express = require('express');
const fs = require('fs');
const app = express();

app.get('/getTreeViewData', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile("./data/data.json", "utf-8", (err, data) => {
        if(!err) {
            res.send(JSON.parse(data));
        }
    })
})

app.listen(4000, () => {
    console.log("The server is running on port 4000");
});