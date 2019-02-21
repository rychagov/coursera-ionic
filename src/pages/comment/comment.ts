import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder ) {

    this.comment = this.formBuilder.group({
      rating: 5,
      author: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    let data = {
      author: this.comment.value.author,
      rating: this.comment.value.rating,
      comment: this.comment.value.comment,
      date: (new Date()).toISOString(),
    };
    this.viewCtrl.dismiss(data);
  }

}
