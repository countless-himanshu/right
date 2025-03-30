import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>People List</h2>
      <a [routerLink]="['/create']" class="btn-add">Add Person</a>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let person of people">
            <td>{{person.name}}</td>
            <td>{{person.age}}</td>
            <td>{{person.gender}}</td>
            <td>{{person.mobileNumber}}</td>
            <td>
              <a [routerLink]="['/edit', person._id]">Edit</a>
              <button (click)="deletePerson(person._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
    .btn-add { display: inline-block; margin-bottom: 20px; padding: 10px; background: #4CAF50; color: white; text-decoration: none; }
  `]
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAll().subscribe(data => {
      this.people = data;
    });
  }

  deletePerson(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.delete(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}