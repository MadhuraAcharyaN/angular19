import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

function logginInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('[Outgoing request]');
  console.log(req);
  // const updatedReq = req.clone({
  //   headers: req.headers.set('x-DEBUG', 'TESTING'),
  // });

  return next(req).pipe(
    tap((resp) => {
      if (resp.type === HttpEventType.Response) {
        console.log('[Incoming Response]');
        console.log(resp.body);
      }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([logginInterceptor]))],
}).catch((err) => console.error(err));
