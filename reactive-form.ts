import {Component, OnInit, Input}													from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder}	from '@angular/forms';

@Component({
	selector:				'reactive-form',
	template:				`
		<form [formGroup]="rForm">
			<div *ngFor="let control of formObject.formObject.controls">
				<fieldset *ngIf="control.type === 'fieldset'" [ngStyle]="control.css">
					<reactive-form-input *ngFor="let field of control.fields" [fieldObject]="field"></reactive-form-input>
				</fieldset>
				<reactive-form-input *ngIf="control.type === 'input'" [fieldObject]="control"></reactive-form-input>
			</div>
		</form>
		<div class="row" *ngIf="showButtons">
			<hr>
			<button class="btn btn-primary" (click)="formObject.submit(output)">{{formObject.submitLabel}}</button>
			<button class="btn btn-default" (click)="cancelFunction()">Cancel</button>
		</div>
	`,
	styles:					[`
		button {float: right; margin: 10px 20px 0 -10px;}
	`]
})

export class ReactiveForm implements OnInit {
	@Input() formObject;
	@Input() cancelFunction;
	@Input("show-buttons") showButtons: boolean = false;
	rForm: FormGroup;
	
	constructor(private fb: FormBuilder) {}
	convertToFormGroup = (classObj) => {
		let frmGrp = {};
		classObj.forEach((el, idx, arr) => {
			let ctrl = new FormControl(el.defaultValue);
			frmGrp[el.name] = ctrl;
			el.control = ctrl;
		});
		return frmGrp;
	}
	ngOnInit() {
		this.rForm = this.fb.group(this.convertToFormGroup(this.formObject.fieldObject));
		this.rForm.valueChanges.subscribe(x => this.output = x);
	}
	onSubmitModelBased() {
		console.log("model-based form submitted");
		console.log(this.form);
	}
}