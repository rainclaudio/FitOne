import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService,AuthResponseData} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}


  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email,password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log("subscribiendo... AUTHENTICATE FUNCTION- AUTH.PAGE");
            // esto aparece antes de realizar un pipe
            /*
            {kind: "identitytoolkit#SignupNewUserResponse", idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOG…TPZ2may6pEehLZ52eOvs42sHZ87_TaLzIvdiQZPvAYQj6Is6w", email: "claudioclaudio@claudio.com", refreshToken: "AGEhc0DGxMgRaJ6RaWZ8bp3p0q_IdXMWHzzhOzuwKFKbVl2Rm8…sM1RhHVH1yco0dZah6T6sATFPT-mZ_pc6gf1U1OFkTs5V0YJw", expiresIn: "3600", …}
email: "claudioclaudio@claudio.com"
expiresIn: "3600"
idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZml0LW9uZS0zNDA4YyIsImF1ZCI6ImZpdC1vbmUtMzQwOGMiLCJhdXRoX3RpbWUiOjE2MjMwNzM0NTksInVzZXJfaWQiOiJpU01MQkNzUHJoYzNRY2R6a1FWUzZBR3FHQ0cyIiwic3ViIjoiaVNNTEJDc1ByaGMzUWNkemtRVlM2QUdxR0NHMiIsImlhdCI6MTYyMzA3MzQ1OSwiZXhwIjoxNjIzMDc3MDU5LCJlbWFpbCI6ImNsYXVkaW9jbGF1ZGlvQGNsYXVkaW8uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImNsYXVkaW9jbGF1ZGlvQGNsYXVkaW8uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.e5DYbLXdBb7iMolUfhjZGdLR7ffQ882ThtX-25a0Ia2YaeHa8PzQw32tu11rtQRDZa6jQM03SUdbq9gV_Z6TUx4gZNRlac3vjyn3fpshEfN4RKAlLlG8SQCnY7_4FsyDt5-uSfCFt0SgitIXYHAqnYfoF0HPRpOaR5whdueVnssySVK-r_O0SKehZf7UQGmbVdAPs8sAUFLKlBJguMPu6dvu4mLNSpPaN1kzE1jj2iR3BMMz05UAWa0vJvNPSQ1wRUHS9GS8vNnyVlQJw62vvmcY1RmbqzU-7m6OXTPZ2may6pEehLZ52eOvs42sHZ87_TaLzIvdiQZPvAYQj6Is6w"
kind: "identitytoolkit#SignupNewUserResponse"
localId: "iSMLBCsPrhc3QcdzkQVS6AGqGCG2"
refreshToken: "AGEhc0DGxMgRaJ6RaWZ8bp3p0q_IdXMWHzzhOzuwKFKbVl2Rm8m06dcL2ZZ-r-T7FAN9yurSE09q38W7y2gpzDsqETwuqr0IEl7ZDOCnAfDYyVEeR5QKh0BZ9eeK139bFG5IX295ZynFHW8W1R0vbacTbw1feWKf48Qrs3SsG7nGo6UV0sM1RhHVH1yco0dZah6T6sATFPT-mZ_pc6gf1U1OFkTs5V0YJw"
__proto__: Object
            */
           // Esto aparece luedo de realiar un pipe: EXACTAMENTE LO MISMO
           /*
{kind: "identitytoolkit#SignupNewUserResponse", idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOG…o_OWcsuI4t25NgDUjS_efZVIsiUkS9bifz9NVsFBBpDE0BcGw", email: "claudioclaudioclaudio@claudio.com", refreshToken: "AGEhc0DU7kgiDQkb0v8Dj6-JNa2fkZ3E-la9vGTI_9Fgo9GY0x…VS3ID_ZLjQvLp0oGFUOefRcW8Nhho9KSVy99XkCtgLJ7JwvVY", expiresIn: "3600", …}
email: "claudioclaudioclaudio@claudio.com"
expiresIn: "3600"
idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZml0LW9uZS0zNDA4YyIsImF1ZCI6ImZpdC1vbmUtMzQwOGMiLCJhdXRoX3RpbWUiOjE2MjMwNzM4NTUsInVzZXJfaWQiOiJsTkl3UEx4OHhDVHRwQzNtQWtmQUlGN1pJNHMyIiwic3ViIjoibE5Jd1BMeDh4Q1R0cEMzbUFrZkFJRjdaSTRzMiIsImlhdCI6MTYyMzA3Mzg1NSwiZXhwIjoxNjIzMDc3NDU1LCJlbWFpbCI6ImNsYXVkaW9jbGF1ZGlvY2xhdWRpb0BjbGF1ZGlvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjbGF1ZGlvY2xhdWRpb2NsYXVkaW9AY2xhdWRpby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kQxUM82XBXEOATNLvNMYaaZhZ30uXe58auQeUr-qRIEfhBTjCWgwG2s0du2A-XJCgSIMUHtyBxDy5vWHRjDxzIkIfdmC4SS0B-rZXpTxwdnlFTa8Q9hbkmaxetwNGOdRUJXN53vL8CaomWabYQyLDaj1ULn8Lp_baXp5CkA5qsm4_AFQl0yKzPCgXv-m05tLTlVP9nrUw7hIpLNB_wIRnMX-qHbqKW48HlvM_AHTf9Wf-6843mjd1iCqtgH3mD_xU615qRWNRutQdQpgh7TwIGJivvZkdmneljo5Fo_OWcsuI4t25NgDUjS_efZVIsiUkS9bifz9NVsFBBpDE0BcGw"
kind: "identitytoolkit#SignupNewUserResponse"
localId: "lNIwPLx8xCTtpC3mAkfAIF7ZI4s2"
refreshToken: "AGEhc0DU7kgiDQkb0v8Dj6-JNa2fkZ3E-la9vGTI_9Fgo9GY0x0xhWuIenZhdq-n4amwUVjRcl8137M3Ch9A65uFtr_BuYRDp7mjIh5l8xKrIS2HO8RGqEHsKiig0hZ_LE9OUBFSC-Y54scwYo038vkW1Y7-41t-MtxL6FjaH5gN_M8ZfX9YqkGNQOKPClaqPD61XwVS3ID_ZLjQvLp0oGFUOefRcW8Nhho9KSVy99XkCtgLJ7JwvVY"
__proto__: Object
           */
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/client-nutri/tabs');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'No pudimos registrarte. Por favor, intentelo de nuevo';
            if (code === 'EMAIL_EXISTS') {
              message = 'Esta dirección de correo electrónico ya existe!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Dirección de correo electrónico no encontrada.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Contraseña incorrecta.';
            }
            this.showAlert(message);
          }
        );
      });
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.authenticate(email,password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
