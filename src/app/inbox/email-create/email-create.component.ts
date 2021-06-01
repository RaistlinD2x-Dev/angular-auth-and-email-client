import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal: boolean = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
    ) { 
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-service.com`,
    }
  }

  ngOnInit(): void {

  }

  onSubmit(email: Email): void {
    // send email via email service
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }

}
