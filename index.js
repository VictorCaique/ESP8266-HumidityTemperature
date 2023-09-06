const express = require("express")

const app = express()

app.listen(8081, function(){

    console.log("Conectado com sucesso!")

})

const Sequelize = require("sequelize")

// const sequelize = new Sequelize("esp32", "root", "",{

//     host: "localhost",

//     dialect: "mysql"

// })

const sequelize = new Sequelize("postgres://host:xHLPnGS334OMHn8dU9WAykklYV8tV3Oy@dpg-cjsfame3m8ac73ckaegg-a.oregon-postgres.render.com/esp8266?ssl=true" );

sequelize.authenticate().then(function(){

    console.log("Conectado com sucesso!")

}).catch(function(erro){

    console.log("Falha ao conectar: " + erro)

})

const Sensor = sequelize.define("sensors",{

    temperatura:{

        type: Sequelize.INTEGER

    },

    umidade:{

        type: Sequelize.INTEGER

    }

 

})

Sensor.sync({force: true})

app.get("/",function(req, res){

    res.send("Projeto Esp")

})

app.get("/cadastrar/:temperatura/:umidade",function(req, res){

    Sensor.create({

        temperatura: req.params.temperatura,

        umidade: req.params.umidade

    }).then(function(){

        console.log("Cadastrado com sucesso!")

    }).catch(function(erro){

        console.log("Falha ao cadastrar os dados: " + erro)

    })

    res.redirect("/")

})

app.get('/selectall', async function(req, res) {
    res.send(await Sensor.findAll());
})