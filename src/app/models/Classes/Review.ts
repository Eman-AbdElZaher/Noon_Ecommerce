export class Review
{
  
    constructor(
       public id:number,
       public comment:string,
       public rating:string,
       public productID:number,
       public userID:string
      ){}

}