const express = require('express')
const app = express()
const sql = require("mssql");
const port = process.env.PORT || 4000;
// const cors = require("cors");
// app.use(cors());


const config = {
  user: "yomathi",
  password: "youcef28?",
  server: "yomathisql.database.windows.net",
  database: "monitoringdata",
};

sql.connect(config)
var request = new sql.Request();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://monitoringyoussef.z5.web.core.windows.net"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });


app.get("/total", (req, res)=> {
    request.query(
      "SELECT SUM(Cost) as total FROM [dbo].[monitoring3]",
      (err, result) => {
        console.log(err, result);
        const totale = Math.round((result.recordset[0].total)*100)/100
        const rep = `${totale} euros`;
        res.send(rep);
      }
    );
    // res.json({id : "salut"})
    
})

app.get("/Localisation/:search", (req, res) => {

    const {search} = req.params;

    request.query(
      `SELECT SUM(Cost) FROM [dbo].[monitoring3] WHERE SubscriptionName = '${search}'`,
      (err, result) => {
        console.log(search);
        const totale = Math.round(Object.values(result.recordset[0]) * 100) / 100;
        const rep = `${totale} euros`;
        res.send(rep);
      }
    );
})
app.get("/Ressource/:search", (req, res) => {

    const {search} = req.params;

    request.query(
      `SELECT SUM(Cost) as total FROM [dbo].[monitoring3] WHERE ServiceName = '${search}'`,
      (err, result) => {
        console.log(err, result);
        const totale =
          Math.round(Object.values(result.recordset[0]) * 100) / 100;
        const rep = `${totale} euros`;
        res.send(rep);
      }
    );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});