export default interface IProductData {
    id?:any,
    name?: string,
    description?: string,
    price?: number,
    image?: File | null,
    seller_id?: any,
    category_id?: number,
    status?: boolean,
    seller?: string,
    category?:string,

}