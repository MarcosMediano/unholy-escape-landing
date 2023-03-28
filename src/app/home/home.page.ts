import { Component, ViewChild  } from '@angular/core';
import { VotesService } from '../votes.service';
import { ModalController } from '@ionic/angular';
import { RatingFormComponentComponent } from '../rating-form-component/rating-form-component.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonSlides) slides: IonSlides;

  isMouseover = true;
  teamScore: any;
  teamId = 5;
  categories = ['Gameplay', 'Music', 'Design', 'Story', 'Difficulty'];
  gameForm: any;
  sliderOpts = {
    slidesPerView: 1,
    
  };
  constructor(private votesService: VotesService,
    private modalController: ModalController,
    private http: HttpClient,
    private formBuilder: FormBuilder) {
      this.slides = {} as IonSlides;
     }
  
  ionViewDidLoad() {
    
  }
  ngOnInit() {
    this.http.get(`http://localhost:3000/api/getTeamOverall/${this.teamId}`).subscribe((data) => {
      this.teamScore = data;
      console.log(this.teamScore);
      
    });
    
  }

  getVotesByTeam(teamId: any) {
    this.votesService.getVotesByTeam(teamId).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  async displayForm() {
    const modal = await this.modalController.create({
      component: RatingFormComponentComponent,

      id: 'modalForm'

    });
    return await modal.present();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  nextSlide() {
    this.slides.slideNext();
  }

  // countStar(star: number, type: string) {
  //   this.isMouseover = false;
  //   switch (type) {
  //     case "Gameplay":
  //       this.selectedValue = star;
  //       this.data = this.selectedValue;
  //       break;
  //     case "Music":
  //       this.selectedValue2 = star;
  //       this.data2 = this.selectedValue2;
  //       break;
  //     case "Design":
  //       this.selectedValue3 = star;
  //       this.data3 = this.selectedValue3;
  //       break;
  //     case "Story":
  //       this.selectedValue4 = star;
  //       this.data4 = this.selectedValue4;
  //       break;
  //     case "Difficulty":
  //       this.selectedValue5 = star;
  //       this.data5 = this.selectedValue5;
  //       break;
  //     default:
  //       break;
  //   }
    
  //   console.log("Gameplay"+this.data);
  //   console.log("Music"+this.data2);
  //   console.log("Design"+this.data3);
  //   console.log("Story"+this.data4);
  //   console.log("Difficulty"+this.data5);
  // }

  // //for adding star

  // addClass(star: number, type: string) {
  //   if (this.isMouseover) {
  //     switch (type) {
  //       case "Gameplay":
  //         this.selectedValue = star;
  //         this.data = this.selectedValue;
  //         break;
  //       case "Music":
  //         this.selectedValue2 = star;
  //         this.data2 = this.selectedValue;
  //         break;
  //       case "Design":
  //         this.selectedValue3 = star;
  //         this.data3 = this.selectedValue;
  //         break;
  //       case "Story":
  //         this.selectedValue4 = star;
  //         this.data4 = this.selectedValue;
  //         break;
  //       case "Difficulty":
  //         this.selectedValue5 = star;
  //         this.data5 = this.selectedValue;
  //         break;
  //       default:
  //         break;
  //     }
      
  //     // console.log(this.selectedValue);
  //     // console.log(this.selectedValue2);
  //     // console.log(this.selectedValue3);
  //     // console.log(this.selectedValue4);
  //     // console.log(this.selectedValue5);

  //   }
  // }

  // //for removing star

  // removeClass() {
  //   if (this.isMouseover) {
  //     this.selectedValue = 0;
  //     this.selectedValue2 = 0;
  //     // console.log(this.selectedValue);
  //   }
  // }
}
