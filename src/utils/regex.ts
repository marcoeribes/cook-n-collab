export const usernameRegex: RegExp = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{4,20}$/;
export const usernameCharsRegex: RegExp = /^[a-zA-Z0-9]+$/;
export const usernameLengthRegex: RegExp = /^.{4,20}$/;

export const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/;
export const passwordCharsRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
export const passwordLengthRegex: RegExp = /^.{8,128}$/;

export const emailRegex: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
