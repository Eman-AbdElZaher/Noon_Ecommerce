import { environment } from "src/environments/environment";

export const ApiController= {
    Account_URL:`${environment.API_URL}/login`,
    MainCategory_URL:`${environment.API_URL}/api/MainCategory`,
    Category_URL:`${environment.API_URL}/api/Category`,
    SubCategory_URL:`${environment.API_URL}/api/SubCategory`,
    ImagePath:`${environment.API_URL}/Resources/Images`
}