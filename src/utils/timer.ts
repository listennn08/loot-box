/**
 * @class 計時器
 */
export default class Timer {
  bIsSkip = false;

  cb: () => void

  delay = 0;

  timer = 0;

  /**
   * 計時器建構子。
   *
   * @param cb 回呼函數
   * @param delay 延遲時間
   */
  constructor(cb: () => void, delay: number) {
    this.cb = cb;
    this.delay = delay;
  }

  /**
   * 執行 callback function 延遲開始。
   */
  setInterval(): void {
    this.timer = setInterval(() => {
      if (this.bIsSkip) {
        clearInterval(this.timer);
      }
      this.cb();
    }, this.delay);
  }

  /**
   * 跳過延遲。
   */
  skip(): void {
    this.bIsSkip = true;
  }
}
