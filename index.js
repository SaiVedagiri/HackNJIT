const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const path = require('path')
var request = require("request");
var unirest = require("unirest");
var screenshotmachine = require('screenshotmachine');

const PORT = process.env.PORT || 5000
const API_KEY = "AIzaSyDhkJ2yT06tRwXIMEUp9xaj2-LxOnKyvGY";

const app = express();
let state = "default";
let url1;
let url2;
let url3;
let url4;
let url5;
let fromNum;

getImage();
function sendMessage(message, req, res) {
  const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
  const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: ":\n" + message,
      from: '+12015847119',
      to: fromNum
    })
    .then(message => res.send(message));
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res) {
    console.log(typeof (req.params.test));
    res.send(req);
  })
  .get('/api', function (req, res) {
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: "Website Image",
        from: '+12015847119',
        to: '+19179404729'
      })
      .then(message => console.log(message.sid));
  })
  .post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    //console.log(req);
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);
    client.messages.list({ limit: 1 })
      .then(messages => checkInput(messages[0].body, messages[0].from, req, res));
    //twiml.message(myMessage);
    //console.log(myMessage);
    //res.writeHead(200, { 'Content-Type': 'text/xml' });
    //res.end(twiml.toString());
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))


//get input from Arya
async function checkInput(input, currentFromNum, req, res) {
  fromNum = currentFromNum;
  input = input.trim();
  input = input.toLowerCase();
  if (state == "news") {
    if (input.includes("1"))
    {
      makeRequestArticle(url1, res);
      state = "default";

    }
    else if (input.includes("2"))
    {
      makeRequestArticle(url2, res);
      state = "default";

    }
    else if (input.includes("3"))
    {
      makeRequestArticle(url3, res);
      state = "default";

    }
    else if (input.includes("4"))
    {
      makeRequestArticle(url4, res);
      state = "default";

    }
    else if (input.includes("5"))
    {
      console.log(url5);
      makeRequestArticle(url5, res);
      state = "default";
    }
  }
  else if (input.includes("info")) {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i] == "about" || words[i] == "on") {
        var index = i;
        console.log("index:" + index);
        break;
      }
    }
    let search = "";
    for (i = index + 1; i < words.length; i++) {
      search += words[i];
    }
    makeRequestWikipedia(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`, req, res);
  }
  else if (input.toLowerCase().trim().includes("news")) {
    makeRequestNews(`https://newsapi.org/v2/top-headlines?country=us&apiKey=9e06d9d66c7440d995c78259238d4e68`, req, res);
  }

  else if (input.includes("weather")) {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i] == "in" || words[i] == "on" || words[i] == "for") {
        var index = i;
        console.log("index:" + index);
        break;
      }
    }
    let search = "";
    for (i = index + 1; i < words.length; i++) {
      search += words[i];
    }
    makeRequestWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search}&apikey=d4aba2f6472ab5c29ac2771336221dd8`, req, res)
  }
}

async function makeRequestWikipedia(uri, req, res) {
  await request({
    uri: uri,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendMessage(JSON.parse(body).extract, req, res);
    });
}

async function makeRequestNews(uri, req, res) {
  await request({
    uri: uri,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendMessage("Enter 1 to read " + JSON.parse(body).articles[0].title + 
      "\n\nEnter 2 to read " + JSON.parse(body).articles[1].title + 
      "\n\nEnter 3 to read " + JSON.parse(body).articles[2].title + 
      "\n\nEnter 4 to read " + JSON.parse(body).articles[3].title + 
      "\n\nEnter 5 to read " + JSON.parse(body).articles[4].title, req, res)
      url1 = JSON.parse(body).articles[0].url;
      url2 = JSON.parse(body).articles[1].url;
      url3 = JSON.parse(body).articles[2].url;
      url4 = JSON.parse(body).articles[3].url;
      url5 = JSON.parse(body).articles[4].url;
      state = "news";
    });

}

async function makeRequestWeather(uri, req, res) {
  await request({
    uri: uri,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendMessage("Weather Type: " + JSON.parse(body).weather[0].main + 
      "\n\nDescription: " + JSON.parse(body).weather[0].description + 
      "\n\nTemperature: " + Math.round((JSON.parse(body).main.temp - 273.15) * 9.0 / 5 + 32) + " degrees Farenheit", req, res);
    });
}
async function makeRequestArticle(url, res) {

  console.log(url);
  var req = unirest("GET", "https://lexper.p.rapidapi.com/v1.1/extract");

  req.query({
    "media": "1",
    "url": url
  });

  req.headers({
    "x-rapidapi-host": "lexper.p.rapidapi.com",
    "x-rapidapi-key": "fcaaf11ba6mshddd853da7d73799p1a634djsnc1d151d36750"
  });

  let banana;
  await req.end(async function (res) {
    if (res.error) throw new Error(res.error);

    banana = await res.body.article.text;
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);

    await sendMessage(banana, req, res);

  });


}


function getImage()
{
var customerKey = '95b49b';
    secretPhrase = ''; //leave secret phrase empty, if not needed
    options = {
      //mandatory parameter
      url : 'https://www.google.com/search?biw=1536&bih=754&tbm=isch&sa=1&ei=IDfHXeu0PIid_QbroqigDg&q=banana&oq=banana&gs_l=img.3..0i67l6j0j0i67l3.1351.3572..3702...1.0..1.68.1087.22......0....1..gws-wiz-img.....0.gRg9-HCxZaI&ved=0ahUKEwjrxMzHkN7lAhWITt8KHWsRCuQQ4dUDCAc&uact=5',
      // all next parameters are optional, see our website screenshot API guide for more details
      dimension : '1366xfull', // or "1366xfull" for full length screenshot
      device : 'desktop',
      format: 'png',
      cacheLimit: '0',
      delay: '200',
      zoom: '100'
    }


var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

//put link to your html code
console.log('<img src="' + apiUrl + '">');

//or save screenshot as an image
var fs = require('fs');
var output = 'output.png';
screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', function() {
  console.log('Screenshot saved as ' + output);
}));
}