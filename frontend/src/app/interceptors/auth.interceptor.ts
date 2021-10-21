import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private $router: Router) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token: string | null = sessionStorage.getItem('token');
		let req = request;

		if (token) {
			request = req.clone({
				setHeaders: { authorization: `Bearer ${token}` },
			});
		}

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.$router.navigate(['/']);
				}

				return throwError(error);
			})
		);
	}
}
