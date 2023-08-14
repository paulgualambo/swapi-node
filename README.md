# Prueba tecnica SWAPI

## Endpoints seleccionados

planets  swapi.py4e.com/api/planets/1/

vehicle  https://swapi.py4e.com/api/vehicles/4/

## Tecnologías

node 18

typescript

babel

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
    getPlanetExterno
    addVehicle
    getVehicle
    getVehicleExterno

persistence
    dynamodb

## Ejecución

Despues de configurar el aws-cli, hay dos modo de ejecución uno desde aws y otro de manera local
Desde aws se despliega con 
```
 npm run build

 serverless deploy 
```
Esto creara el stack, que posee las funciones y las tablas dynamo donde se almacena los registros

...



## Evidencia

### Recursos AWS

Stack

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/2d6cae8e-1273-46e0-b4ed-2b9159c683fb)

Apigateway

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/9d4098bc-5d31-44e5-8daf-28134a9c7794)

Funciones Lambda

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/1bdd6822-cd4d-4899-8a70-18aa68795179)

Tablas dynamo

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/c8cb6c0f-b4ae-448a-abcf-cb1175bd14e4)

planet

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/00732526-f9e7-4663-a127-259057837824)

vehicle

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/b19d2ad1-b13d-4a0f-83d4-e5206a5c514c)


### Thunder Client

Invocando los endpoinst

GetPlanetExterno

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/968788f1-5771-499b-9b87-863651703c6e)

AddPlanet

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/82038ab0-880c-4648-ade6-d7e99205b024)

GetPlanet

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/ddf71e21-f3ce-41a8-aad7-c66c447a08b3)

GetVehicleExterno

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/ef6f3629-5b03-4e39-aeb0-ca9978fdeb52)

AddVehicle

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/da7d7302-d191-49c9-8d78-892364cf39a1)

GetVehicle

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/63d6aa8e-ea8a-4b72-b3cb-b862b3a4eed2)



## Test 

Se realizo con Jest

```
 npm test -- --coverage
```

![image](https://github.com/paulgualambo/swapi-node/assets/2517404/7e0ff374-73da-4ab0-9a12-f1a3d64b4e4d)


## Ejecución local

### Planet
Consultar la api externa

```
serverless invoke local --function getPlanetExterno --path data-test/dataGetExterno.json
```

Insertar
```
serverless invoke local --function addPlanet --path data-test/dataAddPlanet.json
```

Consultar 
```
serverless invoke local --function getPlanet --path data-test/dataGet.json
```



pero antes editar la linea 39 al 41 con un nuevo id 

```
    "pathParameters": {
        "id": "{nuevo_id_generado}"
    },    
```    
