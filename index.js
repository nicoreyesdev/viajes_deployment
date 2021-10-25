import express from "express";
import router from './routes/index.js'
import db from "./config/db.js"
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//conectar a base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir puerto y host para la app 
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';
//Habilita pug
app.set('view engine', 'pug');

//obtener el año actual
app.use((req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
})

//agregar body parser para form
app.use(express.urlencoded({extended:true}));

//Definir carpeta publica
app.use(express.static('public'));


//Agrega router
app.use('/', router);


app.listen(port, host, () => {
    console.log(`${port}`)
})