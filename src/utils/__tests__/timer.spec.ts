import Timer from '../timer';

it('Test Timer is correct Running...', () => {
  jest.useFakeTimers();
  const mock: Array<number> = [1, 2, 3];
  const result: Array<number> = [];
  const timer = new Timer(() => {
    result.push(<number>mock.shift());
    if (timer.bIsSkip || !mock.length) {
      clearInterval(timer.timer);
    }
  }, 1000);

  timer.setInterval();
  jest.advanceTimersByTime(2000);
  timer.skip();
  expect(result).toEqual([1, 2]);
});
