import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgxStarsModule } from 'ngx-stars';
import Swiper, { Navigation, Pagination } from 'swiper';


import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxStarsModule,
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
