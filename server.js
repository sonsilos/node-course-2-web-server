const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = now + ':' + req.method + req.url;
    fs.appendFile('server.log', log + '\n', function(){
        console.log(now + ':' + req.method + req.url);
    });
    next();
})

// app.use((req, res, next)=>{
//     res.render('maintenance',{
//         pageTitle: 'maintenance Page',
//         pageDetail: 'maintenance Page Detail',
//         currentYear: new Date().getFullYear() + 1 
//     });
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

hbs.registerHelper('getCurrenMonth', () =>{
    return new Date().getMonth()
});

app.get('/', (req, res)=>{
    //res.send('<h1>Hello express!</h1>');
    res.send({
        name: 'Sonsilos',
        Address: '93/446',
        links: [
            'blog',
            'porn'
        ]

    });
});
app.get('/home', (req, res)=>{
    res.render('home',{
        pageTitle: 'Home Page',
        pageDetail: 'Home Page Detail',
        currentYear: new Date().getFullYear() + 1 
    });
});
app.get('/about', (req, res)=>{
    res.render('about',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear() + 1 
    });
});
app.get('/about2', (req, res)=>{
    res.send('<h1>About page!</h1>');
});
app.get('/project', (req, res)=>{
    res.render('project',{
        pageTitle: 'project Page',
        pageDetail: 'project Page Detail',
        currentYear: new Date().getFullYear() + 1 
    });
});
app.get('/bad', (req, res)=>{
    res.send({
        status: 'error',
        statusCode : 400,
        errorMessage: 'unable to handle request'
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))