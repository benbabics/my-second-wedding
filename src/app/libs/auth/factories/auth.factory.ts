import { AuthenticationService } from '../services/authentication.service';

export function AuthStateFactory(
  authService: AuthenticationService,
) {
  return () => new Promise(
    resolve => authService.onAuthStateChanged(resolve)
  );
}
