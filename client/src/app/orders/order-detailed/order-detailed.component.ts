import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.css']
})
export class OrderDetailedComponent implements OnInit {
  order:IOrder;

  constructor(private route:ActivatedRoute,private breadcrumService:BreadcrumbService,private orderService:OrdersService) { 
    this.breadcrumService.set('@OrderDetailed','');
  }

  ngOnInit(): void {

    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
    .subscribe((order:IOrder) => {
      this.order=order;
      this.breadcrumService.set('@OrderDetailed',`Order# ${order.id}- ${order.status}`);

    },error =>{
      console.log(error);
    });
    
  }

}
