const express = require("express");
const app = express();

app.get("/invlist", function (req, res) {

    res.send([{"field_1":"field1","field_2":"option1","field_3":"field1","field_4":"field1","field_5":"field1","field_6":"field1","field_7":"field1","field_8":"field1","field_9":"field1"}]);

});
app.listen(3002, () => console.log("started"));
