import converCSVToArray from '../convertCSVToArray';

const mockcard = `5星英雄,,5星神器,,4星英雄,,4星神器,,3星英雄,,3星神器,,月光5星,,月光4星,,月光3星,
巴爾&塞尚,0.027174,女神的黑手,0.032407,尤貝烏斯,0.17308,艾爾之拳,0.27083,茱迪絲,1.32258,誓約鑰匙,1.8182,武鬥家肯恩,0.006,暗影蘿季,0.02,米勒莎,0.2175`;

const resultcard = [
  {
    level: '5星英雄',
    card: [
      {
        name: '巴爾&塞尚',
        probability: 0.027174,
      },
    ],
  },
  {
    level: '5星神器',
    card: [
      {
        name: '女神的黑手',
        probability: 0.032407,
      },
    ],
  },
  {
    level: '4星英雄',
    card: [
      {
        name: '尤貝烏斯',
        probability: 0.17308,
      },
    ],
  },
  {
    level: '4星神器',
    card: [
      {
        name: '艾爾之拳',
        probability: 0.27083,
      },
    ],
  },
  {
    level: '3星英雄',
    card: [
      {
        name: '茱迪絲',
        probability: 1.32258,
      },
    ],
  },
  {
    level: '3星神器',
    card: [
      {
        name: '誓約鑰匙',
        probability: 1.8182,
      },
    ],
  },
  {
    level: '月光5星',
    card: [
      {
        name: '武鬥家肯恩',
        probability: 0.006,
      },
    ],
  },
  {
    level: '月光4星',
    card: [
      {
        name: '暗影蘿季',
        probability: 0.02,
      },
    ],
  },
  {
    level: '月光3星',
    card: [
      {
        name: '米勒莎',
        probability: 0.2175,
      },
    ],
  },
];

it('test convert csv to array', () => {
  // obeject equal.
  expect(converCSVToArray(mockcard)).toStrictEqual(resultcard);
});
