# busca-minas


## API

se utilizo un servidor NODE con Express que se instala rapidamente y su implementacion es simple

para instalar las librerias en el ambiente que se va a correr, (desde el directorio /api) ejecutar:

```bash
$ npm install
```

para correr el servidor api REST desde el directorio raiz:

```bash
$ node api/app.js
```

inicia el servidor en http://localhost:3000

(para su uso y testeo en ambiente local se habilitaron las llamadas curl modificando los HEADERS que espera el servidor)

## cliente

el cliente es un archivo index.html que accede al recurso (POST) http://localhost:3000/grid
utilizando ajax de la libreria JQuery



