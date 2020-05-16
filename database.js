const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialugr', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(err => console.error(err));