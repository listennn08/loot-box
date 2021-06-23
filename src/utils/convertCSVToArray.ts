/**
 * 轉換 csv 資料來源成物件。
 *
 * @param csv - csv 資料來源
 * @returns 卡片陣列
 */
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
          imgName: '',
        };

        // 每張卡片以三欄為基礎。
        switch (j % 3) {
          case 0:
            card.name = rowData[j];
            result[Math.floor(j / 3)].card.push(card);
            break;
          case 1:
            result[Math.floor(j / 3)].card[i - 1].probability = Number(rowData[j]);
            break;
          case 2:
            result[Math.floor(j / 3)].card[i - 1].imgName = rowData[j].replace(/(\r|\n)/, '');
            break;
          default:
        }
      }
    }
  }

  return result;
}
