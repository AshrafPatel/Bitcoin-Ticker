const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log("Server started")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bitcoin.html")
})

app.post("/", (req, res) => {
    let cryptoCurrency = req.body.crypto;
    let currency = req.body.currency;
    let amount = req.body.amount

    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: cryptoCurrency,
            to: currency,
            amount: amount
        }
    }
    request(options, (error, response, body)=> {
        let result = JSON.parse(body);
        let price = result.price;

        res.write("<h1>For " + amount +  cryptoCurrency + "<br/>Recieve " + price +  currency + "</h1>");
        res.write("<p>The current date is " + result.time+"</p>")
        res.send();
    })
})