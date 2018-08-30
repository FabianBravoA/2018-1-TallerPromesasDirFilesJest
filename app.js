const fs = require('fs');
const path = require('path');

/*
 * Función que lee un archivo y retorna promesa con su contenido
 */
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            console.log("Chao");
            if (error) {
                return reject(error); //Sabemos que hay un error, así que rechazamos la promesa
                //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
            }
            return resolve(data); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        });
        //"Holi" aparecerá antes que "Chao", puesto que readFile es no bloqueante y toma mucho tiempo
        //Entonces, los resultados serán entregados a través de un callback
        console.log("Holi");
    });
};

function readDirPromise(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (error, files) => {
            if (error) {
                return reject(error);
            }
            return resolve(files);
        })
    });
}

function numberOfTheBeastCallback(dirpath, funcionquerecibeelresultado) {
    fs.readdir(dirpath, (error, files) => {
        //PROHIBIDO : return files.length;
        funcionquerecibeelresultado(error, files.length);
    });
}

function numberOfTheBeastPromise(dirpath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirpath, (error, files) => {
            if (error) {
                return reject(error);
            }
            return resolve(files.length);
        });
    });
}

console.log("Process.argv > " + JSON.stringify(process.argv));
console.log("CWD > " + process.cwd()); // Me va a indicar donde se está ejecutando el archivo
const [, , ...userCLIArgs] = process.argv;
//Process.argv > ["/usr/bin/node","/home/fabian/Projects/Clases/2018-1-TallerPromesasPathTerminal/app.js"]
//Por cada espacio se hace un nuevo elemento en process.argv 
console.log("User args > " + JSON.stringify(userCLIArgs));
//User args > ["HoliHoli","--validate","--stats"]

let miPromesa = readDirPromise(process.cwd());

numberOfTheBeastCallback(process.cwd(), (error, resultado) => {
    console.log("Resultado > " + resultado);
});

numberOfTheBeastPromise(process.cwd())
    .then((result) => {
        console.log("Resultado promesa > " + result);
    })
    .catch((error) => {
        console.error("Error promesa > " + error);
    });

let miVariableNoTanGlobal;
let miErrorNoTanGlobal;
miPromesa.then((dirFiles) => {
    const filePromises = dirFiles.map((aFile) => {
        return readFilePromise(aFile);
    });

    return Promise.all(filePromises); //Retorno promesa
}).then((filesData) => { //Recibo los resultados de la promesa que se retornó en el then anterior
    miVariableNoTanGlobal = filesData;
}).catch((error) => {
    console.error("Error > " + error);
    miErrorNoTanGlobal = error;
}).finally(() => { // Es una función que se ejecuta después de TODO
    console.log("Variable no tan global > " + JSON.stringify(miVariableNoTanGlobal));
});

module.exports = {
    'readDirPromise': readDirPromise,
    'readFilePromise': readFilePromise,
    'numberOfTheBeastCallback': numberOfTheBeastCallback
};