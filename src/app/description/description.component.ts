import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from './producto';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit{
  public data: Product = {
    category : '',
    description: '',
    image: '',
    id : 0,
    price: 0,
    rating: {
      rate: 0,
      count: 0
    },
    title: ''

  };
  constructor (private productService: ProductService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  //http function
  public getProduct() :void {
    this.productService.getData().subscribe(res => {
      this.data = res
      console.log(this.data)
    });
  }

  //pdf function
  public handleClick() : void {

  }
}
