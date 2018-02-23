let headers;

const result = [];
const regions = [];
let countryIndex;
let saltIndex;
let sugarIndex;
let carboIndex;
let fatIndex;
let proteinIndex;
const sugarArr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const saltArr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const carboArr = [0.0, 0.0, 0.0];
const fatArr = [0.0, 0.0, 0.0];
const proteinArr = [0.0, 0.0, 0.0];

const countries = ['Netherlands', 'France', 'United Kingdom', 'Germany', 'United States', 'Australia', 'Canada', 'Spain', 'South Africa'];
const northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
const centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
const southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
const region = ['northEurope', 'southEurope', 'centralEurope'];

function csvJSON(csv, a) {
  const lines = csv;


  if (a === 0) {
    headers = lines.split(',');
    countryIndex = headers.indexOf('countries_en');
    saltIndex = headers.indexOf('salt_100g');
    sugarIndex = headers.indexOf('sugars_100g');
    carboIndex = headers.indexOf('carbohydrates_100g');
    fatIndex = headers.indexOf('fat_100g');
    proteinIndex = headers.indexOf('proteins_100g');
  } else {
    const currentline = lines.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);

    if (countries.indexOf(currentline[countryIndex]) >= 0) {
      sugarArr[countries.indexOf(currentline[countryIndex])]
      += parseFloat(currentline[sugarIndex]) || 0;
      saltArr[countries.indexOf(currentline[countryIndex])]
      += parseFloat(currentline[saltIndex]) || 0;
    }
    if (northEurope.indexOf(currentline[countryIndex]) >= 0) {
      fatArr[0] += parseFloat(currentline[fatIndex]) || 0;
      carboArr[0] += parseFloat(currentline[carboIndex]) || 0;
      proteinArr[0] += parseFloat(currentline[proteinIndex]) || 0;
    } else if (southEurope.indexOf(currentline[countryIndex]) >= 0) {
      fatArr[1] += parseFloat(currentline[fatIndex]) || 0;
      carboArr[1] += parseFloat(currentline[carboIndex]) || 0;
      proteinArr[1] += parseFloat(currentline[proteinIndex]) || 0;
    } else if (centralEurope.indexOf(currentline[countryIndex]) >= 0) {
      fatArr[2] += parseFloat(currentline[fatIndex]) || 0;
      carboArr[2] += parseFloat(currentline[carboIndex]) || 0;
      proteinArr[2] += parseFloat(currentline[proteinIndex]) || 0;
    }
  }
}

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let a = 0;
const instream = fs.createReadStream('./FoodFacts.csv');
const Outstream = new stream();
const ostream = fs.createWriteStream('bargraph.json');
const ostream1 = fs.createWriteStream('linegraph.json');
const rl = readline.createInterface(instream, outstream);
rl.on('line', (line) => {
  // console.log(line);
  csvJSON(line, a);
  a = 1;
});

rl.on('close', () => {
  for (let i = 0; i < countries.length; i += 1) {
    const obj = {};
    obj.country = countries[i];
    obj.salt = saltArr[i];
    obj.sugar = sugarArr[i];
    result.push(obj);
  }
  for (let i = 0; i < 3; i += 1) {
    const obj = {};
    obj.region = region[i];
    obj.fat = fatArr[i];
    obj.carbo = carboArr[i];
    obj.protein = proteinArr[i];
    regions.push(obj);
  }
  const jsonData = JSON.stringify(result);
  const regionData = JSON.stringify(regions);
  ostream1.write(regionData);
  ostream.write(jsonData);
});
