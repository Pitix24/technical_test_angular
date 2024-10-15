import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';
import { ClientService } from '../../SDK/client.service';
import { SecurityService } from '../../SDK/security.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit, OnDestroy {
  private _toaStr = inject(ToastrService);
  private _apiToken = inject(SecurityService)
  private _apiClient = inject(ClientService)
  private tokenSubscription: Subscription | undefined;
  private clientSubscription: Subscription | undefined;
  signUpForm!: FormGroup;
  id_token!: string;
  msg!: string;
  msgEmail!: string

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      sendEmail: [true, [Validators.required]],
      token: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]]
    });
  }

  public submit(event: Event) {
    event.preventDefault()
    const { first_name, last_name, email, sendEmail } = this.signUpForm.value
    const idToken = this.id_token

    const clientData = {
        first_name, last_name, email, sendEmailValue: sendEmail, idToken
    }

    this.clientSubscription = this._apiClient.register(clientData).subscribe(response => {
      this.msg = response.message

      if (this.msg === 'Invalid token') {
        this._toaStr.error(this.msg, 'Error');
      }
      else {
        this.msgEmail = response.sendEmail
        this._toaStr.success(`${this.msg}. ${this.msgEmail}`, 'Success');
      }
    });
  }

  public hasErrors(field: string, typeError: string) {
    return (
      this.signUpForm.get(field)?.hasError(typeError) &&
      this.signUpForm.get(field)?.touched
    )
  }

  ngOnInit(): void {
    this.tokenSubscription = this._apiToken.getToken().subscribe(data => {
      this.id_token = data.id_token;
      this.signUpForm.patchValue({
        token: data.token
      });
    })
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) this.tokenSubscription.unsubscribe()
    if (this.clientSubscription) this.clientSubscription.unsubscribe()
  }
}
