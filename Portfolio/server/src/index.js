import express from 'express';

const app = express();
const port = 5000;

app.get("/",(req, res)=>{
    res.send("server is start");
});

app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`);
})