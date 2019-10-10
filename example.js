const { Sliceup } = require("./index.js");

console.log("Welcome to SliceUp client!");

const sliceup = Sliceup("demo.sliceup.co");

const main = async () => {
    try {
        let result = await sliceup.summary();

        console.log("Summary:");
        console.log(result);

        result = await sliceup.create({
            name: "orders",
            columns: [
                { name: "time", type: "time" },
                { name: "qty", type: "int" },
                { name: "price", type: "float" }
            ],
            recreate: true
        });

        console.log("\nTable 'orders' (re)created:");
        console.log(result);

        result = await sliceup.insert({
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
        });
        console.log(`\nInserted ${result} rows`);

        result = await sliceup.query({
            select: ["time", "qty", "price"],
            from: "orders"
        });

        console.log("\nSelect 'time', 'qty' and 'price' columns from 'orders' table:");
        console.log(result);

        result = await sliceup.query({
            select: [{ count: "price" }, { sum: "qty" }],
            by: { bar: ["time", { time: [1, 0, 0] }] },
            from: "orders"
        });

        console.log(
            "\nSelect 'count(time)', 'sum(qty)' by 'time(1, 0, 0)' buckets of 'time' column from 'orders' table:"
        );
        console.log(result);

        result = await sliceup.delete("orders");

        console.log(`\nDeleted 'orders' table: ${result}`);

        result = await sliceup.summary();

        console.log("Summary:");
        console.log(result);
    } catch (e) {
        console.error(e);
    }
};

main();
