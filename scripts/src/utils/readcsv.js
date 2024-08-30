const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Make sure to install the 'csv-parser' package

const readCSV = (file_path) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path.join(__dirname, file_path))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = readCSV;
