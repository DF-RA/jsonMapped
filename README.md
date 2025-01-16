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

### mapping-json {jsonFile}

Este comando permite crear un mapa de jsonPath de cada campo y crear un archivo txt con esta data.

Para usarlo solo tenemos que colocar la ruta del archivo .json en el parametro 'jsonFile'

Un ejemplo: 
```bash
mapping-json ./data/maps/info.json
```

Esto nos va a mostrar en consola una lista de rutas de jsonPath de cada dampo y a la vez va a crear en la misma ruta del archivo json, un nuevo archivo con el mismo nombre pero con '_result.text' al final. Para el comando anterior quedaria con el nombre 'info_result.text'


### validate-json-layout {textMap}.txt {pathWithJsons}
Este comando permite validar la estructura de una lista de jsons a partir de una lista de jsonPaths de un archivo de texto plano.

Si queremos validar la estructura de este json

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

con este mapa

```text
$.id
$.name
$.rows[*]
$.rows[*].name
$.fields
$.fields.name
```

Tenemos que guardar el json en un directorio diferente al archivo plano (para este caso en la misma ruta crearemos data) y correr el comando

```bash
validate-json-layout info.text ./data
```

El cual nos retornara una estructura CSV con el resultado que seria el siguiente:

```csv
path,field,exists
$.id,id,true
$.name,name,false
$.rows[*],rows,true
$.rows[*].name,name,true
$.fields,fields,true
$.fields.name,name,true
```

Donde el campo exists indica si esa ruta del mapa existe en el json que estamos validando.

Aparte creara en la misma ruta del archivo plano un nuevo archivo con su mismo nombre agregando '_result.csv' con la misma data que se mostro en consola.