import { observable } from "mobx";

export class NowDateStore {
  @observable nowDate = new Date();

  constructor() {
    setInterval(() => (this.nowDate = new Date()), 1000);

    // let that = this.nowDate;
    // setInterval(function date() {
    //   that.setTime(new Date().getTime());
    // }, 1000);

    // let that = this;
    // setInterval(function date() {
    //   that.nowDate = new Date();
    // }, 1000);
  }
}
