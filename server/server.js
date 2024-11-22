const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

/*
exec('ls', (error, stdout, stderr) => {
  if (error) {
    console.error(`Błąd: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Błąd standardowy: ${stderr}`);
    return;
  }
  console.log(`Wynik: ${stdout}`);
});

*/

const app = express();
app.listen(4000, ()=>{
    console.log("http://10.40.50.201:4000");
});

let corsConfig = {
  origin:"*",
  methods: "GET,POST",
  credential: true
}

app.use(express.static('public/browser'));
app.use(cors(corsConfig))

app.get('/whois', (req, res)=>{
    const { domena } = req.query;
    let regex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,}|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|([A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4})$/gi
    if(regex.test(domena)){
        exec(`whois ${domena}`, (error, stdout, stderr) => {
            res.json({data:stdout, error, stderr});
        })

    }

})