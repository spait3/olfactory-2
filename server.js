
//-------------

// //Speech to text experimentation

// const recorder = require('node-record-lpcm16');

// // Imports the Google Cloud client library
// const speech = require('@google-cloud/speech');

// // Creates a client
// const client = new speech.SpeechClient();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

// const request = {
//   config: {
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode,
//   },
//   interimResults: false, // If you want interim results, set this to true
// };

// // Create a recognize stream
// const recognizeStream = client
//   .streamingRecognize(request)
//   .on('error', console.error)
//   .on('data', data =>
//     process.stdout.write(
//       data.results[0] && data.results[0].alternatives[0]
//         ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//         : '\n\nReached transcription time limit, press Ctrl+C\n'
//     )
//   );

// // Start recording and send the microphone input to the Speech API.
// // Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
// recorder
//   .record({
//     sampleRateHertz: sampleRateHertz,
//     threshold: 0,
//     // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
//     verbose: false,
//     recordProgram: 'rec', // Try also "arecord" or "sox"
//     silence: '10.0',
//   })
//   .stream()
//   .on('error', console.error)
//   .pipe(recognizeStream);

// console.log('Listening, press Ctrl+C to stop.');




//------------------


var express = require('express');
var stringSimilarity = require("string-similarity");




var p_sentiments = " ";

console.log("Ho gya load");



var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My Socket server is running");


//socket init

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log(socket.id);
	socket.on('Speech', quickstart);

//IBM Watson Code
// function quickstart(textdata){
// 	console.log(textdata);
// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');


// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2022-04-07',
//   authenticator: new IamAuthenticator({
//     apikey: '_2HBlaxiyhoQLQyFpE8mMVVeZa5t0y1YisHXYoiqYORY',
//   }),
//   serviceUrl: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/0f124766-e47f-41cd-8cb0-58bd234f40c3',
// });

// const analyzeParams = {
//   'text': textdata.text,
//   'features': {
//     'entities': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 2,
//     },
//     'keywords': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 5,
//     },
//     'sentiment': {

//     }
//   },
// };


// naturalLanguageUnderstanding.analyze(analyzeParams)
//   .then(analysisResults => {
//     console.log(JSON.stringify(analysisResults, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });
// }





//Google Cloud Sentiment Analysis Code
async function quickstart(textdata){

const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();


// Prepares a document, representing the provided text
const document = {
  content: textdata.text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the document
const [result] = await client.analyzeSentiment({document});

const sentiment = result.documentSentiment;
console.log('Document sentiment:');
console.log(`  Score: ${sentiment.score}`);
console.log(`  Magnitude: ${sentiment.magnitude}`);

const sentences = result.sentences;
sentences.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`);
  console.log(`  Score: ${sentence.sentiment.score}`);
  console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
})

  p_sentiments = p_sentiments + "." +textdata.text;





//Socket Output from Server after sentiment Analysis
socket.emit('analysis',sentiment);

//Entity Analysis
const [res] = await client.analyzeEntities({document});
const entities = res.entities;

console.log('Entities:');
entities.forEach(entity => {
  console.log(entity.name);
  console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
  if (entity.metadata && entity.metadata.wikipedia_url) {
    console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
  }
});


//Syntax Analysis
const encodingType = 'UTF8';

// Detects the sentiment of the document
const [syntax] = await client.analyzeSyntax({document, encodingType});

console.log('Parts of speech:');
syntax.tokens.forEach(part => {
  console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
  //console.log('Morphology:', part.partOfSpeech);
});



//Entity Sentiment
// Detects sentiment of entities in the document
const [response] = await client.analyzeEntitySentiment({document});
const ent = response.entities;

console.log('Entities and sentiments:');
ent.forEach(entity => {
  console.log(`  Name: ${entity.name}`);
  console.log(`  Type: ${entity.type}`);
  console.log(`  Score: ${entity.sentiment.score}`);
  console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
});


//Content Classification
const classificationModelOptions = {
  v2Model: {
    contentCategoriesVersion: 'V2',
  },
};

// Classifies text in the document
const [classification] = await client.classifyText({
  document,
  classificationModelOptions,
});
console.log('Categories:');
classification.categories.forEach(category => {
  console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
});

//console.log(p_sentiments);
readdata(p_sentiments);


}
//Google Cloud Code Ends


}
//Socket Code Ends





function readdata(senti){


//Reading CSV
var fs = require('fs');

var data = fs.readFileSync('perfume.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array



function fn(x){
  return x[2];
}

let description = data.map(fn)
//description is an array of the dscriptions



function ingredient(x){
  return x[3];
}

function perfumename(x){
  return x[0];
}


let per_name = data.map(perfumename)

let content = data.map(ingredient)
//content is an array of contents of the perfume or "notes"



//Console.log(content);


//Tensorflow Code
console.log(senti);

var matches = stringSimilarity.findBestMatch(senti, description);
console.log(matches.bestMatchIndex);
console.log(content[matches.bestMatchIndex]);
console.log(per_name[matches.bestMatchIndex]);
}











