import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../Interfaces/ilogin';
import { ILoginResponse } from 'src/app/Interfaces/ilogin-response';
import { IRegister } from 'src/app/Interfaces/iRegister';
import { IServerResponse } from 'src/app/Interfaces/iServerResponse';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private endPoint = environment.api_url + 'auth';
	private currentUserSource = new ReplaySubject<ILoginResponse | null>(1);
	public currentUser$ = this.currentUserSource.asObservable();
	private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
	public isAuthenticated$ = this.isAuthenticatedSource.asObservable();

	constructor(
		private $http: HttpClient,
		private $router: Router,
		private _toast: ToastService
	) {}

	login(model: ILogin): void {
		this.$http
			.post<ILoginResponse>(this.endPoint + '/login', model)
			.subscribe((data: ILoginResponse) => {
				if (data.status) {
					this.saveSession(data);
					this.$router.navigate(['dashboard']); // TODO: navigate to Dashboard Component, create the component
					this._toast.ShowSuccess({
						title: 'login succed',
						message: 'Welcome back',
					});
				}

				this._toast.ShowFailure({
					title: 'Login failed',
					message: 'Login process failed',
				});
			});
	}

	private saveSession(data: ILoginResponse): void {
		const { userId, username, token, role, status } = data;

		sessionStorage.setItem('token', token);
		sessionStorage.setItem('username', username);
		sessionStorage.setItem('userId', userId);

		this.isAuthenticatedSource.next(true);
		this.currentUserSource.next(data);
	}

	register(model: IRegister): Observable<IServerResponse> {
		return this.$http.post<IServerResponse>(this.endPoint + '/register', model);
	}

	logout(): void {
		sessionStorage.clear();
		this.currentUserSource.next();
		this.isAuthenticatedSource.next(false);
		this.$router.navigateByUrl('/');
	}

	CheckStatus(): void {
		const username = sessionStorage.getItem('username');
		if (username != null) {
			this.isAuthenticatedSource.next(true);
			this.$router.navigate(['dashboard', username]);
		} else {
			this.isAuthenticatedSource.next(false);
		}
	}

	GetCurrentUser(): void {
		const username = sessionStorage.getItem('username');
		const token = sessionStorage.getItem('token');
		const userId = sessionStorage.getItem('userId');

		username != null && token != null && userId != null
			? this.currentUserSource.next({
					username: username,
					token: token,
					userId: userId,
					role: '',
					status: true,
			  })
			: this.currentUserSource.next();
	}
}
