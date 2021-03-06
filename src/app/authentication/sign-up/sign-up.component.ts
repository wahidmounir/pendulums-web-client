import { Component }                from '@angular/core';
import { AuthenticationService }    from '../../core/services/authentication.service';
import { Router }                   from '@angular/router';

const EMAIL_REGEX = /^(?=.{8,64}$)[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})

export class SignUpComponent {
  errorMessage: string;
  private newUser = {email: null, password: null};
  submitted = false;
  haveResponseOfSubmit = false;
  // this field is used just to handle coming soon text
  // todo: please delete this field and its usages and its css after google sign up implemented
  comingSoon = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signUp() {
    this.comingSoon = false;
    if (!this.submitted) {
      this.submitted = true;
      this.errorMessage = null;
      if (this.validation(this.newUser)) {
        this.newUser.email = this.newUser.email.toLowerCase();
        this.authService.signUp(this.newUser)
          .then(() => {
            this.haveResponseOfSubmit = true;
            this.submitted = false;
          })
          .catch(error => {
            this.submitted = false;
            if (error.status === 400) {
              if (JSON.parse(error.error).errorCode === 3) {
                this.errorMessage = 'User already exists';
              } else {
                this.errorMessage = 'Email or password mismatch';
              }
            } else if (error.status === 503) {
              this.errorMessage = 'You have reached the authentication limits, please try in a few minutes!';
            } else {
              this.errorMessage = 'Server communication error';
            }
          });
      } else {
        this.submitted = false;
      }
    }
  };

  signUpWithGoogle() {
    // todo: please clear this code section after google sign up implemented
    this.errorMessage = null;
    this.comingSoon = true;
    console.log('coming soon.');
  }

  validation(newUser): boolean {
    if (!EMAIL_REGEX.test(newUser.email)) {
      this.errorMessage = 'please enter valid email address';
      return false;
    }
    if (!newUser.password
      || newUser.password.length < 6
      || newUser.password.length > 32) {
      this.errorMessage = 'please choose password with 6 to 32 characters ';
      return false;
    }
    return true;
  }

  redirectToSignIn() {
    this.router.navigate(['signIn']);
  }
}
