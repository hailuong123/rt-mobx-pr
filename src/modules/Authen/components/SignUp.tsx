import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import HeaderForm from './header/headerForm';
import InputField from '../../../resources/components/InputField';
import CheckField from '../../../resources/components/CheckboxField';
import utility from '../../../utility/validation';
import GlobalStore from '../../App/stores/GlobalStore';
import AuthenStore from '../stores/AuthenStore';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
import history from '../../../resources/libs/History';
import Notification from '../../../resources/components/Notification';

const Recaptcha = require('react-recaptcha');

interface Props {
  currentParam?: string;
}
interface State {}

@observer
export default class SignUp extends React.Component<Props, State> {
  @observable data: object = {};
  @observable dataValidate: any = {
    username: {
      required: false,
      lengthText: false
    },
    email: {
      required: false,
      email: false
    },
    password: {
      required: false,
      formatPass: false,
      lengthText: false
    },
    cfmPassword: {
      required: false,
      cfmPassword: false
    },
    checkAgree: {
      required: false,
    },
    captcha: {
      required: false,
    },
  };
  @observable isOpenTip: boolean = false;
  @observable recaptchaInstance: any;

  @action setValueFieldValidate(target: any, child: any, bool: boolean) {
    this.dataValidate[target][child] = bool;
  }

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'checkAgree') {
      this.data[e.target.name] = e.target.checked;
      this.dataValidate[e.target.name].required = e.target.checked;
    } else {
      this.data[e.target.name] = e.target.value;

      if (e.target.getAttribute('data-min') || e.target.getAttribute('data-max')) {
          if (Number(e.target.getAttribute('data-min')) <= e.target.value.length
              && Number(e.target.getAttribute('data-max')) >= e.target.value.length) {
            this.setValueFieldValidate(e.target.name, 'lengthText', true);
          } else {
            this.setValueFieldValidate(e.target.name, 'lengthText', false);
          } 
      }

    }
  }

  @action onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.isOpenTip = true;
  }

  checkRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.checkSpaceField(e.target.value);

    value ? this.setValueFieldValidate(e.target.name, 'required', true)
            : this.setValueFieldValidate(e.target.name, 'required', false);
  }

  spaceCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.checkSpaceField(e.target.value);

    value ? this.setValueFieldValidate(e.target.name, 'required', true)
            : this.setValueFieldValidate(e.target.name, 'required', false);
  }

  checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.EmailFormat(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'email', true)
            : this.setValueFieldValidate(e.target.name, 'email', false);
  }

    /* tslint:disable:no-string-literal */
  checkCompareField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.CompareField(this.data['cfmPassword'], this.data['password']);
    value ? this.setValueFieldValidate('cfmPassword', 'cfmPassword', true) 
            : this.setValueFieldValidate('cfmPassword', 'cfmPassword', false) ;
  }

  formatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.PasswordValidate(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'formatPass', true) 
            : this.setValueFieldValidate(e.target.name, 'formatPass', false) ;
  }

  @action verifyCaptchaCallback = (response: any) => {
    this.dataValidate['captcha'].required = true;
    this.data['reCaptcha'] = response;
  }
  
  @action expiredCallback = () => {
    this.dataValidate['captcha'].required = false;
    this.data['reCaptcha'] = '';
  }

  @action resetRecaptcha = () => {
    this.recaptchaInstance.reset();
  }

  onSubmit = (e: any): any => {
    e.preventDefault();
    if (AppStore.cookieUser) {
      history.push('/');
      return null;
    }

    var flag = true;
    Object.keys(this.dataValidate).map((key: any, index: number) => {
      Object.keys(this.dataValidate[key]).map((item: any) => {
        if (!this.dataValidate[key][item]) {
          flag = false;
          AuthenStore.validField(false);
        }
      });
    });

    if (flag) {
        AuthenStore.validField(true);
    }
    if (AuthenStore.isValid) {
      AppStore.toggleLoading(true);
      AuthenStore.signUp(this.data, 'SignUp');
    } 
  }

  componentWillMount() {
    AuthenStore.validField(true);
    AuthenStore.clearError();
  }

  render () {
    if (AppStore.cookieUser) {
      history.push('/');
      return null;
    }
    
    const lang = GlobalStore.lang;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3"> 
          
              <div className="innerForm">
                  {/*------------ SUCCESS --------*/}
                  {AuthenStore.status &&
                    <React.Fragment>
                      <HeaderForm 
                          title={locale.title_signup_success[lang]}
                          icon="fa fa-paper-plane icon"
                      />
                      <div className="contentForm">
                        <h1 className="textCongratulation">{locale.text_signup_success_h1[lang]}</h1>
                        <p className="textCongraContent">{locale.text_signup_success_p[lang]} {this.data['email']}</p>
                      </div>
                    </React.Fragment>
                  }

                  {/*------------ FORM SIGN UP --------*/}
                  {!AuthenStore.status &&
                    <React.Fragment>
                      <HeaderForm 
                        title={locale.title_signup[lang]} 
                        description={locale.text_signup_explain[lang]} 
                        icon="fa fa-pencil icon"
                      />
                      <form onSubmit={this.onSubmit}>
                        <div className="contentForm">
                          <Notification errors={AuthenStore.errors} componentDisplay="SignUp" />
                          <div className="controls-group">
                              <label>{locale.username[lang]}</label>
                              <InputField
                                requiredCheck={this.checkRequired}
                                spaceCheck={this.spaceCheck}
                                name="username"
                                placeholder={locale.username[lang]}
                                value={this.data['username']}
                                type="text"
                                minLength={8}
                                maxLength={64}
                                onChange={this.onChange}
                              />
                              {(!AuthenStore.isValid 
                                && !this.dataValidate['username'].required) 
                                && <span className="error">{locale.username_v[lang]}</span>}
                              {(!AuthenStore.isValid && !this.dataValidate['username'].lengthText) && 
                                <span className="error">{locale.username_v_length[lang]}</span>}
                              
                          </div>
                          <div className="controls-group">
                              <label>{locale.email[lang]}</label>
                              <InputField
                                requiredCheck={this.checkRequired}
                                emailCheck={this.checkEmail}
                                name="email"
                                placeholder={locale.email[lang]}
                                value={this.data['email']}
                                type="email"
                                onChange={this.onChange}
                              />  
                              {(!AuthenStore.isValid && !this.dataValidate['email'].required) && 
                                <span className="error">{locale.email_v[lang]}</span>}
                              {(!AuthenStore.isValid && !this.dataValidate['email'].email) && 
                                <span className="error">{locale.email_v_struct[lang]}</span>}
                          </div>
                          <div className="row">
                              <div className="controls-group col-sm-6">
                                  <label>{locale.password[lang]}</label>
                                  <InputField
                                    name="password"
                                    placeholder="******"
                                    value={this.data['password']}
                                    type="password"
                                    minLength={8}
                                    maxLength={64}
                                    requiredCheck={this.checkRequired}
                                    passwordCheck={this.formatPassword}
                                    CompareField={this.checkCompareField}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                  />  
                                  {(!AuthenStore.isValid && !this.dataValidate['password'].required) && 
                                    <span className="error">{locale.password_v[lang]}</span>}
                                  
                                  {(!AuthenStore.isValid && !this.dataValidate['password'].formatPass) && 
                                    <span className="error">{locale.password_v_struct[lang]}</span>}

                                  {(!AuthenStore.isValid && !this.dataValidate['password'].lengthText) && 
                                    <span className="error">{locale.password_v_length[lang]}</span>}
                              </div>
                              <div className="controls-group col-sm-6">
                                  <label>{locale.frm_password[lang]}</label>
                                  <InputField
                                    requiredCheck={this.checkRequired}
                                    CompareField={this.checkCompareField}
                                    name="cfmPassword"
                                    placeholder="******"
                                    value={this.data['cfmPassword']}
                                    type="password"
                                    onChange={this.onChange}
                                  />  
                                  {(!AuthenStore.isValid && !this.dataValidate['cfmPassword'].required) && 
                                    <span className="error">{locale.password_v[lang]}</span>}
                                  {(!AuthenStore.isValid && !this.dataValidate['cfmPassword'].cfmPassword) && 
                                    <span className="error">{locale.confirmPassword_v[lang]}</span>}
                              </div>
                          </div>
                          
                          {this.isOpenTip && <div className="row">
                            <div className="controls-group col-sm-12">
                              <p className="noteField">
                                <span>{locale.password_hint[lang]}</span>
                                {locale.notePassword[lang]}
                              </p>
                            </div>
                          </div>}

                          <div className="controls-group term">
                              <label id="conditionAgree">
                                <CheckField
                                  name="checkAgree"
                                  value=""
                                  forName="conditionAgree"
                                  type="checkbox"
                                  onChange={this.onChange}
                                />
                                {locale.text_i_read[lang]} <a href="#">{locale.text_term_n_condition[lang]}</a>
                                {(!AuthenStore.isValid && !this.dataValidate['checkAgree'].required) && 
                                    <span className="error">{locale.agree_v[lang]}</span>}
                              </label>
                              
                          </div>
                        
                          <div className="controls-group">
                            <button className="btn btnSignUp" type="submit">{locale.button_signup[lang]}</button>
                          </div>
                          
                          <div className="controls-group text-center">
                              <Recaptcha
                                  ref={(e: any) => this.recaptchaInstance = e}
                                  render="explicit"
                                  verifyCallback={this.verifyCaptchaCallback}
                                  expiredCallback={this.expiredCallback}
                                  sitekey="6LfkRT8UAAAAAK1c2C8FykYxiz4gbVRydBxhteEb" 
                              />
                              {(!AuthenStore.isValid && !this.dataValidate['captcha'].required) && 
                                    <span className="error">{locale.captcha_v[lang]}</span>}
                          </div>

                          <div className="controls-group footerFormAuthen">
                              {locale.text_bottom_have_account[lang]} <Link to={'/signin'}>{locale.text_bottom_signin_here[lang]}</Link>
                          </div>

                        </div>
                      </form>
                    </React.Fragment>
                  }
              </div>
         
        </div>
      </div>
      
    );
  }
}