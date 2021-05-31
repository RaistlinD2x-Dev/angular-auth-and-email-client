import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { EmailService } from '../email.service';
// import { switchMap } from 'rxjs/operators';
import { Email } from '../email';


@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    private route: ActivatedRoute,
    // private emailService: EmailService,
    ) { 
      //initializes email to the snapshot so that it can't be undefined
      this.email = this.route.snapshot.data.email;
      // subscribes to the resolver Observable
      this.route.data.subscribe(({ email }) => {
        this.email = email
      })
    }

  ngOnInit(): void {
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email) => {
    //   this.email = email;
    // })

    // creates issues with slow http requests
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe(email => {
    //     console.log(email)
    //   })
    // })

    // does not update with child loading unless you destroy parent component
    // console.log(this.route.snapshot.params.id)
  }

}
