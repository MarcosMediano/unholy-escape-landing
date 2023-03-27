import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,} from '@angular/common/http';
import { VotesService } from '../votes.service';


@Component({
  selector: 'app-rating-form-component',
  templateUrl: './rating-form-component.component.html',
  styleUrls: ['./rating-form-component.component.scss'],
})
export class RatingFormComponentComponent implements OnInit {
  form: any;
  teamId=3;
  gameplay: number = 0;
  music: number = 0;
  design: number = 0;
  story: number = 0;
  difficulty: number = 0;
  
  categories = ['Gameplay', 'Music', 'Design', 'Story', 'Difficulty'];

  constructor(
    private modalController: ModalController,
    private votesService: VotesService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      teamId: '3',
      gameplay: ['', Validators.required],
      music: ['', Validators.required],
      design: ['', Validators.required],
      story: ['', Validators.required],
      difficulty: ['', Validators.required],
      commentary: ''
    });
  }

  onGameplaySet(rating: number): void {
    this.gameplay = rating;
  }
  onMusicSet(rating: number): void {
    this.music = rating;
  }
  onDesignSet(rating: number): void {
    this.design = rating;
  }
  onStorySet(rating: number): void {
    this.story = rating;
  }
  onDifficultySet(rating: number): void {
    this.difficulty = rating;
  }

  ngOnInit(): void {

  }
  onSubmit() {
    const formData = {
      gameplay: this.gameplay,
      music: this.music,
      design: this.design,
      story: this.story,
      difficulty: this.difficulty,
      teamId: this.teamId,
    };
    this.http.post('http://localhost:3000/api/vote', formData)
      .subscribe(data => {
        console.log('Data received:', data);
      }, error => {
        console.error('Error occurred:', error);
      });
      this.close()
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json');
    // const requestOptions = new RequestOptions({ headers: headers });

    // let postData = {
    //   "name": "Customer004",
    //   "email": "customer004@email.com",
    //   "tel": "0000252525"
    // }

    // this.http.post("http://localhost:3000/api/vote", postData, requestOptions)
    //   .subscribe(data => {
    //     // console.log(data['_body']);
    //   }, error => {
    //     console.log(error);
    //   });




  }
  close() {
    this.modalController.dismiss();
  }
}
