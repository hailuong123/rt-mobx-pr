import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import HeaderForm from './header/headerForm';
import InputField from '../../../resources/components/InputField';
import utility from '../../../utility/validation';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
import AuthenStore from '../stores/AuthenStore';
import history from '../../../resources/libs/History';
import Notification from '../../../resources/components/Notification';
const Recaptcha = require('react-recaptcha');

interface Props {
  currentParam?: string;
}
interface State {
  password: string;
}

@observer
export default class ForgotPass extends React.Component<Props, State> {
  /* tslint:disable:no-string-literal */
  @observable data: object = {};
  @observable dataValidate: any = {
    email: {
      required: false,
      email: false
    },
    captcha: {
      required: false
    }
  };

  @action setValueFieldValidate(target: any, child: any, bool: boolean) {
    this.dataValidate[target][child] = bool;
  }

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.data[e.target.name] = e.target.value;
  }

  checkRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.RequiredField(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'required', true)
            : this.setValueFieldValidate(e.target.name, 'required', false);
  }
  
  checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.EmailFormat(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'email', true) 
            : this.setValueFieldValidate(e.target.name, 'email', false);
  }

  @action verifyCaptchaCallback = (response: any) => {
    this.dataValidate['captcha'].required = true;
    this.data['reCaptcha'] = response;
  }
  
  @action expiredCallback = () => {
    this.dataValidate['captcha'].required = false;
    this.data['reCaptcha'] = '';
  }

  onSubmit = (e: any): any => {
    e.preventDefault();
    if (AppStore.cookieUser) {
      history.push('/');
    }

    var flag: boolean = true;
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
      AuthenStore.forgotPass(this.data['email'], 'ForgotPass');
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
    
    const lang = globalStore.lang;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          
              <div className="innerForm">
                {/*------------ SUCCESS --------*/}
                {AuthenStore.status &&
                  <React.Fragment>
                    <HeaderForm 
                        title={locale.title_forgot_success[lang]}
                        icon="fa fa-paper-plane icon"
                    />
                    <div className="contentForm">
                      <p>{locale.text_forgot_success_p[lang]} {this.data['email']}</p>
                    </div>
                  </React.Fragment>
                }

                {/*------------ FORM SIGN UP --------*/}

                {!AuthenStore.status &&
                  <React.Fragment>
                    <HeaderForm 
                      title={locale.title_forgotpassword[lang]} 
                      description={locale.text_forgotpassword_explain[lang]} 
                      icon="fa fa-lock icon"
                    />
                    <form onSubmit={this.onSubmit}>
                      <div className="contentForm">
                        <Notification errors={AuthenStore.errors}
                             componentDisplay="ForgotPass"  />
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

                        <div className="controls-group text-center">
                            <Recaptcha
                                render="explicit"
                                verifyCallback={this.verifyCaptchaCallback}
                                expiredCallback={this.expiredCallback}
                                sitekey="6LfkRT8UAAAAAK1c2C8FykYxiz4gbVRydBxhteEb" 
                            />
                            {(!AuthenStore.isValid && !this.dataValidate['captcha'].required) && 
                                  <span className="error">{locale.captcha_v[lang]}</span>}
                        </div>

                        <div className="controls-group">
                          <button className="btn btnSignUp" type="submit">{locale.button_forgotpassword[lang]}</button>
                        </div>

                        <div className="controls-group footerFormAuthen">
                            {locale.text_bottom_comeback_login[lang]} <Link to={'/signin'}>{locale.text_bottom_signin[lang]}</Link>
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