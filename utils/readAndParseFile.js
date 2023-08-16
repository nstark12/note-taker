const { readFileSync } = require('fs')

// handles reading and parsing of files
const readAndParseFile = (filePath) => {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
}

module.exports = readAndParseFile