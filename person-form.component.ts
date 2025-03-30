import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{isEditMode ? 'Edit' : 'Create'}} Person</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label>Name:</label>
          <input type="text" [(ngModel)]="person.name" name="name" required>
        </div>
        <div>
          <label>Age:</label>
          <input type="number" [(ngModel)]="person.age" name="age" required>
        </div>
        <div>
          <label>Gender:</label>
          <select [(ngModel)]="person.gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="tel" [(ngModel)]="person.mobileNumber" name="mobileNumber" required>
        </div>
        <button type="submit">{{isEditMode ? 'Update' : 'Create'}}</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; margin: 0 auto; }
    form div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input, select { width: 100%; padding: 8px; }
    button { margin-right: 10px; padding: 8px 15px; }
  `]
})
export class PersonFormComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0,
    gender: '',
    mobileNumber: ''
  };
  isEditMode = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.personService.getById(id).subscribe(person => {
        this.person = person;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.personService.update(this.person._id!, this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.personService.create(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}