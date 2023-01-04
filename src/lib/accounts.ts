// At least 1 lowercase letter, 1 uppercase letter, 1 numeric character, one of these characters: !@#$%^&*
// and at least 8 characters long
export const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
