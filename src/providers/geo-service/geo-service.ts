import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/bindCallback';

import { AutoCompleteService } from "ionic2-auto-complete";

declare var google: any;

@Injectable()
export class GeoServiceProvider implements AutoCompleteService {
  labelAttribute = "description";
  autocompleteService: any;
  geocodeService: any;

  constructor(public http: Http) {
    console.log('Hello GeoServiceProvider Provider');
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.geocodeService = new google.maps.Geocoder;
  }

  placePredictions(keyword: string) : Observable<any> {
    const getPlacePredictionsCallback = this.autocompleteService.getPlacePredictions.bind(this.autocompleteService);

    let placePredictionsObservable: any;

    placePredictionsObservable = Observable.bindCallback(getPlacePredictionsCallback, (results, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) throw { status, results };

      return results;
    });

    let config = {
      types: ['geocode'],
      input: keyword,
      componentRestrictions: { country: 'CA' }
    };

    return placePredictionsObservable(config) as Observable<any>;
  }

  getResults(keyword:string) {
    return this.placePredictions(keyword);
  }

  geocodePlaceId(placeId: string) : Observable<any> { 
        const geocodePlaceIdCallback = this.geocodeService.geocode.bind(this.geocodeService);

        let geocodeObservable : any

        geocodeObservable = Observable.bindCallback(geocodePlaceIdCallback, (results, status) => {
            if (status != google.maps.GeocoderStatus.OK) throw {status, results};
                return results;
            }
        );

        let config = {
            placeId: placeId
        }

        return geocodeObservable(config) as Observable<any>;
    }

    geocodeLatLong(lat: number, long: number) : Observable<any> {
        const geocodeLatLongCallback = this.geocodeService.geocode.bind(this.geocodeService);

        let geocodeObservable : any

        geocodeObservable = Observable.bindCallback(geocodeLatLongCallback, (results, status) => {
            if (status != google.maps.GeocoderStatus.OK) throw {status, results};
                return results;
            }
        );

        let config = {
            location: { lat: lat, lng: long }
        }

        return geocodeObservable(config) as Observable<any>;
    }

    getPostalCode(address) {
      console.log("Getting postal code from", address);

      let component = address.address_components.find((c) => {
        return c.types.includes('postal_code');
      });

      return component ? component.short_name : '';
    }
}
