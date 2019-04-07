import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  images: string[];
  title: string;
  price: number;
  description: string;
  location: string;
  constructor(private route: Router, private camera: Camera) {
    this.title = "";
    this.description = "";
    this.location = "";
    this.images = [];
  }

  ngOnInit() {
  }
  cancelPost() {
    this.route.navigate(['/home']);
  }
  makePost() {

  }
  async addImages() {
    var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,${result}';
    firebase.storage().ref('Post Pics/').putString(image, 'data_url').then(function(snapshot) {
      this.images.push(snapshot.downloadURL);
    });
  }
}
export class Post {
  public images: string[];
  public title: string;
  public price: number;
  public description: string;
  public location: string;
  public active: boolean;
  constructor(imgs: string[], ttl: string, prc: number, dscr: string, loc: string) {
    this.images = [];
    for(var i: number=0; i<imgs.length; i++) {
      this.images.push(imgs[i]);
    }
    this.title = ttl;
    this.price = prc;
    this.description = dscr;
    this.location = loc;
    this.active = true;
  }
  deactivate() {
    this.active = false;
  }
}
