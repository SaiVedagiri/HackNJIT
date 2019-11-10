const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const path = require('path')
var request = require("request");
var unirest = require("unirest");
var screenshotmachine = require('screenshotmachine');
const yelp = require('yelp-fusion');
const client = yelp.client('zI6QMcg1yZXZeigdRSoYJug8BEMJce37ij13yhRoUf8EkPW3g3t8PZT8N2Rl8rTRz7jJL8jVhlt4nZB-TP5NK0R4Ay7Ty0rQUfivav3aictdff9MjfnlpPApPoDHXXYx');

const PORT = process.env.PORT || 5000
const API_KEY = "AIzaSyDhkJ2yT06tRwXIMEUp9xaj2-LxOnKyvGY";

const app = express();
let state = "default";
let url1;
let url2;
let url3;
let url4;
let url5;
let searchURL1;
let searchURL2;
let searchURL3;
let searchURL4;
let searchURL5;
let fromNum;
let myInput;
let beginning;
let end;
let translateText;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const accountSid = 'ACa79a24b798f41ffa8f7cdbd2e9e4b4f5';
  const authToken = 'ce2b1da8e10abee3dbe59834ca0cb48d';
  const client = require('twilio')(accountSid, authToken);
  client.messages.list({ limit: 1 })
    .then(messages => chatBot(messages[0].body, messages[0].from, req, res));
})

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

function sendMessage(message, req, res) {
  const accountSid = 'ACa79a24b798f41ffa8f7cdbd2e9e4b4f5';
  const authToken = 'ce2b1da8e10abee3dbe59834ca0cb48d';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: ":\n" + message,
      from: '+12512202935',
      to: fromNum
    })
    .then(message => res.send(message));
}

function sendImage(media, req, res) {
  const accountSid = 'ACa79a24b798f41ffa8f7cdbd2e9e4b4f5';
  const authToken = 'ce2b1da8e10abee3dbe59834ca0cb48d';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      from: '+12512202935',
      mediaUrl: [media],
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
  .get('/', function (req, res) {
    res.send("Welcome!");
  })
  .get('/api', function (req, res) {
    const accountSid = 'AC61eca8833f419fdc26e5ffa75b284891';
    const authToken = '91bf82ff6ea981dfc77db8d5cb13ad4a';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Website Image",
        from: '+12015847119',
        mediaUrl: ['https://textify.azurewebsites.net/output.png'],
        to: '+19179404729'
      })
      .then(message => console.log(message.sid));
  })
  .get('/state', function (req, res) {
    res.send("State: " + state + "\nInput: " + myInput);
  })
  .post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    const accountSid = 'ACa79a24b798f41ffa8f7cdbd2e9e4b4f5';
    const authToken = 'ce2b1da8e10abee3dbe59834ca0cb48d';
    const client = require('twilio')(accountSid, authToken);
    client.messages.list({ limit: 1 })
      .then(messages => chatBot(messages[0].body, messages[0].from, req, res));
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))


//get input from Arya
// async function checkInput(input, currentFromNum, req, res) {
//   fromNum = currentFromNum;
//   input = input.trim();
//   input = input.toLowerCase();
//   if (state == "news") {
//     if (input.includes("1")) {
//       makeRequestArticle(url1, req, res);
//       state = "default";

//     }
//     else if (input.includes("2")) {
//       makeRequestArticle(url2, req, res);
//       state = "default";

//     }
//     else if (input.includes("3")) {
//       makeRequestArticle(url3, req, res);
//       state = "default";

//     }
//     else if (input.includes("4")) {
//       makeRequestArticle(url4, req, res);
//       state = "default";

//     }
//     else if (input.includes("5")) {
//       makeRequestArticle(url5, req, res);
//       state = "default";
//     }
//   }
//   else if (input.includes("info")) {
//     let words = input.split(" ");
//     for (let i = 0; i < words.length; i++) {
//       if (words[i] == "about" || words[i] == "on") {
//         var index = i;
//         break;
//       }
//     }
//     let search = "";
//     for (i = index + 1; i < words.length; i++) {
//       search += words[i];
//     }
//     makeRequestWikipedia(search, req, res);
//   }
//   else if (input.toLowerCase().trim().includes("news")) {
//     makeRequestNews(`https://newsapi.org/v2/top-headlines?country=us&apiKey=9e06d9d66c7440d995c78259238d4e68`, req, res);
//   }

//   else if (input.includes("weather")) {
//     let words = input.split(" ");
//     for (let i = 0; i < words.length; i++) {
//       if (words[i] == "in" || words[i] == "on" || words[i] == "for") {
//         var index = i;
//         break;
//       }
//     }
//     let search = "";
//     for (i = index + 1; i < words.length; i++) {
//       search += words[i];
//     }
//     makeRequestWeather(search, req, res)
//   }

//   else if (input.includes("direction")) {
//     let words = input.split(" ");
//     for (let i = 0; i < words.length; i++) {
//       if (words[i] == "from") {
//         var from = i;
//         if (words[i] == "to") {
//           var to = i;
//         }
//       }
//     }
//     let home;
//     for (let i = from; i < to; i++) {
//       home += words[i];
//     }
//     let destination;
//     for (let i = to; i < words.length; i++) {
//       destination = words[i];
//     }
//     makeRequestDirections(home, destination, req, res);
//   }

//   else if (input.includes("gif")) {
//     let words = input.split(" ");
//     for (let i = 0; i < words.length; i++) {
//       if (words[i] == "about" || words[i] == "on") {
//         var index = i;
//         break;
//       }
//     }
//     let search = "";
//     for (i = index + 1; i < words.length; i++) {
//       search += words[i];
//     }
//     makeRequestGif(search, req, res);
//   }

//   else {
//     getImage(input);
//   }
// }

async function chatBot(input, currentFromNum, req, res) {
  myInput = input;
  fromNum = currentFromNum;
  input = input.trim();
  input = input.toLowerCase();
  if (input.includes("init") || input.includes("home")) {
    state = "default";
    sendMessage(
      "Press a number corresponding to an action" +
      "\nEnter 1 to perform a search." +
      "\nEnter 2 to navigate the web." +
      "\nEnter 3 to get information on a topic." +
      "\nEnter 4 to get stock information." +
      "\nEnter 5 to get directions." +
      "\nEnter 6 for weather data." +
      "\nEnter 7 to translate text." +
      "\nEnter 8 to get restaurant reccomendations." +
      "\nEnter 9 for a gif." +
      "\nEnter home to return to the home page."
      , req, res
    )
  }

  else if (state == "default" && input.includes("1")) {
    state = "inSearch";
    sendMessage(
      "What would you like to perform a search about?", req, res
    )
  }
  else if (state == "inSearch") {
    await sendMessage("Please wait...");
    await getImage(`https://bing.com/search?q=${input}&setlang=en-us&lf=1&cc=au`);
    await makeRequestSearch(input);
    state = await "inSearch2";
  }

  else if (state == "inURL") {
    if (!input.includes("http")) {
      input = "https://" + input;
    }
    getImage(input);
    await sendMessage("Please wait...");
    state = "default";
  }

  else if (state == "inInfo") {

    makeRequestWikipedia(input);
    state = "default";
  }

  else if (state == "inSearch2" && input == "1") {
    await sendMessage("Please wait...");
    await getImage(searchURL1);
    state = await "default";
  }
  else if (state == "inSearch2" && input == "2") {
    await sendMessage("Please wait...");
    await getImage(searchURL2);
    state = await "default";

  }
  else if (state == "inSearch2" && input == "3") {
    await sendMessage("Please wait...");
    await getImage(searchURL3);
    state = await "default";

  }
  else if (state == "inSearch2" && input == "4") {
    await sendMessage("Please wait...");
    await getImage(searchURL4);
    state = await "default";

  }
  else if (state == "inSearch2" && input == "5") {
    await sendMessage("Please wait...");
    await getImage(searchURL5);
    state = await "default";
  }

  else if (state == "inStocks" && input == "1") {
    await sendMessage("Please wait...");
    await getImage("https://www.wsj.com/market-data/stocks");
    state = await "default";
  }

  else if (state == "inStocks" && input == "2") {
    await sendMessage("What is the ticker of the stock you wish to see?");
    state = await "inStocks2";
  }

  else if (state == "inStocks2") {
    sendMessage("Please wait... ")
    getImage("https://quotes.wsj.com/" + input + "/");
  }

  else if (state == "default" && input == "2") {
    state = "inURL";
    await sendMessage(
      "Enter a url: ", req, res
    )
  }

  else if (state == "default" && input == "3") {
    state = "inInfo";
    await sendMessage(
      "What topic do you want information about?", req, res
    )
  }

  else if (state == "default" && input == "4") {
    state = "inStocks";
    await sendMessage(
      "Enter 1 to see general stock market information." +
      "\nEnter 2 to see information about a specific stock", req, res
    )
  }
  else if (state == "default" && input == "5") {
    state = "inDirections";
    sendMessage("What is the origin address?", req, res);
  }

  else if (state == "default" && input == "6") {
    state = "inWeather";
    sendMessage("What is your location?", req, res);
  }

  else if (state == "default" && input == "7") {
    state = "inTranslate";
    sendMessage("What is the text you want to translate?", req, res);
  }

  else if (state == "default" && input == "8") {
    state = "inRestaurant";
    sendMessage("Enter city: ", req, res);
  }

  else if (state == "default" && input == "9") {
    state = "inGif";
    sendMessage("Enter keyword: ", req, res);
  }

  else if (state == "inGif") {
    state = "default";
    await sendMessage("Please wait...", req, res);
    await makeRequestGif(input, req, res);
  }

  else if (state == "inTranslate") {
    state = "inTranslate2";
    translateText = input;
    sendMessage("Enter 1 to translate into Spanish" +
      "\nEnter 2 to translate into French" +
      "\nEnter 3 to translate into Russian" +
      "\nEnter 4 to translate into Hindi" +
      "\nEnter 5 to translate into Telugu" +
      "\nEnter 6 to translate into Latin"
      , req, res)
  }

  else if (state == "inTranslate2") {
    state = "default";
    let myLanguage;
    if (input == "1")
      myLanguage = "spanish";
    if (input == "2")
      myLanguage = "french";
    if (input == "3")
      myLanguage = "russian";
    if (input == "4")
      myLanguage = "hindi";
    if (input == "5")
      myLanguage = "telugu";
    if (input == "6")
      myLanguage = "latin";
    await makeRequestTranslate(translateText, myLanguage);
  }

  
  
  else if (state == "inRestaurant") {
    state = "default";
    await makeRequestRestaurant(input, req, res);
  }



  else if (state == "inWeather") {
    state = "default";
    await makeRequestWeather(`https://api.openweathermap.org/data/2.5/weather?q=${input}&apikey=d4aba2f6472ab5c29ac2771336221dd8`, req, res);
  }

  else if (state == "inDirections") {
    state = "inDirections2";
    beginning = input;
    sendMessage("What is the destination address?");
  }
  else if (state == "inDirections2") {
    state = "default";
    end = input;
    await makeRequestDirections(beginning, end, req, res);
  }
}

async function makeRequestGif(search, req, res) {
  let random = parseInt(Math.random() * 10);
  await request({
    uri: `https://api.giphy.com/v1/gifs/search?api_key=CtDHcuog6ZG2IM52AUkK15WRlIYhNHl5&q=${search}`,
    method: "GET",
    timeout: 10000,

    followRedirect: true,
    maxRedirects: 10
  },
    async function (error, response, body) {
      sendImage(JSON.parse(body).data[random].images.original.url, req, res);
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
  var req = unirest("GET", "https://lexper.p.rapidapi.com/v1.1/extract");

  req.query({
    "media": "1",
    "url": url
  });

  req.headers({
    "x-rapidapi-host": "lexper.p.rapidapi.com",
    "x-rapidapi-key": "fcaaf11ba6mshddd853da7d73799p1a634djsnc1d151d36750"
  });

  let myMessage;
  await req.end(async function (res) {
    if (res.error) throw new Error(res.error);
    myMessage = await res.body.article.text;
    if (myMessage.length > 1551) {
      myMessage = await myMessage.substring(0, 1550);
      sendMessage(myMessage, req, res);
    }
    else {
      sendMessage(myMessage, req, res);
    }
  });

}


async function getImage(url) {
  var customerKey = '027a19';
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

  //or save screenshot as an image
  var fs = require('fs');
  var output = 'output.png';
  screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', async function () {
    const accountSid = 'ACa79a24b798f41ffa8f7cdbd2e9e4b4f5';
    const authToken = 'ce2b1da8e10abee3dbe59834ca0cb48d';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Website Image",
        from: '+12512202935',
        mediaUrl: ['https://textify.azurewebsites.net/output.png'],
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
      body = JSON.parse(body);
      var dirString = ""
        for (var i = 0; i < body.routes[0].legs[0].steps.length; i++) {
          var direction = body.routes[0].legs[0].steps[i].html_instructions;;
          dirString += direction;
          dirString += "\n";
        }
      var newString = "";
      var dirArray = dirString.split('<');
        for (var x = 0; x<dirArray.length; x++) {
            if (dirArray[x].indexOf('>') != undefined) {
                dirArray[x] = dirArray[x].replace(dirArray[x].substring(0, dirArray[x].indexOf('>')+1), "");
            }
            newString += dirArray[x];
        }
      await sendMessage(newString, req, res);
      // success case, the file was saved
    });
}

async function makeSentimentRequestSearch(searchTerm, req, res) {
  var req = unirest("GET", `https://api.cognitive.microsoft.com/bing/v7.0/search?q=${searchTerm}`);

  req.headers({
    "Ocp-Apim-Subscription-Key": "7f33227b18134a1f9a4d34bb805b360a",
    "Content-Type": "application/json"
  });


  var outputString = "";

  await req.end(async function (res) {
    searchURL1 = res.body.webPages.value[0].url;
    searchURL2 = res.body.webPages.value[1].url;
    searchURL3 = res.body.webPages.value[2].url;
    searchURL4 = res.body.webPages.value[3].url;
    searchURL5 = res.body.webPages.value[4].url;
    sendMessage(
      "\nPress 1 to view " + res.body.webPages.value[0].name +
      "\n\nPress 2 to view " + res.body.webPages.value[1].name +
      "\n\nPress 3 to view " + res.body.webPages.value[2].name +
      "\n\nPress 4 to view " + res.body.webPages.value[3].name +
      "\n\nPress 5 to view " + res.body.webPages.value[4].name, req, res)
  });
}

async function makeRequestSearch(searchTerm, req, res) {

  var req = unirest("GET", `https://api.cognitive.microsoft.com/bing/v7.0/search?q=${searchTerm}`);

  req.query({
  });

  req.headers({
    "Ocp-Apim-Subscription-Key": "7f33227b18134a1f9a4d34bb805b360a",
    "Content-Type": "application/json"
  });


  var outputString = ""
  await req.end(async function (res) {
    var sortedURLArray = [];
    var sortedNameArray = [];
    var sortedRatingArray = [];
    for (var x = 0; x < res.body.webPages.value.length; x++) {
      var score = checkSentiment(res.body.webPages.value[x].name);
      if (x < 5) {
        sortedURLArray.push(res.body.webPages.value[x].url)
        sortedNameArray.push(res.body.webPages.value[x].name)
        sortedRatingArray.push(score)
      } else {
        if (score > sortedRatingArray[4]) {
          sortedURLArray[4] = res.body.webPages.value[x].url
          sortedNameArray[4] = res.body.webPages.value[x].name
          sortedRatingArray[4] = score
        }
      }
    }
    searchURL1 = sortedURLArray[0];
    searchURL2 = sortedURLArray[1];
    searchURL3 = sortedURLArray[2];
    searchURL4 = sortedURLArray[3];
    searchURL5 = sortedURLArray[4];
    await sendMessage(
      "\nPress 1 to view " + sortedNameArray[0] +
      "\n\nPress 2 to view " + sortedNameArray[1] +
      "\n\nPress 3 to view " + sortedNameArray[2] +
      "\n\nPress 4 to view " + sortedNameArray[3] +
      "\n\nPress 5 to view " + sortedNameArray[4], req, res)
  });

}

async function makeRequestTranslate(text, target) {
  if (!target) {
    target = "en"
  } else if (target.toLowerCase() == "spanish") {
    target = "es"
  } else if (target.toLowerCase() == "french") {
    target = "fr"
  } else if (target.toLowerCase() == "english") {
    target = "fr"
  } else if (target.toLowerCase() == "telegu") {
    target = "te"
  } else if (target.toLowerCase() == "russian") {
    target = "ru"
  } else if (target.toLowerCase() == "hindi") {
    target = "hi"
  } else if (target.toLowerCase() == "latin") {
    target = "la"
  }

  var req = unirest("POST", "https://api.cognitive.microsofttranslator.com/translate");

  req.query({
    "api-version": "3.0",
    "to": target
  });

  req.headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "369c40dc946d4f99b60e9fe95eef1c96"
  });

  req.send([{ "Text": text }]);

  var outputString = ""
  await req.end(async function (res) {
    if (res.error) throw new Error(res.error);
    outputString = await res.body[0].translations[0].text;
    sendMessage(outputString, req, res);
  });

}

async function makeRequestRestaurant(input, req, res) {
  var output;
  await client.search({
    location: input,
    sort_by: 'rating',
  }).then(response => {
    output = response.jsonBody.businesses;
  }).catch(e => {
    console.log(e);
  });

  var outputString = "";
  for (var x = 0; x<5; x++) {
    outputString += output[x].name;
    outputString += " (Rating = ";
    outputString += output[x].rating;
    outputString += ")\n"
    if (output[x].location.address1 != "") {
      outputString += output[x].location.address1;
      outputString += "\n"
    }
    outputString += "\n"
  }

  sendMessage(outputString, req, res);
}

async function subjectAnalysis(searchTerm, req, res) {

  var req = unirest("POST", "https://textify-textanalytics.cognitiveservices.azure.com/text/analytics/v2.1/keyPhrases");

 req.query({
     "showStats": true
 })

  req.headers({
    "Ocp-Apim-Subscription-Key": "fb73281bc5e14cf9b2fdeffcb0323d38",
    "Content-Type": "application/json"
  });

  req.send({
      "documents": [
        {
          "language": "en",
          "id": "1",
          "text": searchTerm
        }
      ]
    });

var outputString = ""
  await req.end(async function (res) {
      await sendMessage(res.body.documents[0].keyPhrases, req, res);
  });

}