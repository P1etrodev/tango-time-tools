import { CanActivateFn } from '@angular/router';

export const usernameGuard: CanActivateFn = (route, _) => {
  const key: string | null = route.paramMap.get('key');
  return key !== null;
};
