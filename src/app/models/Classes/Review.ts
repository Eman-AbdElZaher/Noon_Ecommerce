export class Review
{
  
    constructor(
       public id:number,
       public comment:string,
       public rating:number,
       public productID:number,
       public userID:string
      ){}

}