export class Product {
    constructor(
        public id:number ,
        public  name :string,
        public  price :number,
        public description:string,
        public  mainImage :string,
        public  color :string,
        public  size :string,
        public quantity:number,
        public  subCategoryID :number,
        public  brandID :number,
        public supplierID :number,
        public averageRating :number
    ) { }
}