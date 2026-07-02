import { HttpInterceptorFn } from '@angular/common/http';

// DEMO ONLY — hardcoded placeholder credentials for the walking skeleton.
// This matches the single in-memory backend user and MUST be replaced by a
// real login flow before any deployment.
export const authInterceptor: HttpInterceptorFn = (req, next) =>
  next(
    req.clone({
      setHeaders: { Authorization: 'Basic ' + btoa('demo:greenbox123') },
    }),
  );
