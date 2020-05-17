const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialugr', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(err => console.error(err));