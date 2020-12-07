//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var moment = require("moment");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
let input=[];
let sum=0;


app.get("/", function(req, res){
  res.render("compose",{
    sum: sum,
  });
});

app.post("/", function(req, res){
  let post = {
    content: req.body.postBody
  };
  sum=0;
  input=post.content.split(' ');
  console.log(input);
  if(input.length==9 && input[2]=="LM" && input[5]=="LM" && input[8]=="LM"){
    if(moment(input[1]).isValid() && moment(input[4]).isValid()&& moment(input[7]).isValid()){
      sum=parseInt(input[0].replace(",", ""))+parseInt(input[3].replace(",", ""))+parseInt(input[6].replace(",", ""));
    }
    else{
      console.log("Reenter with correct value");
    }
  }
  else if(input.length==12 && input[2]=="LQ" && input[5]=="LQ" && input[8]=="LQ" && input[11]=="LQ"){
    if(moment(input[1]).isValid() && moment(input[4]).isValid()&& moment(input[7]).isValid() && moment(input[10]).isValid()){
      sum=parseInt(input[0].replace(",", ""))+parseInt(input[3].replace(",", ""))+parseInt(input[6].replace(",", ""))+parseInt(input[9].replace(",", ""));
    }
    else{
      console.log("Reenter with correct value");
    }
  }


  res.redirect("/");

});

app.get("/q2", function(req, res){
  res.render("compose2",{
    sum: sum,
  });
});

app.post("/q2", function(req, res){
  let post = {
    content: req.body.postBody
  };
  sum=0;
  input=post.content.split(' ');
  console.log(input);
  console.log(input.length);
  if(input.length==36){
    for(var i=0;i<12;i++){
      if(moment(input[i+1]).isValid() && input[i+2]=="LM"){
        sum=sum+parseInt(input[i].replace(",", ""));
      }
      else{
        console.log("error: Wronge input");
      }
    }
  }
  else{
    console.log("error: Wronge input");
  }
  


  res.redirect("/q2");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
