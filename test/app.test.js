const App = require('../app.js');

describe('Leer un directorio', () => {
    //Así se testea algo con promesas
    test('Debería ser capaz de leer el directorio del programa', () => {
        expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
        return App.readDirPromise(__dirname)
            .then((files) => {
                expect(files).toContain('app.test.js');
            }).catch((error) => {

            });
    });
    //Así se testea algo con callbacks
    test('Debería darme el número de archivos de un directorio', (done) => {
        App.numberOfTheBeastCallback(__dirname, (error, result) => {
            expect(result).toBe(1);
            done();
        });
    });
});