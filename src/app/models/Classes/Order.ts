export class Order {
    constructor(
      public id:number,  
      public userID:string,
      public orderDate:string,
      public totalPrice:number
    ){}
}