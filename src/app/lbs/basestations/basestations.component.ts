import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBasestationComponent, LatLng } from '../add-basestation/add-basestation.component';
import { LbsService } from '../lbs.service';
import { Basestation } from '../model/basestation';

@Component({
  selector: 'app-basestations',
  templateUrl: './basestations.component.html',
  styleUrls: ['./basestations.component.scss']
})
export class BasestationsComponent implements OnInit {

  @ViewChild(AddBasestationComponent, {static: false})
  private addBasestationComponent: AddBasestationComponent|undefined;

  closeResult = '';
  basestations: Basestation[] = [];
  markOnMap = false;

  basestationForm = new FormGroup({
    lac: new FormControl(null, [Validators.required]),
    cell: new FormControl(null, [Validators.required]),
    radioType: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    region: new FormControl(null, [Validators.required])
  })

  @ViewChild("content", { static: true }) input: ElementRef;

  latLng: LatLng;

  isCreateModalOpen: boolean = false;
  isListModalOpen: boolean = false;

  constructor(
    private modalService: NgbModal,
    private lbsService: LbsService
  ) { }

  ngOnInit(): void {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get address() {
    return this.basestationForm.get('address');
  }


  open(content) {
    const {lat: latitude, lng: longitude} = this.latLng;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {


      const basestation: Basestation = {
        ...this.basestationForm.value,
        latitude,
        longitude
      }
      this.basestations.push(basestation);
      this.latLng = null;


      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.deleteBasestationPoint(latitude, longitude)
    });
  }

  setLngLat(latLng: LatLng) {
    this.latLng = latLng;
    // this.open(this.input);
    this.isCreateModalOpen = true;
  }

  deleteBasestationPoint(latitude: number, longitude: number) {
    this.addBasestationComponent.deleteBasestationPoint(latitude, longitude);
  }

  deleteBasestation(basestation: Basestation) {
    this.basestations = this.basestations.filter(bs => bs !== basestation);
    this.deleteBasestationPoint(basestation.latitude, basestation.longitude);
  }


  addBasestations() {
    this.lbsService.addBasestation(this.basestations).subscribe(() => {
      this.basestations = [];
      alert('Данные успешно отправлены');
    })
  }

  onCreateModalClosed() {
    this.isCreateModalOpen = false;

    const {lat: latitude, lng: longitude} = this.latLng;
    this.deleteBasestationPoint(latitude, longitude);
  }

  onListModalOpen() {
    this.isListModalOpen = true;
  }

  onListModalClosed() {
    this.isListModalOpen = false;
  }
  
  save() {
    // save record
    const {lat: latitude, lng: longitude} = this.latLng;
    const basestation: Basestation = {
      ...this.basestationForm.value,
      latitude,
      longitude
    }
    this.basestations.push(basestation);
    this.latLng = null;

    console.log(this.basestations);

    // close modal 
    this.isCreateModalOpen = false;
  }

}
