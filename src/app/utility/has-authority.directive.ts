import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoginService} from '../account/login/login.service';
import decode from 'jwt-decode';
import {isUndefined} from 'util';

@Directive({
  selector: '[hasAuthority]'
})
export class HasAuthorityDirective {

  private authority: string;
  constructor(private loginService: LoginService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set hasAuthority(authority: string) {
    this.authority = authority;
    this.updateView();
    this.loginService.getAuthenticationState().subscribe(() => this.updateView());
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    const token = localStorage.getItem('authenticationToken');
    if (token === null) {
      return;
    }
    // decode the token to get its payload
    const tokenPayload = decode(token);

    if (
      !this.loginService.authenticated ||
      tokenPayload.auth !== this.authority
    ) {
      return;
    }

    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
