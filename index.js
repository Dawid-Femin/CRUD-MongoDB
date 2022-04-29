const mongo = require('mongodb');

const client = new mongo.MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

function addNewTodo(todosCollection, title) {
    todosCollection.insertOne({
        title,
        done: false,
    }, err => {
        if (err) {
            console.log('Błąd podczas dodawania!', err);
        } else {
            console.log('Zadanie dodane.');
        }

        client.close();
    });
}

function doTheToDo(todosCollection) {
    const [command, ...args] = process.argv.splice(2);

    switch (command) {
        case 'add':
            addNewTodo(todosCollection, args[0]);
            break;
        
        default:
            console.log(`
Dostępne komendy:

add <nazwa zadania> - dodaje zadanie do wykonania
`);
            client.close();
            break;
    }
}

client.connect(err => {
    if (err) {
        console.log('Błąd połączenia!', err);
    } else {
        console.log('Połączenie udane!');

        const db = client.db('test');

        const todosCollection = db.collection('todos');

        doTheToDo(todosCollection);
    }
});