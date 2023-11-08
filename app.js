//Se utilizan las declaraciones const para importar varios módulos necesarios en el programa
//se importa el modulo 'colors', que proporciona colores y estilos de texto para la consola. Permite dar formato al texto que se mostrará en la consola
        const colors = require('colors');
//: Aquí se importa el módulo fs con la propiedad .promises. fs es el módulo de sistema de archivos que se utiliza para interactuar con archivos y directorios en Node.js.
        const fs = require('fs').promises;
//Se crea una interfaz de lectura/escritura llamada readline que permite interactuar con el usuario a través de la consola
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
// Define una clase Producto que representa un producto.
        class Producto {
//Dentro de la clase, se utilizan propiedades privadas (#) para almacenar información sobre el producto, como el código, nombre, inventario y precio.
            #codigoproducto;
            #nombreproducto;
            #inventarioproducto;
            #precioproducto;
        constructor() {
            this.#codigoproducto = '';
            this.#nombreproducto = '';
            this.#inventarioproducto = 0;
            this.#precioproducto = 0;
        }
//e proporcionan métodos get y set para acceder y modificar estas propiedades
        get codigoproducto() {
            return this.#codigoproducto;
        }

        set codigoproducto(codigo) {
            this.#codigoproducto = codigo;
        }

        get nombreproducto() {
            return this.#nombreproducto;
        }

        set nombreproducto(nombre) {
            this.#nombreproducto = nombre;
        }

        get inventarioproducto() {
            return this.#inventarioproducto;
        }

        set inventarioproducto(inventario) {
            this.#inventarioproducto = inventario;
        }

        get precioproducto() {
            return this.#precioproducto;
        }

        set precioproducto(precio) {
            this.#precioproducto = precio;
        }
    }   
//Se define una clase llamada ProductosTienda que representa una colección de productos en una tienda.
        class ProductosTienda {
//Dentro de la clase, se utiliza una propiedad privada (#listaproductos) para almacenar una lista de productos
            #listaproductos;
            constructor() {
                this.#listaproductos = [];
            }
// Método getter y setter para la lista de productos para acceder y modificar esta lista.
        get listaproductos() {
            return this.#listaproductos;
        }

        set listaproductos(lista) {
            this.#listaproductos = lista;
    }
//También se define un método llamado mostrarproductos() que recorre la lista de productos y muestra la información de cada producto en la consola con formato
        mostrarproductos() {
            this.#listaproductos.forEach((producto) => {
            console.log(
        `|     ` +
        producto.codigoproducto +
        `     |` +
        `      ` +
        producto.nombreproducto +
        `     |` +
        `      ` +
        producto.inventarioproducto +
        `     |` +
        `      ` +
        producto.precioproducto +
        `     |`
    );
    });
}
}
//Esta función se encarga de cargar datos de productos desde un archivo JSON llamado "datos.json"
    const cargaarchivoproductos = async (productostienda) => {
        try {
//Se utiliza await para esperar a que la lectura del archivo se complete antes de continuar
//Si la lectura del archivo es correcta o sale bien los datos se analizan como JSON y se almacenan en la propiedad listaproductos del objeto productostienda
        const data = await fs.readFile('./datos.json', 'utf-8');
        productostienda.listaproductos = JSON.parse(data);
        console.log(`Productos cargados desde datos.json`.bgBlue);
//Si ocurre algún error en la lectura del archivo, se captura en el bloque catch, y se muestra un mensaje de error en la consola
    } catch (error) {
        console.error(`Error al cargar el archivo: ${error.message}`.bgRed);
    }
    };
//Esta función agrega un nuevo producto a la lista de productos (listaproductos) del objeto productostienda.
    const agregarProducto = async (productostienda, nuevoProducto) => {
    productostienda.listaproductos.push(nuevoProducto);
//Luego, muestra un mensaje en la consola indicando que el producto ha sido agregado, junto con los detalles del producto.
    console.log(`Producto agregado:`.bgGreen);
    console.log(nuevoProducto);
//Llama a la función grabararchivoproductos para guardar la lista de productos en el archivo JSON
        await grabararchivoproductos(productostienda.listaproductos.map(producto => ({
        codigoproducto: producto.codigoproducto,
        nombreproducto: producto.nombreproducto,
        inventarioproducto: producto.inventarioproducto,
        precioproducto: producto.precioproducto,
        })));
        };
// Función para grabar la lista de productos en un archivo JSON
//Esta función toma la lista de productos y la convierte en una cadena JSON con formato legible utilizando JSON.stringify
    const grabararchivoproductos = async (listaproductos) => {
        try {
        const cadenaJson = JSON.stringify(listaproductos, null, 2);
        const nombrearchivo = './datos.json';
//Luego, utiliza await para escribir esta cadena JSON en el archivo "datos.json"
            await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');
        console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
//Si ocurre algún error al escribir en el archivo, se captura en el bloque catch, y se muestra un mensaje de error en la consola
    } catch (error) {
        console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
    }
    };
// Función para mostrar un menú de opciones
//Esta función muestra un menú en la consola con tres opciones: crear un nuevo producto, listar productos y salir
    const mostrarMenu = () => {
        return new Promise((resolve) => {
//Utiliza una Promise para recopilar la selección del usuario. Cuando el usuario ingresa una opción y presiona Enter, la promesa se resuelve con la opción seleccionada
            console.log(`=========================`.green);
            console.log(`     Seleccione una opción    `.green);
            console.log(`=========================\n`.green);
            console.log(`${'1'.green} Crear nuevo producto`);
            console.log(`${'2'.green} Listar productos`);
            console.log(`${'3'.green} Salir\n`);
//La función readline.question se utiliza para recibir la entrada del usuario y, una vez que se recibe la entrada, se resuelve la promesa con la opción seleccionada
        readline.question('Seleccione una opción: ', (opt) => {
            resolve(opt);
            });
        });
    };
// Función para pausar y esperar una entrada del usuario Esta función muestra un mensaje en la consola para indicar al usuario que presione "ENTER" para continuar
    const pausa = () => {
        return new Promise((resolve) => {
//Utiliza readline.question para esperar hasta que el usuario presione "ENTER". Cuando se presiona "ENTER", la promesa se resuelve.
            readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
            resolve();
        });
    });
    };
// Función para obtener detalles de un nuevo producto del usuario
//Esta función permite al usuario ingresar detalles de un nuevo producto, como el código, el nombre, el inventario y el precio del producto.
    const obtenerDetallesProducto = async () => {
        return new Promise((resolve) => {
//Se crea una instancia de Producto llamada nuevoProducto.
            const nuevoProducto = new Producto();
//Utiliza múltiples llamadas a readline.question anidadas para recopilar los detalles uno por uno
////Cada llamada a readline.question recoge una entrada del usuario y la asigna a la propiedad correspondiente del objeto nuevoProducto
            readline.question('Código del producto: ', (codigo) => {
            nuevoProducto.codigoproducto = codigo;
            readline.question('Nombre del producto: ', (nombre) => {
            nuevoProducto.nombreproducto = nombre;
            readline.question('Inventario del producto: ', (inventario) => {
            nuevoProducto.inventarioproducto = parseInt(inventario);
            readline.question('Precio del producto: ', (precio) => {
                nuevoProducto.precioproducto = parseFloat(precio);
                resolve(nuevoProducto);
//Finalmente, se resuelve la promesa con el objeto nuevoProducto que contiene los detalles ingresados por el usuario.
                    });
                });
            });
        });
    });
    };
// Función principal que ejecuta el programa
    const main = async () => {
//Limpia la consola y muestra un encabezado en la parte superior
        console.clear();
        console.log('***********************');
        console.log('**  PROYECTO CLASES  **');
        console.log('***********************\n');

//Se crea una instancia de ProductosTienda llamada productostienda para gestionar los productos.
    let productostienda = new ProductosTienda();    
//Se llama a la función cargaarchivoproductos para cargar productos desde un archivo JSON si existe.
    await cargaarchivoproductos(productostienda);
//Se inicializa una variable salir con el valor false, que se utiliza para controlar el bucle principal del programa
    let salir = false;
//En el bucle while, el programa muestra un menú al usuario mediante la función mostrarMenu y almacena la opción seleccionada en la variable opcion
        while (!salir) {
        const opcion = await mostrarMenu();

            switch (opcion) {
        case '1':
        
        console.log(`Ingrese los detalles del nuevo producto:`.bgBlue);
            const nuevoProducto = await obtenerDetallesProducto();
            console.log(`Producto agregado:`.bgGreen);
            console.log(nuevoProducto);
            await agregarProducto(productostienda, nuevoProducto);
            await pausa();
            break;

        case '2':

            console.log(`Listado de productos:`.bgBlue);
            productostienda.mostrarproductos();
            await pausa();
            break;
        case '3':

            salir = true;
            break;
            default:
            console.log(`Opción no válida. Por favor, seleccione una opción válida.`.bgRed);
            await pausa();
            break;
        }
    }
//Después de salir del bucle, se cierra la interfaz de  readline con readline.close()
        readline.close();
//imprime un mensaje de agardecimiento 
            console.log('¡Gracias por usar el programa!'.bgCyan);
    };
// Llama a la función principal para iniciar el programa
    main();