const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());


app.post('/getResponse',(req, res) => {
    console.log(req.body.question)
    const genAI = new GoogleGenerativeAI('AIzaSyBEMyZrKrI2XL_yJsmirrmVMrF2iMcG46A');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    model.generateContent(req.body.question).then((result) => {
       console.log(result.response.text());
       const response = result.response.text();
       res.status(200).json({
           response: response
       })
    })
    .catch(error=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

});



module.exports = app;