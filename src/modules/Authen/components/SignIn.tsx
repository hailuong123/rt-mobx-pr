import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import HeaderForm from './header/headerForm';
import InputField from '../../../resources/components/InputField';
import CheckField from '../../../resources/components/CheckboxField';
import utility from '../../../utility/validation';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
import AuthenStore from '../stores/AuthenStore';
import verifyStore from '../stores/VerifyStore';
import SuccessContent from './handle/success';
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
export default class SignIn extends React.Component<Props, State> {
  /* tslint:disable:no-string-literal */
  @observable data: object = {};
  @observable dataValidate: any = {
    username: {
      required: false,
      lengthText: false
    },
    password: {
      required: false
    },
    captcha: {
      required: false
    }
  };

  @action setValueFieldValidate(target: any, child: any, bool: boolean) {
    this.dataValidate[target][child] = bool;
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.name === 'checkRemember') {
      this.data[e.target.name] = e.target.checked;
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

  checkRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.RequiredField(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'required', true) 
            : this.setValueFieldValidate(e.target.name, 'required', false);
  }

  spaceCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.checkSpaceField(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'required', true)
            : this.setValueFieldValidate(e.target.name, 'required', false);
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
      AuthenStore.signIn(this.data, 'SignIn');
    } 
  }

  onClickResend = (username: string) => {
    verifyStore.resendVerify(username);
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
                
                <HeaderForm 
                  title={locale.title_signin[lang]} 
                  description={locale.text_signin_explain[lang]} 
                  icon="fa fa-key icon"
                />
                
                <form onSubmit={this.onSubmit}>
                    <div className="contentForm">
                      {verifyStore.status &&
                        <SuccessContent data={verifyStore.data} /> 
                      }
                      <Notification errors={AuthenStore.errors} 
                                    onClick={() => this.onClickResend(this.data['username'])}
                                    componentDisplay="SignIn" />
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
                          <label>{locale.password[lang]}</label>
                          <InputField
                            requiredCheck={this.checkRequired}
                            name="password"
                            placeholder="******"
                            value={this.data['password']}
                            type="password"
                            onChange={this.onChange}
                          />  
                          {(!AuthenStore.isValid && !this.dataValidate['password'].required) && 
                            <span className="error">{locale.username_v[lang]}</span>}
                      </div>

                      <div className="row">
                          <div className="controls-group col-sm-6 term">
                              <label id="rememberMe">
                                <CheckField
                                  name="checkRemember"
                                  value=""
                                  forName="rememberMe"
                                  type="checkbox"
                                  onChange={this.onChange}
                                />
                                {locale.remember_me[lang]}
                              </label>
                          </div>
                          <div className="controls-group col-sm-6 text-right">
                              <Link to={'/forgotpassword'} className="forgotPass">{locale.forgot_password[lang]}</Link>
                          </div>
                      </div>

                      <div className="controls-group">
                        <button className="btn btnSignUp" type="submit">{locale.button_signin[lang]}</button>
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

                      <div className="controls-group footerFormAuthen">
                          {locale.text_bottom_have_not_account[lang]} <Link to={'/signup'}>{locale.text_bottom_signup_now[lang]}</Link>
                      </div>

                    </div>
                </form>

            </div>
          
        </div>
      </div>
      
    );
  }
}