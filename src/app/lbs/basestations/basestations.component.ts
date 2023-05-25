import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddBasestationComponent, LatLng } from '../add-basestation/add-basestation.component';
import { LbsService } from '../lbs.service';
import { Basestation } from '../model/basestation';

@Component({
	selector: 'app-basestations',
	templateUrl: './basestations.component.html',
	styleUrls: ['./basestations.component.scss']
})
export class BasestationsComponent implements OnInit {
	@ViewChild(AddBasestationComponent, { static: false })
	private addBasestationComponent: AddBasestationComponent | undefined;

	closeResult = '';
	basestations: Basestation[] = [];
	markOnMap = false;

	basestationForm = new FormGroup({
		lac: new FormControl(null, [Validators.required]),
		cell: new FormControl(null, [Validators.required]),
		radioType: new FormControl(null, [Validators.required]),
		address: new FormControl(null, [Validators.required]),
		region: new FormControl(null, [Validators.required])
	});

	@ViewChild('content', { static: true }) input: ElementRef;

	latLng: LatLng;

	isCreateModalOpen: boolean = false;
	isListModalOpen: boolean = false;

	apiKey: string;

	constructor(private lbsService: LbsService) {}

	ngOnInit(): void {}

	get address() {
		return this.basestationForm.get('address');
	}

	setLngLat(latLng: LatLng) {
		this.latLng = latLng;

		if (this.apiKey) {
			// If api key is entered, get the address from Google Geolocating API

			this.lbsService.getPointAddress(this.latLng.lat, this.latLng.lng, this.apiKey).subscribe(
				data => {
					const address = data?.['results']?.[0]?.['formatted_address'];

					this.basestationForm.setValue({
						address: address,
						lac: this.basestationForm.get('lac').value,
						cell: this.basestationForm.get('cell').value,
						radioType: this.basestationForm.get('radioType').value,
						region: this.basestationForm.get('region').value
					});
				},
				error => {
					console.log(error);
				}
			);
		}

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
		});
	}

	onCreateModalClosed() {
		this.isCreateModalOpen = false;

		const { lat: latitude, lng: longitude } = this.latLng;
		this.deleteBasestationPoint(latitude, longitude);
	}

	onListModalOpen() {
		this.isListModalOpen = true;
	}

	onListModalClosed() {
		this.isListModalOpen = false;
	}

	save() {
		const { lat: latitude, lng: longitude } = this.latLng;
		const basestation: Basestation = {
			...this.basestationForm.value,
			latitude,
			longitude
		};
		this.basestations.push(basestation);
		this.latLng = null;
		this.isCreateModalOpen = false;

		this.basestationForm.setValue({
			address: '',
			lac: this.basestationForm.get('lac').value,
			cell: this.basestationForm.get('cell').value,
			radioType: this.basestationForm.get('radioType').value,
			region: this.basestationForm.get('region').value
		});
	}
}
