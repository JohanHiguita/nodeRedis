const express = require("express");
const redis = require("redis");

const keys = require("./keys");

const app = express();

let client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    password: keys.redisPassword
});

app.get("/", (request, response) => {
    console.log(`Process ID is ${process.pid}`);
    let num = request.query.number || 10;
    if (num % 2 === 0) {
        client.publish("math-subscription1", num);
    }
    else {
        client.publish("math-subscription2", num);
    }
    response.end("<h3>Notification sent to the respective subscribers! We will send you an email with the details!</h3>");
});

app.listen(3000, () => console.log("Express App is running on PORT : 3000"));