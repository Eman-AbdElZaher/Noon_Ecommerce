export class CartProduct
{
    constructor(
        public id :number,
        public productId:number,
        public cartID :string,
        public quintity:number = 1,
        public netPrice:number

    )
    {}
} 