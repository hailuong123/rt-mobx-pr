
export const RequiredField = (value: any) => {
  if (value === '') {
    return false;
  } else {
    return true;
  }
};

export const checkSpaceField = (value: any) => {
  var re = /^\S+$/g;
  return re.test(value);
};

export const LengthText = (text: string, numberLength: number) => {
  if (text.length < numberLength) {
    return false;
  } else {
    return true;
  }
};

export const EmailFormat = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const NumberFormat = (n: number) => {
  if (isNaN(n)) {
    return true;
  } else {
    return false;
  }
};

export const CompareField = (text1: string, text2: string) => {
  if (text1 === text2) {
    return true;
  } else {
    return false;
  }
};

export const PhoneField = (phone: string) => {
  var re = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
  return re.test(phone);
};

export const PasswordValidate = (password: string) => {
  // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)\S{0,}$/;
  return re.test(password);
};

export default {
  RequiredField,
  checkSpaceField,
  LengthText,
  EmailFormat,
  NumberFormat,
  CompareField,
  PhoneField,
  PasswordValidate
};
