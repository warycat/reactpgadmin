import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.json({hello: 'world'});
})

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Service started on port :' + port);
})