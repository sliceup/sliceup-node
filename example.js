const { Sliceup, count, bar, time } = require("./index.js");

console.log("Welcome to SliceUp client!");

const sliceup = new Sliceup("demo.sliceup.co");

sliceup
    .summary()
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .create({
        name: "orders",
        columns: [
            { name: "time", type: "time" },
            { name: "qty", type: "int" },
            { name: "price", type: "float" }
        ],
        recreate: true
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .insert({
        name: "orders",
        rows: [
            { time: "00:00:00", qty: 2, price: 9.0 },
            { time: "00:30:09", qty: 2, price: 2.0 },
            { time: "01:45:01", qty: 4, price: 1.0 },
            { time: "12:10:33", qty: 10, price: 16.0 },
            { time: "16:00:09", qty: 4, price: 8.0 },
            { time: "22:00:00", qty: 4, price: 23.0 },
            { time: "22:31:49", qty: 4, price: 45.0 },
            { time: "22:59:19", qty: 4, price: 17.0 }
        ]
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .query({
        select: ["time", "qty", "price"],
        from: "orders"
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .query({
        select: count("price"),
        by: bar("time", time(1, 0, 0)),
        from: "orders"
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .delete("orders")
    .then(response => console.log(response))
    .catch(error => console.error(error));

sliceup
    .summary()
    .then(response => console.log(response))
    .catch(error => console.error(error));
