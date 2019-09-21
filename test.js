var IniParser = require("./index")

var config = new IniParser("test.ini", "UTF8")

// get all sections
var sections = config.sections()

//get all keys of section1
var keysOfSection1 = config.keysOfSection("section1")

//get value by key and section
var key1InSection2 = config.get("section2", "key1")

//reset a key-value
config.set("section2", "key2", "newValue2")
//set a new key-value
config.set("section3", "key1", "value1")

//resave
var opt = {
    path: "new_config.ini",
    encoding: "UTF8",  // default is "UTF8"
    toDelimiter: "="  // default is "="
}
config.save(opt)

//print
console.log("sections = ", sections)
console.log("keysOfSection1 = ", keysOfSection1)
console.log("key1InSection2 = ", key1InSection2)