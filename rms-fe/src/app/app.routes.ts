import { Routes } from '@angular/router';
import { SandboxComponent } from '../components/sandbox/sandbox.component';
import { AuthComponent } from '../components/auth/auth.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: 'sandbox', component: SandboxComponent, canActivate: [authGuard] },
    { path: 'auth/:method', component: AuthComponent },
    { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
];
