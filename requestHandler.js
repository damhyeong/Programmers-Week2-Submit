const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8")

const mariadb = require("./database/connect/mariadb");

function main(response) {
    console.log("main handled");

    mariadb.query("SELECT * FROM product", function (err, rows) {
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function redRacket(response){
    fs.readFile("./img/redRacket.png", function (err, data) {
        response.writeHead(200, {'Content-Type' : 'img/png'});
        response.write(data);
        response.end();
    })
}
function blueRacket(response) {
    fs.readFile("./img/blueRacket.png", function (err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function blackRacket(response) {
    fs.readFile("./img/blackRacket.png", function (err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function getCss(response) {
    fs.readFile("./main.css", function (err, data) {
        response.writeHead(200, {"Content-Type" : "text/css"});
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, {"Content-Type" : "text/html"});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function (err, rows) {
        console.log(rows);
    });

    response.write("Order Page");
    response.end();
}

function orderlist (response) {
    console.log("order List");

    response.writeHead(200, {"Content-Type" : "text/html"});

    mariadb.query("SELECT * FROM orderlist", function (err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                                + `<td>${element.product_id}</td>`
                                + `<td>${element.order_date}</td>`
                            + `</tr>`
            );
        });

        response.write("</table>");
        response.write("</body></html>");
        response.end();
    });
}

let handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/** image directory */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

/** CSS */
handle["/main.css"] = getCss;

exports.handle = handle;