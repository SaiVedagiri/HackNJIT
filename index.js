const express = require('express')
const path = require('path')
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000
const API_KEY = "AIzaSyDhkJ2yT06tRwXIMEUp9xaj2-LxOnKyvGY";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://macrotech:_axoK8tywv_y.iQ4f_RM@syncfast-5m6k8.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/api', function (req, res) {
    res.send("Hello World");
  })
  .post('/api', function(req, res) {
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: req.body,
        from: '+12015847119',
        to: '+18484681542'
      })
      .then(message => console.log(message.sid));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  /*
  text = "Hello World"
  document = types.Document(
    content=text.encode('utf-8'),
    type=enums.Document.Type.PLAIN_TEXT)

    {
  "document": {
    object(document)
  },
  "encodingType": enum(UTF8)
}
  
 
  

 POST https://language.googleapis.com/v1beta2/documents:analyzeEntities?key=API_KEY
*/
