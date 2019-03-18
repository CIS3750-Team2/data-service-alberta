const fetch = require('node-fetch');
const parse = require('csv-parse/lib/sync');

const parseOptions = {
    cast: true,                     // convert cells to native values (string -> number)
    columns: true,                  // parse as array of objects
    delimiter: ',',
    trim: true,                     // remove whitespace around delim
    skip_empty_lines: true,
    skip_lines_with_error: true,
};
const dataUri = 'http://salaries.dataservices.alberta.ca/files/alberta-salary-disclosure.csv';

module.exports = async (state, year) => {
    const csv = await fetch(dataUri)
        .then((res) => res.status === 200 ? res.text() : '');
    let entries = parse(csv, parseOptions);

    for (let i = entries.length - 1; i >= 0; i--) {
        entries[i] = {
            sector: entries[i]['Ministry'],
            salary: entries[i]['BaseSalary'],
            taxableBenefits: entries[i]['CashBenefits'] + entries[i]['NonCashBenefits'],
            title: entries[i]['PositionTitle'],
            positionClass: entries[i]['PositionClass'],
            severance: entries[i]['Severance'],
            province: 'alberta',
            year: entries[i]['Year'],
            original: entries[i]
        };
    }

    entries = entries.filter((entry) => !year || entry.year === year);
    console.log(`Found ${entries.length} entries(s) in alberta for ${year}.`);

    return entries;
};
