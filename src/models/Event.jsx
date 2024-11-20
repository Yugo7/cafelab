export default class Event {
  constructor(name, description, local, date, imagePromotion, imageFinish, instagramUrl) {
    this.name = name;
    this.description = description;
    this.local = local;
    this.date = date;
    this.imagePromotion = imagePromotion;
    this.imageFinish = imageFinish;
    this.instagramUrl = instagramUrl;
  }
}