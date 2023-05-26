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

	@ViewChild('content', { static: true }) input: ElementRef;

	latLng: LatLng;

	isCreateModalOpen: boolean = false;
	isListModalOpen: boolean = false;
	fieldsRequired: boolean = false;

	apiKey: string;

	basestationForm = new FormGroup({
		lac: new FormControl(
			{ value: null, disabled: !this.fieldsRequired },
			this.fieldsRequired ? [Validators.required] : []
		),
		cell: new FormControl(
			{ value: null, disabled: !this.fieldsRequired },
			this.fieldsRequired ? [Validators.required] : []
		),
		radioType: new FormControl(null, [Validators.required]),
		address: new FormControl(null, [Validators.required]),
		region: new FormControl(
			{ value: null, disabled: !this.fieldsRequired },
			this.fieldsRequired ? [Validators.required] : []
		)
	});

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

	addBasestation() {
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

	addBasestations() {
		this.lbsService.addBasestations(this.basestations).subscribe(
			() => {
				this.basestations = [];
				alert('Данные успешно отправлены');
        this.addBasestationComponent.deleteBasestations();
			},
			error => {
				console.log(error);
			}
		);
	}

	deleteBasestationPoint(latitude: number, longitude: number) {
		this.addBasestationComponent.deleteBasestationPoint(latitude, longitude);
	}

	deleteBasestation(basestation: Basestation) {
		this.basestations = this.basestations.filter(bs => bs !== basestation);
		this.deleteBasestationPoint(basestation.latitude, basestation.longitude);
	}

	onListModalOpen() {
		this.isListModalOpen = true;
	}

	onCreateModalClosed() {
		this.isCreateModalOpen = false;

		const { lat: latitude, lng: longitude } = this.latLng;
		this.deleteBasestationPoint(latitude, longitude);
	}

	onListModalClosed() {
		this.isListModalOpen = false;
	}

	setValidators() {
		if (this.fieldsRequired) {
			this.basestationForm.controls['lac'].setValidators([Validators.required]);
			this.basestationForm.get('lac').enable();

			this.basestationForm.controls['cell'].setValidators([Validators.required]);
			this.basestationForm.get('cell').enable();

			this.basestationForm.controls['region'].setValidators([Validators.required]);
			this.basestationForm.get('region').enable();
		} else {
			this.basestationForm.controls['lac'].clearValidators();
			this.basestationForm.get('lac').setValue(null);
			this.basestationForm.get('lac').disable();

			this.basestationForm.controls['cell'].clearValidators();
			this.basestationForm.get('cell').setValue(null);
			this.basestationForm.get('cell').disable();

			this.basestationForm.controls['region'].clearValidators();
			this.basestationForm.get('region').setValue(null);
			this.basestationForm.get('region').disable();
		}

		this.basestationForm.controls['lac'].updateValueAndValidity();
		this.basestationForm.controls['cell'].updateValueAndValidity();
		this.basestationForm.controls['region'].updateValueAndValidity();
	}
}
