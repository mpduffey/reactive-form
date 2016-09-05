import {Component, OnInit, Input}													from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder}	from '@angular/forms';
import {ReactiveFormInput}																from 'modules/reactive-form-input/reactive-form-input';

@Component({
	selector:				'reactive-form',
	template:				`
		<form [formGroup]="rForm">
			<div *ngFor="let control of formObject">
				<fieldset *ngIf="control.type === 'fieldset'" [ngStyle]="control.css">
					<reactive-form-input *ngFor="let field of control.fields" [fieldObject]="field"></reactive-form-input>
				</fieldset>
				<reactive-form-input *ngIf="control.type === 'input'" [fieldObject]="control"></reactive-form-input>
			</div>
		</form>
		<p>{{output | json}}</p>
	`,
	directives:			[ReactiveFormInput]
})

export class ReactiveForm implements OnInit {
	@Input() formObject;
	@Input() fieldObject;
	rForm: FormGroup;
	
	constructor(private fb: FormBuilder) {}
	convertToFormGroup = (classObj) => {
		let frmGrp = {};
		classObj.forEach((el, idx, arr) => {
			let ctrl = new FormControl(el.defaultValue);
			frmGrp[el.name] = ctrl;
			el.control = ctrl;
		});
		console.log("Form Group: ", frmGrp);
		return frmGrp;
	}
	ngOnInit() {
		this.rForm = this.fb.group(this.convertToFormGroup(this.fieldObject));
		this.rForm.valueChanges.subscribe(x => this.output = x);
	}
	onSubmitModelBased() {
		console.log("model-based form submitted");
		console.log(this.form);
	}
}