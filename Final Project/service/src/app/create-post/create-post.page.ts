import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
declare var google;

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
  location: {
    lat: number,
    lon: number
  };
  locSet: boolean;
  imgs: any[];
  constructor(private route: Router, private camera: Camera, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private popoverCtrl: PopoverController) {
    this.title = "";
    this.description = "";
    this.location = {
      lat: 0,
      lon: 0
    };
    this.images = [];
    this.locSet = false;
    this.imgs = [];
  }

  ngOnInit() {
  }
  cancelPost() {
    this.route.navigate(['/home']);
  }
  makePost() {
    if(this.title != "" && this.description != "") {
      var tempPost: Post = new Post(this.images, this.title, this.price, this.description, this.location.lat, this.location.lon, true, firebase.auth().currentUser.uid);
      firebase.database().ref('Posts/'+firebase.auth().currentUser.uid).push(tempPost);
      this.route.navigate(['/home']);
    } else {
      alert("Title and Description can't be Empty!!!");
    }
  }
  async addImages() {
    var options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    await this.camera.getPicture(options).then((img) => {
      console.log(img);
      this.imgs.push(img);
    });
    const name = new Date().getTime().toString();
    var self = this;
    firebase.storage().ref().child('Post Pics/'+firebase.auth().currentUser.uid+'/'+name).putString(this.imgs[this.imgs.length-1], 'base64', {contentType: 'image/jpeg'}).then((x) => {
      firebase.storage().ref().child('Post Pics/'+firebase.auth().currentUser.uid+'/'+name).getDownloadURL().then((url) =>{
        self.images.push(url);
      });
    });
  }
  async chooseLocationOnMap(myEv: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: myEv,
      translucent: false,
    });
    return await popover.present();
  }
  useCurrentLocation() {
    this.locSet = true;
  }
}
export class Post {
  public images: string[];
  public title: string;
  public price: number;
  public description: string;
  public location : {
    lat: number,
    lon: number
  };
  public active: boolean;
  public uid: string;
  constructor(imgs: string[], ttl: string, prc: number, dscr: string, latitude: number, longitude: number, ac: boolean, _uid: string) {
    this.images = [];
    for(var i: number=0; i<imgs.length; i++) {
      this.images.push(imgs[i]);
    }
    this.title = ttl;
    this.price = prc;
    this.description = dscr;
    this.location = {
      lat: latitude,
      lon: longitude
    };
    this.active = ac;
    this.uid = _uid;
  }
  deactivate() {
    this.active = false;
  }
}
