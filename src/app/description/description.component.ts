import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Product } from './producto';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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
    const IVA = Math.round(this.data.price * 0.24);
    const totalPrice = Math.round(this.data.price - IVA);
 
    const pdfDefinition: any = {
      content: [
        {
          table: {
            widths: ['auto', 'auto'], 
            body: [
              [
                {
                  text: 'Artículo: ' + this.data.title,
                  style: 'cell',
                },
                {
                  text: 'IVA: ' + IVA.toFixed(2) + '€',
                  style: 'cell',
                },
              ],
              [
                {
                  text: 'Precio: ' + this.data.price + '€',
                  style: 'cell',
                },
                {
                  text: 'Total a pagar: ' + totalPrice.toFixed(2) + '€',
                  style: 'cell',
                },
              ],
            ],
          },
        },
      ],
      styles: {
        cell: {
          fontSize: 16,
          padding: 5,
        },
      },
      layout: 'noBorders', 
    };
  
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}
