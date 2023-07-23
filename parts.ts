import readline from 'readline';
import fs from 'fs';
import path from 'path';

interface Part {
  [key: string]: string | number | boolean;
  name: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter part type: ', partType => {
  console.log('Enter raw data (press Ctrl-D when finished):');
  let rawData = '';
  rl.on('line', line => {
    rawData += line + '\n';
  });
  rl.on('close', () => {
    let lines = rawData.trim().split('\n');

    let keys = lines[0].split('\t').map(key => {
      return key.trim()
        .toLowerCase()
        .split(' ')
        .map((word, index) => index !== 0 ? word[0].toUpperCase() + word.slice(1) : word)
        .join('');
    });

    let jsonData: { [key: string]: Part; } = lines.slice(1).reduce((obj: { [key: string]: Part; }, line) => {
      let values = line.split('\t').map(value => value.trim());
      let part = keys.reduce((partObj, key, index) => {
        if (values[index] === 'TRUE') {
          partObj[key] = true;
        } else if (values[index] === 'FALSE') {
          partObj[key] = false;
        } else if (!Number.isNaN(Number(values[index]))) {
          partObj[key] = Number(values[index]);
        } else {
          partObj[key] = values[index];
        }
        return partObj;
      }, {} as Part);
      obj[part.name] = part;
      return obj;
    }, {});

    let existingData = fs.readFileSync(path.join(__dirname, `parts.json`), 'utf8');
    let partsJson = existingData ? JSON.parse(existingData) : {};

    partsJson[partType] = jsonData;

    fs.writeFile(path.resolve(__dirname, 'parts.json'), JSON.stringify(partsJson, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  });
});
