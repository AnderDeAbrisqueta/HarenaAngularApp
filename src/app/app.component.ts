import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OldPerson } from './model/old-person';
import { OldPersonService } from './services/old-person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  displayOldPersonForm: boolean = false;
  displayConfirmDelete: boolean = false;
  idForDeletion = '';
  descriptionForDeletion = '';

  oldPersons: Observable<OldPerson[]>;

  oldPersonForm = new FormGroup({
    oldPersonId: new FormControl(''),
    name: new FormControl(''),
    imageUrl: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
  });

  formButtonText = 'Add oldPerson';

  constructor(public oldPersonService: OldPersonService) {
    this.oldPersons = this.oldPersonService.getOldPersons();
  }

  addOldPerson() {
   
    this.oldPersonService.addOldPerson(this.oldPersonForm.value);
    this.oldPersonForm.reset({ purchasePrice: 0, salePrice: 0, stock: 0 });
  }

  showOldPerson(id: string) {
    this.oldPersonService
      .getOldPerson(id)
      .subscribe((data) => this.oldPersonForm.patchValue(data));

    this.formButtonText = 'Update oldPerson';
  }

  updateOldPersonButton() {
    this.oldPersonService.updateOldPerson(this.oldPersonForm.value);
  }

  formSubmit() {
    if (this.formButtonText === 'Add oldPerson') {
      this.addOldPerson();
    } else {
      this.updateOldPersonButton();
    }
    this.displayOldPersonForm = false;
  }

  confirmDeleteOldPerson(oldPerson: OldPerson) {
    this.idForDeletion = oldPerson.oldPersonId;
    this.descriptionForDeletion = oldPerson.name;
    this.displayConfirmDelete = true;
  }

  deleteOldPerson() {
    this.oldPersonService.deleteOldPerson(this.idForDeletion);
    this.displayConfirmDelete = false;
  }
}
