import { ParamsDictionary } from "express-serve-static-core";
export type TypedResponse<T> = import("express").Response<
  StdResponse<T | null>
>;

export interface StdResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: any;
}

export type RequestWithBody<T> = import("express").Request<
  ParamsDictionary,
  null,
  T
>;

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  // token: string;
};

export type SignupResponse = {
  id: string;
  name: string;
  email: string;
};
