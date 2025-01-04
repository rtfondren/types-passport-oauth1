import { Request } from "express";
import { OutgoingHttpHeaders } from "http";
import { Strategy } from "passport";
import { OAuth } from "oauth";

declare class OAuthStrategy extends Strategy {
  name: string;

  /**
   *   NOTE: The _oauth2 property is considered "protected".  Subclasses are
   *         allowed to use it when making protected resource requests to retrieve
   *         the user profile.
   */
  protected _oauth: OAuth;

  constructor(
    options: OAuthStrategy.StrategyOptions,
    verify: OAuthStrategy.VerifyFunction
  );
  constructor(
    options: OAuthStrategy.StrategyOptionsWithRequest,
    verify: OAuthStrategy.VerifyFunctionWithRequest
  );

  authenticate(req: Request, options?: any): void;

  userProfile(
    token: string,
    tokenSecret: string,
    params: any,
    done: (err?: unknown, profile?: any) => void
  ): void;
  requestTokenParams(options: any): object;
  userAuthorizationParams(options: any): object;
  parseErrorResponse(body: any, status: number): Error | null;
}

declare namespace OAuthStrategy {
  interface Metadata {
    requestTokenURL: string;
    accessTokenURL: string;
    userAuthorizationURL: string;
    consumerKey: string;
  }

  type StateStoreStoreCallback = (err: Error | null, state: any) => void;
  type StateStoreVerifyCallback = (err: Error, ok: boolean, state: any) => void;

  interface StateStore {
    store(req: Request, callback: StateStoreStoreCallback): void;
    store(
      req: Request,
      meta: Metadata,
      callback: StateStoreStoreCallback
    ): void;

    verify(
      req: Request,
      state: string,
      callback: StateStoreVerifyCallback
    ): void;
    verify(
      req: Request,
      state: string,
      meta: Metadata,
      callback: StateStoreVerifyCallback
    ): void;
  }

  type VerifyCallback = (
    err?: Error | null | unknown,
    user?: Express.User | false,
    info?: object
  ) => void;

  export type VerifyFunction<TProfile = any, TResults = any> =
    | ((
        accessToken: string,
        refreshToken: string,
        profile: TProfile,
        verified: VerifyCallback
      ) => void)
    | ((
        accessToken: string,
        refreshToken: string,
        results: TResults,
        profile: TProfile,
        verified: VerifyCallback
      ) => void);

  type VerifyFunctionWithRequest<TProfile = any, TResults = any> =
    | ((
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: TProfile,
        verified: VerifyCallback
      ) => void)
    | ((
        req: Request,
        accessToken: string,
        refreshToken: string,
        results: TResults,
        profile: TProfile,
        verified: VerifyCallback
      ) => void);

  interface _StrategyOptionsBase {
    requestTokenURL: string;
    accessTokenURL: string;
    userAuthorizationURL: string;
    consumerKey: string;
    consumerSecret: string;
    signatureMethod: string;
    callbackURL?: string | undefined;
    customHeaders?: OutgoingHttpHeaders | undefined;
    scope?: string | string[] | undefined;
    scopeSeparator?: string | undefined;
    sessionKey?: string | undefined;
    store?: StateStore | undefined;
    state?: any;
    skipUserProfile?: any;
    proxy?: any;
  }

  interface StrategyOptions extends _StrategyOptionsBase {
    passReqToCallback?: false | undefined;
  }

  interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
    passReqToCallback: true;
  }

  type Strategy = OAuthStrategy;
  const Strategy: typeof OAuthStrategy;
}

export = OAuthStrategy;
