const express = require('express');
const exprHBS = require('express-handlebars');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const cors = require('cors')

let app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

const hbs = exprHBS.create({
    defaultLayout:'rmain',
    extname: 'hbs',
})

app.get('/',(req,res) => {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
})

app.post('/api/submit', upload.single('file'), (req,res) => {
    const text = req.body;
    const file = req.file;

    console.log(`file uploaded ${file.filename}`);
    if (file) {
        console.log(`your info ${text}`);
    };
    res.json({message: "data successfuly",text})
})


app.listen(port, () => {
    console.log('the page has just been started')
})

