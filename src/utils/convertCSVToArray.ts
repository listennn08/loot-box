const even = (n: number): boolean => (n % 2) === 0;

export default function csvToArray(csv: string): Array<Cards> {
  const lines = csv.split('\n');
  const result: Array<Cards> = [];

  lines[0]
    .split(',')
    .filter((el) => el.trim() !== '')
    .forEach((level) => {
      result.push({
        level,
        card: [],
      });
    });

  for (let i = 1; i < lines.length; i += 1) {
    const rowData = lines[i].split(',');

    for (let j = 0; j < rowData.length; j += 1) {
      if (rowData[j].trim()) {
        const card: Card = {
          name: '',
          probability: 0,
        };
        if (even(j)) {
          card.name = rowData[j];
          result[Math.floor(j / 2)].card.push(card);
        } else {
          result[Math.floor(j / 2)].card[i - 1].probability = Number(rowData[j]);
        }
      }
    }
  }

  return result;
}

// function csvJSON(csv) {
//   const lines = csv.split('\n');
//   const result = [];

//   // NOTE: If your columns contain commas in their values, you'll need
//   // to deal with those before doing the next step
//   // (you might convert them to &&& or something, then covert them back later)
//   // jsfiddle showing the issue https://jsfiddle.net/
//   const headers = lines[0].split(',');

//   for (let i = 1; i < lines.length; i += 1) {
//     const obj = {};
//     const currentline = lines[i].split(',');

//     for (let j = 0; j < headers.length; j += 1) {
//       obj[headers[j]] = currentline[j];
//     }

//     result.push(obj);
//   }

//   // return result; // JavaScript object
//   return JSON.stringify(result); // JSON
// }
