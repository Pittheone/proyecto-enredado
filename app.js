const yargs = require('yargs');
const fs = require('fs');

const filePath = 'tareas.json';

// Cargar tareas desde un archivo JSON
const cargarTareas = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
};

// Guardar tareas en el archivo JSON
const guardarTareas = (tareas) => {
    fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2));
};

// Comando para agregar una tarea
yargs.command({
    command: 'agregar',
    describe: 'Agrega una nueva tarea',
    builder: {
        descripcion: {
            describe: 'Descripción de la tarea',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const tareas = cargarTareas();
        tareas.push({ descripcion: argv.descripcion });
        guardarTareas(tareas);
        console.log('Tarea agregada:', argv.descripcion);
    }
});

// Comando para eliminar una tarea
yargs.command({
    command: 'eliminar',
    describe: 'Elimina una tarea',
    builder: {
        descripcion: {
            describe: 'Descripción de la tarea a eliminar',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        let tareas = cargarTareas();
        const tareasFiltradas = tareas.filter(t => t.descripcion !== argv.descripcion);
        if (tareas.length === tareasFiltradas.length) {
            console.log('No se encontró la tarea.');
        } else {
            guardarTareas(tareasFiltradas);
            console.log('Tarea eliminada:', argv.descripcion);
        }
    }
});

// Procesar los argumentos
yargs.parse();
