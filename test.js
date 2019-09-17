var IniParser = require("./index")

var config = new IniParser("config_test.ini")
// console.log(typeof IniParser)
console.log('sections', config.sections())
// console.log('get name in section1'. config.get("section1", "name"))
console.log('get keys of section1', config.keysOfSection("section1"))
console.log('set some key-value')
config.set("globalKey", 'globalValue')
config.set("section1", "name", "newValue")
config.set("section3", "name", "section3")
console.log('restore')
config.save({
    path: "new_config_test.ini",
    encoding: "UTF8",
    toDelimiter: "="
})
console.log(config.configs)