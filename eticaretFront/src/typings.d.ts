// src/typings.d.ts

declare module '@okta/okta-auth-js' {
  // Basit, güvenli bir stub — yeterli JS/TS desteği verir.
  export class OktaAuth {
    constructor(options?: any);
    signInWithRedirect(): Promise<void>;
    [key: string]: any;
  }
  export { OktaAuth };
}

declare module '@okta/okta-signin-widget' {
  export default class OktaSignIn {
    constructor(config?: any);
    renderEl(el: any, success?: (res?: any) => void, error?: (err?: any) => void): void;
    showSignInToGetTokens?(options?: any): Promise<any>;
    [key: string]: any;
  }
}
