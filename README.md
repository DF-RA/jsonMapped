# Mapeados de jsons

Este herramienta nos entrega una lista de comandos de consola para obtener un mapa de direcciones jsonPath a partir de un json

Permite incluso validar a partir de una lista de directorios, identificar que rutas existen en una lista de jsons.

## Requisitos Técnicos

- Node
- pnpm

## Instalación

Primero instalamos las dependencias con PNPM en el proyecto

```bash
pnpm i
```

Luego de esto, tenemos que activar los comandos con npm link

```bash
npm link
```

Ya con esto, tenemos los comandos disponibles.

## Uso:

### jsonpath-mapping {jsonFile}

Crea un mapa en formato jsonPath de un json.

Creara un archivo en la misma ruta del mapa con el mismo nombre agregando '_map.text' al final


Donde:
- jsonFile: Es la ruta del json

Un ejemplo: 
```bash
jsonpath-mapping ./info.json
```

Ejemplo: 

Json

```json
{
	"id": 1,
	"fields": {
		"name": "hola"
	},
	"rows": [
		{
			"name": "chao"
		}
	]

}
```
Resultado

```text
$.id
$.fields
$.fields.name
$.rows[*]
$.rows[*].name
```


### jsonpath-verify {textMap} {pathData}
Valida la estructura de un json a partir de un mapa con estructura JsonPath.

Creara un archivo en la misma ruta del mapa con el mismo nombre agregando '_result.csv' al final

Donde:
- jsonPath: Es la ruta del campo
- field: Es el nombre del campo en camelCase
- mapped: Indica si la ruta del jsonpath existe en el json

```bash
jsonpath-verify ./info_map.text ./info.json
```

NOTA: En caso de que tienes una lista de jsons variables y quieres agruparlos a todos como un unico json a validar, puedes guardarlos en una carpeta y pasar en el segundo parametro la ruta a esta carpeta

```bash
jsonpath-verify ./info_map.text ./info_jsons
```

Ejemplo: 

Mapa

```text
$.id
$.name
$.rows[*]
$.rows[*].name
$.fields
$.fields.name
```

Json

```json
{
	"id": 1,
	"fields": {
		"name": "hola"
	},
	"rows": [
		{
			"name": "chao"
		}
	]

}
```

Resultado

```csv
jsonPath,field,mapped
$.id,id,true
$.name,name,false
$.rows[*],rows,true
$.rows[*].name,name,true
$.fields,fields,true
$.fields.name,name,true
```

## Parametros

Si quiere ver en consola el contenido del archivo, puede usar -s o --show