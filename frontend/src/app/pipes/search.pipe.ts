import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/product.model';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], searchTerm: string): unknown {
    if(!products || !searchTerm){
      return products;
    }
    else{
      return products.filter(product =>{
        product.name.toLowerCase().includes(searchTerm),
        product.category.toLowerCase().includes(searchTerm)
      })
    }
  }

}
