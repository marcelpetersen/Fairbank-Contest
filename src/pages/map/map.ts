import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { FormPage } from '../formPage';

import { RatingsPage } from "../ratings/ratings";

import { GeoServiceProvider } from '../../providers/geo-service/geo-service';
import { EntryProvider } from "../../providers/entry/entry";

import { MapStyle } from './map.style';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage extends FormPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('address') addressElement: any;

  map: any;

  currentPage: any = 2;

  address: any;
  postalCode: any = "";
  position: any;
  marker: any;

  mapLongPress: any;
  mapClickStart: any;

  zone: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public geoService: GeoServiceProvider, public entryProvider: EntryProvider) {
    super(navCtrl, navParams, formBuilder, alertCtrl);

    this.zone = new NgZone({ enableLongStackTrace: false });

    this.form = formBuilder.group({
      address: ['', [Validators.required]],
    });

    this.nextPage = RatingsPage;
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  updateEntry() {
    return this.entryProvider.updateEntry({ postalCode: this.postalCode ? this.postalCode : "" });
  }

  onAddressSelected(event) {
    this.geoService.geocodePlaceId(event.place_id).subscribe((result) => {
      this.setAddress(result[0]);
    });
  }

  setLocation(latLong) {
    this.geoService.geocodeLatLong(latLong.lat(), latLong.lng()).subscribe((result) => {
      this.setAddress(result[0]);
    });
  }

  setAddress(address) {
    this.address = address;
    this.postalCode = this.geoService.getPostalCode(address);
    this.position = new google.maps.LatLng(this.address.geometry.location.lat(), this.address.geometry.location.lng());

    this.zone.run(() => {
      this.addressElement.setValue(this.postalCode);
      this.setMarker();
    });
  }

  setMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }
    
    if (this.position) {
      this.marker = new google.maps.Marker({ position: this.position, title: this.address.description });
      this.marker.setMap(this.map);
      this.map.panTo(this.position);
    }
  }

  loadMap() {
    let latLng = new google.maps.LatLng(43.6950472, -79.452313);
 
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      styles: MapStyle
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    google.maps.event.addListener(this.map, 'click', (e) => {
      if (this.mapLongPress) {
        this.setLocation(e.latLng);
      }
    });

   google.maps.event.addListener(this.map, 'mousedown', (event) => {
      this.mapLongPress = false;
      this.mapClickStart = new Date().getTime();          
    });

   google.maps.event.addListener(this.map, 'mouseup', (event) => {
      let end = new Date().getTime();
      this.mapLongPress = (end - this.mapClickStart < 50) ? false : true;
    });
  }
}