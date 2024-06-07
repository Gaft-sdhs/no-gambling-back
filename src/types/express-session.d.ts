import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: { userId: string; uuId: string };
    isLoggin: boolean;
  }
}
  
declare module 'express-serve-static-core' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}