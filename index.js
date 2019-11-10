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

app.post('/sms', (req, res) => {
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

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

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

function sendImage(media, req, res) {
  const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
  const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      from: '+12015847119',
      mediaUrl:[media],
      to: fromNum
    })
    .then(message => console.log(media));
}
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/output.png', function (req, res) {
    res.sendFile(__dirname + "/output.png");
  })
  .get('/api', function (req, res) {
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Website Image",
        from: '+12015847119',
        mediaUrl: ['https://hacknjit.azurewebsites.net/output.png'],
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
    if (input.includes("1")) {
      makeRequestArticle(url1, req, res);
      state = "default";

    }
    else if (input.includes("2")) {
      makeRequestArticle(url2, req, res);
      state = "default";

    }
    else if (input.includes("3")) {
      makeRequestArticle(url3, req, res);
      state = "default";

    }
    else if (input.includes("4")) {
      makeRequestArticle(url4, req, res);
      state = "default";

    }
    else if (input.includes("5")) {
      makeRequestArticle(url5, req, res);
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
    makeRequestWikipedia(search, req, res);
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
    makeRequestWeather(search, req, res)
  }

  else if (input.includes("direction")) {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i] == "from") {
        var from = i;
        if (words[i] == "to") {
          var to = i;
        }
      }
    }
    let home;
    for (let i = from; i < to; i++) {
      home += words[i];
    }
    let destination;
    for (let i = to; i < words.length; i++) {
      destination = words[i];
    }
    makeRequestDirections(home, destination, req, res);
  }

  else if (input.includes("gif")) {
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
    makeRequestGif(search, req, res);
  }

  else{
    getImage(input);  
  }
}

async function makeRequestGif(search, req, res)
{
  await request({
    uri: `https://api.giphy.com/v1/gifs/search?api_key=CtDHcuog6ZG2IM52AUkK15WRlIYhNHl5&q=${search}`,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendImage(JSON.parse(body).data[0].images.original.url, req, res);
    });
}
async function makeRequestWikipedia(search, req, res) {
  await request({
    uri: `https://en.wikipedia.org/api/rest_v1/page/summary/${search}`,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendMessage(JSON.parse(body).extract, req, res);
    });
    await request({
      uri: `https://kgsearch.googleapis.com/v1/entities:search?query=${search}&key=AIzaSyCiXaUN4yK14KqHFj1Nn76TbQ9PxryFyf0&limit=1&indent=True`,
      method: "GET", 
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    },
      async function (error, response, body) {
        sendImage(JSON.parse(body).itemListElement[0].result.image.url, req, res);
      });
    //

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
      url1 = await JSON.parse(body).articles[0].url;
      url2 = await JSON.parse(body).articles[1].url;
      url3 = await JSON.parse(body).articles[2].url;
      url4 = await JSON.parse(body).articles[3].url;
      url5 = await JSON.parse(body).articles[4].url;
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
async function makeRequestArticle(url, req, res) {

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
    if (banana.length > 1551) {
      banana = await banana.substring(0, 1550);
      console.log(banana);
      sendMessage(banana, req, res);
    }
    else {
      sendMessage(banana, req, res);
    }
    //banana, req, res);
  });

}


async function getImage(url) {
  var customerKey = 'dfce3b';
  secretPhrase = ''; //leave secret phrase empty, if not needed
  options = {
    //mandatory parameter
    url: url,
    // all next parameters are optional, see our website screenshot API guide for more details
    dimension: '1366xfull', // or "1366xfull" for full length screenshot
    device: 'desktop',
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
  console.log(output);
  screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', async function () {
    console.log('Screenshot saved as ' + output);
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Website Image",
        from: '+12015847119',
        mediaUrl: ['/output.png'],
        to: fromNum
      }).then(message => console.log("Sent"));
  }));

  
    
}

async function makeRequestDirections(origin, destination, req, res) {
  origin = origin.replace(' ', '+');
  destination = destination.replace(' ', '+')
  origin = origin.replace(',', '');
  destination = destination.replace(',', '')
  var uri = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyCiXaUN4yK14KqHFj1Nn76TbQ9PxryFyf0`;

  await request({
    uri: uri,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      const fs = require('fs');
      body = JSON.parse(body);
      var dirString = ""
      for (var i = 0; i < body.routes[0].legs[0].steps.length; i++) {
        var direction = body.routes[0].legs[0].steps[i].html_instructions;
        direction = direction.replace(/<b>/g, "");
        direction = direction.replace(/<\/b>/g, "");
        dirString += direction;
        dirString += "\n";
      }
      sendMessage(dirString);
      // success case, the file was saved
      //console.log(body.routes.legs.steps.count);
    });
}