const mongoose = require('mongoose'); 

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true, useUnifiedTopology: true }); 


module.exports = mongoose; 
