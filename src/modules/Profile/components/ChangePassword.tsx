
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import utility from '../../../utility/validation';
import InputField from '../../../resources/components/InputField';
import AppStore from '../../App/stores/AppStore';
import profileStore from '../stores/ProfileStore';
import history from '../../../resources/libs/History';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';
import Notification from '../../../resources/components/Notification';
const Recaptcha = require('react-recaptcha');

interface Props {
  currentParam?: string;
}
interface State {}

@observer
class TokenContent extends React.Component<Props, State> {

  @observable data: object = {};
  @observable dataValidate: any = {
    password: {
      required: false
    },
    newpassword: {
      required: false,
      formatPass: false,
      lengthText: false
    },
    cfmPassword: {
      required: false,
      cfmPassword: false
    },
    captcha: {
      required: false
    }
  };
  @observable isOpenTip: boolean = false;
  @observable recaptchaInstance: any;

  @action setValueFieldValidate(target: any, child: any, bool: boolean) {
    this.dataValidate[target][child] = bool;
  }

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  @action onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.isOpenTip = true;
  }

  checkRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.RequiredField(e.target.value);

    value ? this.setValueFieldValidate(e.target.name, 'required', true)
            : this.setValueFieldValidate(e.target.name, 'required', false);
  }

  /* tslint:disable:no-string-literal */
  checkCompareField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.CompareField(this.data['cfmPassword'], this.data['newpassword']);
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
    
    if (!AppStore.cookieUser) {
      history.push('/');
    }

    var flag: boolean = true; 

    Object.keys(this.dataValidate).map((key: any, index: number) => {
      Object.keys(this.dataValidate[key]).map((item: any) => {
        if (!this.dataValidate[key][item]) {
          flag = false;
          profileStore.checkValid(false);
        }
      });
    });
    if (flag) {
      profileStore.checkValid(true);
    }
    
    if (profileStore.isValid) {
      let localStg = AppStore.cookieUser;
      this.data['token'] = localStg['token'];
      AppStore.toggleLoading(true);
      profileStore.readProfile(localStg['_id'], this.data, 'ChangePassword');
    }

  }

  componentWillMount() {
    profileStore.clearError();
  }

  render () {

    // IF user logged will redirect to Home
    if (!AppStore.cookieUser) {
      history.push('/');
    }
    // Get param
    const { currentParam } = this.props;
    console.log(currentParam);
    // profileStore.updateStatus(currentParam || '');

    // Get language
    const lang = globalStore.lang;

    return (
      
          <div className="overviewInfo">
            <h2 className="titlePartProfile">
                  {locale.change_password[lang]}
            </h2>
            <div className="innerInfoAccount changePassword">

                {/*------------ SUCCESS --------*/}
                {profileStore.status && 
                  
                    <React.Fragment>
                        <p className="successNote">{locale.password_has_change[lang]}</p>
                    </React.Fragment>
                }

                {/*------------ FORM Change pass --------*/}
                <React.Fragment>
                  <form onSubmit={this.onSubmit}>
                      <Notification errors={profileStore.errors} componentDisplay="ChangePassword" />
                      <div className="controls-group">
                          <label>{locale.current_password[lang]}</label>
                          <InputField
                            name="password"
                            placeholder="********"
                            value={this.data['password']}
                            type="password"
                            requiredCheck={this.checkRequired}
                            onChange={this.onChange}
                          />  
                          {(!profileStore.isValid && !this.dataValidate['password'].required) && 
                            <span className="error">{locale.password_v[lang]}</span>}
                      </div>

                      <div className="controls-group">
                          <label>{locale.new_password[lang]}</label>
                          <InputField
                            name="newpassword"
                            placeholder="********"
                            value={this.data['newpassword']}
                            type="password"
                            minLength={8}
                            maxLength={64}
                            requiredCheck={this.checkRequired}
                            passwordCheck={this.formatPassword}
                            CompareField={this.checkCompareField}
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                          />  
                          {(!profileStore.isValid && !this.dataValidate['newpassword'].required) && 
                            <span className="error">{locale.password_v[lang]}</span>}
                            
                          {(!profileStore.isValid && !this.dataValidate['newpassword'].formatPass) && 
                            <span className="error">{locale.password_v_struct[lang]}</span>}

                          {(!profileStore.isValid && !this.dataValidate['newpassword'].lengthText) && 
                            <span className="error">{locale.password_v_length[lang]}</span>}
                      </div>

                      <div className="controls-group">
                          <label>{locale.new_cfm_password[lang]}</label>
                          <InputField
                            name="cfmPassword"
                            placeholder="********"
                            value={this.data['cfmPassword']}
                            type="password"
                            minLength={8}
                            maxLength={64}
                            requiredCheck={this.checkRequired}
                            passwordCheck={this.formatPassword}
                            CompareField={this.checkCompareField}
                            onChange={this.onChange}
                          />  
                          {(!profileStore.isValid && !this.dataValidate['cfmPassword'].required) && 
                            <span className="error">{locale.password_v[lang]}</span>}
                          {(!profileStore.isValid && !this.dataValidate['cfmPassword'].cfmPassword) && 
                            <span className="error">{locale.confirmPassword_v[lang]}</span>}
                      </div>

                      {this.isOpenTip && <div className="row">
                        <div className="controls-group col-sm-12">
                          <p className="noteField">{locale.notePassword[lang]}</p>
                        </div>
                      </div>}

                      <div className="controls-group">
                          <Recaptcha
                              ref={(e: any) => this.recaptchaInstance = e}
                              render="explicit"
                              verifyCallback={this.verifyCaptchaCallback}
                              expiredCallback={this.expiredCallback}
                              sitekey="6LfkRT8UAAAAAK1c2C8FykYxiz4gbVRydBxhteEb" 
                          />
                          {(!profileStore.isValid && !this.dataValidate['captcha'].required) && 
                                <span className="error">{locale.captcha_v[lang]}</span>}
                      </div>

                      <div className="controls-group">
                        <button className="btn btnSignUp" type="submit">{locale.button_changepassword[lang]}</button>
                      </div>
                  </form>
                </React.Fragment>
          </div>
        </div>
    );
  }
}

export default TokenContent as React.ComponentClass<Props>;
