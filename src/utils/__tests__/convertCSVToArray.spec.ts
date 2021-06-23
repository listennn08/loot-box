import converCSVToArray from '../convertCSVToArray';

const mockcard = `5星英雄,,,5星神器,,,4星英雄,,,4星神器,,,3星英雄,,,3星神器,,,月光5星,,,月光4星,,,月光3星,,
巴爾&塞尚,0.027174,Baal-Sezan,女神的黑手,0.032407,black-hand-of-the-goddess,尤貝烏斯,0.17308,furious-full,艾爾之拳,0.27083,els-fist,茱迪絲,1.32258,judith-full,誓約鑰匙,1.8182,oath-key,武鬥家肯恩,0.006,ken-full-1,暗影蘿季,0.02,shadow-rose,米勒莎,0.2175,mirsa-full`;
const resultcard = [
  {
    level: '5星英雄',
    card: [
      {
        name: '巴爾&塞尚',
        probability: 0.027174,
        imgName: 'Baal-Sezan',
      },
    ],
  },
  {
    level: '5星神器',
    card: [
      {
        name: '女神的黑手',
        probability: 0.032407,
        imgName: 'black-hand-of-the-goddess',
      },
    ],
  },
  {
    level: '4星英雄',
    card: [
      {
        name: '尤貝烏斯',
        probability: 0.17308,
        imgName: 'furious-full',
      },
    ],
  },
  {
    level: '4星神器',
    card: [
      {
        name: '艾爾之拳',
        probability: 0.27083,
        imgName: 'els-fist',
      },
    ],
  },
  {
    level: '3星英雄',
    card: [
      {
        name: '茱迪絲',
        probability: 1.32258,
        imgName: 'judith-full',
      },
    ],
  },
  {
    level: '3星神器',
    card: [
      {
        name: '誓約鑰匙',
        probability: 1.8182,
        imgName: 'oath-key',
      },
    ],
  },
  {
    level: '月光5星',
    card: [
      {
        name: '武鬥家肯恩',
        probability: 0.006,
        imgName: 'ken-full-1',
      },
    ],
  },
  {
    level: '月光4星',
    card: [
      {
        name: '暗影蘿季',
        probability: 0.02,
        imgName: 'shadow-rose',
      },
    ],
  },
  {
    level: '月光3星',
    card: [
      {
        name: '米勒莎',
        probability: 0.2175,
        imgName: 'mirsa-full',
      },
    ],
  },
];

it('test convert csv to array', () => {
  // obeject equal.
  expect(converCSVToArray(mockcard)).toStrictEqual(resultcard);
});
