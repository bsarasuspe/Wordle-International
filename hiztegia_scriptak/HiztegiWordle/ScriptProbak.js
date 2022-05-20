/*document.getElementById("froga").addEventListener("change", function() {
  var file_to_read = document.getElementById("froga").files[0];
  var fileread = new FileReader();
  fileread.onload = function(e) {
    var content = e.target.result;
    var intern = JSON.parse(content); // parse json 
    console.log(intern); // You can index every object
  };
  fileread.readAsText(file_to_read);
});*/

/*let obj = JSON.parse('{ "name":"Krunal", "age":25, "city":"Rajkot", "degree": "BE"}');
console.log(obj.degree); // BE*/

const fs = require('fs');

let rawdata = fs.readFileSync('Users.json');
let student = JSON.parse(rawdata);
console.log(student);