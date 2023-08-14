# Prueba tecnica SWAPI

## Endpoints seleccionados

planets
people
films

## Tecnologías

node 18

typescript

jest, mock

serverlees

dynamodb

diversos plugins

aws-sdk, aws-lambda, middy y demas


---

linter

prettier

editorconfig


---

Thunder Client (apis)

## Requerimientos

Tener una un access key y secret key a aws, para el despliegue de los lambda
configurarlo en la maquina host con aws-cli
```sh
aws configure
```


```
npm install -g serverless # Herramienta de despliegue a aws
npm install #instalar los paquetes
```

## Estructura

src : se ubica los metodos lambda    
    addPlanet
    getPlanet

persistence
    dynamodb

## Ejecución

Despues de configurar el aws-cli, hay dos modo de ejecución uno desde aws y otro de manera local
Desde aws se despliega con 
```
 npm run build

 serverless deploy 
```
Esto creara el stack, que posee las funciones y la tabla dynamo donde se almacena

...

## Ejecución local

Consultar la api externa

```
serverless invoke local --function getPlanetExterno --path data-test/dataGetExterno.json
```

Consultar 
```
serverless invoke local --function getPlanet --path data-test/dataGet.json
```

Insertar
```
serverless invoke local --function addPlanet --path data-test/dataAddPlanet.json
```

pero antes editar la linea 39 al 41 con un nuevo id 

```
    "pathParameters": {
        "id": "{nuevo_id_generado}"
    },    
```    

## Evidencia