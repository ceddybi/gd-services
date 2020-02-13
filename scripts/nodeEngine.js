const fs = require('fs');
const packageJson = require('../package.json');

let document = packageJson;
document.engines = {
    node: "8"
};

fs.writeFile('build/package.json', JSON.stringify(document), (err) => {
    if (err) throw err;
});