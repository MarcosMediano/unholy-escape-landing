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

  teamScore: any;
  teamId = 3;
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
  createVote(data: any) {
    try {
      this.votesService.createVote(data).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    } catch (error) {
      console.log("An error occurred while attempting to create the vote:");
      console.log(error);
    }
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
}
