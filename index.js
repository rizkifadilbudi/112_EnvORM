const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');
const { Result } = require('pg');
app.use(express.json());
app.use(express.urlencoded({
    extented:false
}));

app.listen(PORT, () => {
    console.log('server started on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(PORT,() => {
            console.log('server started on port ' + PORT);
        });
    })
    .catch((err) => {
        console.log(err)
    })

app.post("/komik", async(req, res)=> {
    const data = req.body;
    try {
        const komik = await db.komik.create(data);
        res.send(komik);
    } catch (err) {
        res.send(err)
    }
})
