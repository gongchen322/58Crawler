var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "http://bj.58.com/ershoufang/0/pn1/";
var SEARCH_WORD = "";
var currentPageId = 1;
//Define result as a JSON object
var result={};
result.entries = [];

crawl();

function crawl() {
  var currentPageUrl = "http://bj.58.com/ershoufang/0/pn"+currentPageId+"/";
  getPageInfo(currentPageUrl, getResult);

}

function getResult() {
  console.log(result);
}

function getPageInfo(url, callback) {
  console.log("Visiting page " + url);

  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode !== 200) {
      currentPageId++;
      callback();
      return;
    }
    // Parse the document body
    var $ = cheerio.load(body);
    collectInfo($);
    currentPageId++;
  });
   
}


function collectInfo($) {
   console.log("----------------");
   $(".bthead").each(function(index){
      
      if(index<9){
        return;
      }
      var returnValue = {};
      
      returnValue.title = $(this).children().first().text().toString();
      returnValue.
      result.entries[returnValue.title]=returnValue;
      var detailedInfoUrl = $(this).children().first().attr("href");
      request(detailedInfoUrl, function(error, response, body) {
        // Parse the document body
        collectDetailedInfo(cheerio.load(body), index, returnValue.title);
        console.log()
      });
   });

function collectDetailedInfo($, index, id_title) {
  var str = $("#t_phone").children().last().toString();
  var startIndex = str.indexOf("http");
  var endIndex = str.indexOf("' />");
  result.entries[id_title].phone_number = str.substring(startIndex,endIndex);
  
}


  
}