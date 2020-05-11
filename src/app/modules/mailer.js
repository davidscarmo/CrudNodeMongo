const path = require('path');  
const nodemailer = require('nodemailer'); 
const hbs = require('nodemailer-express-handlebars');

const{ host, port, user, pass} = require('../../config/mail.json');

const transport = nodemailer.createTransport(
    {
       host, 
       port, 
       auth: {user, pass},
  });

  transport.use('compile', hbs(
      {
        viewEngine: 
        {
          defaultLayout: undefined,
          partialsDir: path.resolve('./src/resources/mail/') // https://pt.stackoverflow.com/questions/400935/erro-nodejs-a-partials-dir-must-be-a-string-or-config-object
        },
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.html',

      }
  ));
  module.exports = transport; 