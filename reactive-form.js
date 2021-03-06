"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var ReactiveForm = (function () {
    function ReactiveForm(fb) {
        this.fb = fb;
        this.showButtons = false;
        this.convertToFormGroup = function (classObj) {
            var frmGrp = {};
            classObj.forEach(function (el, idx, arr) {
                var ctrl = new forms_1.FormControl(el.defaultValue);
                frmGrp[el.name] = ctrl;
                el.control = ctrl;
            });
            return frmGrp;
        };
    }
    ReactiveForm.prototype.ngOnInit = function () {
        var _this = this;
        this.rForm = this.fb.group(this.convertToFormGroup(this.formObject.fieldObject));
        this.rForm.valueChanges.subscribe(function (x) { return _this.output = x; });
    };
    ReactiveForm.prototype.onSubmitModelBased = function () {
        console.log("model-based form submitted");
        console.log(this.form);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReactiveForm.prototype, "formObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReactiveForm.prototype, "cancelFunction", void 0);
    __decorate([
        core_1.Input("show-buttons"), 
        __metadata('design:type', Boolean)
    ], ReactiveForm.prototype, "showButtons", void 0);
    ReactiveForm = __decorate([
        core_1.Component({
            selector: 'reactive-form',
            template: "\n\t\t<form [formGroup]=\"rForm\">\n\t\t\t<div *ngFor=\"let control of formObject.formObject.controls\">\n\t\t\t\t<fieldset *ngIf=\"control.type === 'fieldset'\" [ngStyle]=\"control.css\">\n\t\t\t\t\t<reactive-form-input *ngFor=\"let field of control.fields\" [fieldObject]=\"field\"></reactive-form-input>\n\t\t\t\t</fieldset>\n\t\t\t\t<reactive-form-input *ngIf=\"control.type === 'input'\" [fieldObject]=\"control\"></reactive-form-input>\n\t\t\t</div>\n\t\t</form>\n\t\t<div class=\"row\" *ngIf=\"showButtons\">\n\t\t\t<hr>\n\t\t\t<button class=\"btn btn-primary\" (click)=\"formObject.submit(output)\">{{formObject.submitLabel}}</button>\n\t\t\t<button class=\"btn btn-default\" (click)=\"cancelFunction()\">Cancel</button>\n\t\t</div>\n\t",
            styles: ["\n\t\tbutton {float: right; margin: 10px 20px 0 -10px;}\n\t"]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ReactiveForm);
    return ReactiveForm;
}());
exports.ReactiveForm = ReactiveForm;
//# sourceMappingURL=reactive-form.js.map