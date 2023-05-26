import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as turf from '@turf/turf';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Feature, FeatureCollection, GeometryCollection, Point } from '@turf/turf';
import { LngLat } from 'mapbox-gl';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class GoogleTiles {
  version = 8;
  sources = {
    'simple-tiles': {
      type: 'raster',
      tiles: [
        'http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      ],
      tileSize: 256
    }
  };
  layers = [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'simple-tiles',
      minzoom: 0,
      maxzoom: 22
    }
  ];
}

export interface LatLng {
  lat: number;
  lng: number;
}


interface Basestation {
  latitude: number;
  longitude: number;
  lac: number;
  cell: number;
  radioType: string;
  address: string;
  region: number
}

enum Icons {
  basestation = '/assets/icons/basestation.svg'
}

export type BsFeature = Feature<GeometryCollection, {
  coords: [number, number];
}>;


export class IconImage {
  constructor(
    public readonly url: string,
    public readonly name: string,
    public loaded = false
  ) { }

  public static fromUrl(url: string) {
    const fileName = url.split('/').pop();
    const fileNameWithoutExt = fileName.substr(0, fileName.length - 4);
    return new IconImage(url, fileNameWithoutExt, false);
  }
}



@Component({
  selector: 'app-add-basestation',
  templateUrl: './add-basestation.component.html',
  styleUrls: ['./add-basestation.component.scss']
})
export class AddBasestationComponent implements OnInit {

  icons = Icons;

  googleTileStyles = new GoogleTiles();

  mapUrl = 'http://10.10.12.161:9696/styles/osm-bright/style.json';

  googleTileStylesIsActive = false;

  featureCollectionPoints: Feature<Point>[] = [];

  iconImages: IconImage[] = [];

  basestationPoints: FeatureCollection;
  basestationPointsHashes = new Map<string, Feature<Point>>();



  @Output()
  markPoint = new EventEmitter<LatLng>();


  private readonly iconsUrls: ReadonlySet<string> = new Set([
    '/assets/icons/basestation.png'
  ]);

  constructor(
    private readonly http: HttpClient,
  ) {
    this.iconsUrls.forEach((url) => {
      this.iconImages.push(IconImage.fromUrl(url));
    });
   }

  ngOnInit(): void {

  }

  deleteBasestationPoint(lat: number, lng: number) {
    const coordsHashId = `${lat}-${lng}`;
    this.basestationPointsHashes.delete(coordsHashId);
    this.basestationPoints = turf.featureCollection(Array.from(this.basestationPointsHashes.values()));
  }

  addBasestationPoint({ lngLat }) {
    if (lngLat) {
      const {lat, lng} = lngLat;
      this.featureCollectionPoints.push(
        turf.point([lng, lat])
      );

      const coordsHashId = `${lat}-${lng}`;
      if (!this.basestationPointsHashes.has(coordsHashId)) {
        const point = turf.point([lng, lat]);
        this.basestationPointsHashes.set(
          coordsHashId,
          point
        );
      }
      this.basestationPoints = turf.featureCollection(Array.from(this.basestationPointsHashes.values()));

      this.markPoint.emit(lngLat);
    }
  }

  allImagesLoaded = false;

  setLocaded(image: IconImage) {
    const im = this.iconImages.find((m) => m === image);
    if (im) {
      im.loaded = true;
    }

    if (this.iconImages.every((v) => v.loaded)) {
      this.allImagesLoaded = true;
    }
  }


  addBasestation({ lngLat }) {

  }

  updateFeautures() {
    const bsPoint = turf.point([-75.343, 39.984]);


  }









}
