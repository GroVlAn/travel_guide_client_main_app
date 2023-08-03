export type TPasswordError = {
  pattern: string,
  isError: boolean,
  message: string,
}

export type TPasswordErrorsList = {
  isEmpty: TPasswordError,
  isSame: TPasswordError,
  isHasLowerLetters: TPasswordError,
  isHasUpperLetters: TPasswordError
  isHasNumbers: TPasswordError,
  isHasSpecialsSymbols: TPasswordError,
  isShort: TPasswordError,
}

export type TSignInErrors = {
  password: TPasswordError
}

export type TPasswordValidationPattern = {
  type: string,
  pattern: string
}
