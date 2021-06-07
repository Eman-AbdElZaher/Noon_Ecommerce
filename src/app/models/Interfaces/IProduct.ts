export class IProduct {
    constructor(
      public id:number,  
      public name:string,
      public description:string,
      public quantity:number,
      public price:number,
      public color:string, 
      public size:number,
      public subCategoryID:number,
      public brandID:number,
      public supplierID:number,
      public averageRating:number
    ){}
}