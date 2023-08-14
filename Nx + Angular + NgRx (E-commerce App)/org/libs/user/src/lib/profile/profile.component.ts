import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../store/user.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../store/user.interface';

@Component({
  selector: 'org-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  mySignal = signal(0)
  transformedSignalIntoObservable = toObservable(this.mySignal) // toObservable is a function that converts a Signal into an Observable

  user = toSignal(this.userService.getUser()) // toSignal is a function that converts an Observable into a Signal

  fullName = computed(() => `${this.user()?.name.firstname} ${this.user()?.name.lastname}`) // computed receives a callback function that returns a value of the Signal

  profileForm!: FormGroup

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        street: [''],
        number: [''],
        zipcode: [''],
        geolocation: this.fb.group({
          lat: ['', Validators.required],
          long: ['', Validators.required],
        })
      }),
    })

    this.loadProfile()
  }

  loadProfile() {
    this.userService.getUser().subscribe((user: User) => {
      this.profileForm.patchValue(user)
    })
  }
}
