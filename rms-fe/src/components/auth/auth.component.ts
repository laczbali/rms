import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private readonly route: ActivatedRoute;
  private readonly authService: AuthService;
  public method: string = 'login';

  public get errorMessage(): string {
    if (this.passwordCreate && this.passwordConfirm && this.passwordCreate !== this.passwordConfirm) {
      return 'Passwords do not match';
    }
    return '';
  };

  public email: string = '';
  public password: string = '';
  public emailCreate: string = '';
  public displaynameCreate: string = '';
  public passwordCreate: string = '';
  public passwordConfirm: string = '';

  constructor(route: ActivatedRoute, authService: AuthService) {
    this.route = route;
    this.authService = authService;
  }

  ngOnInit() {
    this.method = this.route.snapshot.paramMap.get('method') ?? 'login';
  }

  async login() {
    if (!this.email || !this.password) { return; }
    await this.authService.login(this.email, this.password);
  }

  async register() {
    if (!this.emailCreate || !this.displaynameCreate || !this.passwordCreate || !this.passwordConfirm) { return; }
    if (this.passwordCreate !== this.passwordConfirm) { return; }
    await this.authService.register(this.emailCreate, this.displaynameCreate, this.passwordCreate);
  }
}
