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
import * as queryString from 'query-string';
import history from '../../../resources/libs/History';
import Notification from '../../../resources/components/Notification';

interface Props {
  currentParam?: string;
}
interface State {
  password: string;
}

@observer
export default class ResetPass extends React.Component<Props, State> {
  /* tslint:disable:no-string-literal */
  @observable userLogged: any = sessionStorage.getItem('LS_user');
  @observable data: object = {};
  @observable dataValidate: any = {
    password: {
      required: false,
      formatPass: false,
      lengthText: false
    },
    cfmPassword: {
      required: false,
      cfmPassword: false
    },
  };
  @observable isOpenTip: boolean = false;

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
    const value = utility.CompareField(this.data['cfmPassword'], this.data['password']);
    value ? this.setValueFieldValidate('cfmPassword', 'cfmPassword', true) 
            : this.setValueFieldValidate('cfmPassword', 'cfmPassword', false) ;
  }

  formatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = utility.PasswordValidate(e.target.value);
    value ? this.setValueFieldValidate(e.target.name, 'formatPass', true) 
            : this.setValueFieldValidate(e.target.name, 'formatPass', false) ;
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
    if (flag) {
      AppStore.toggleLoading(true);
      AuthenStore.resetPass(this.data, 'ResetPass');
    } 
  }

  componentWillMount() {
    AuthenStore.validField(true);
    AuthenStore.clearError();
  }

  render () {
    if (AppStore.cookieUser) {
      history.push('/');
    }

    const lang = globalStore.lang;
    const query = queryString.parse(location.search);
    this.data['token'] = query.token;

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
                      <p>{locale.text_resetpass_success_p[lang]} {this.data['email']}</p>
                    </div>
                  </React.Fragment>
                }

                {!AuthenStore.status &&
                  <React.Fragment>
                    <HeaderForm 
                      title={locale.title_resetpass[lang]} 
                      description={locale.text_resetpass_explain[lang]} 
                      icon="fa fa-lock icon"
                    />
                    <form onSubmit={this.onSubmit}>
                      <div className="contentForm">
                       
                        <Notification errors={AuthenStore.errors}
                               componentDisplay="ResetPass"  />
                        <div className="controls-group">
                            <label>{locale.password_new[lang]}</label>
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

                            {(!AuthenStore.isValid && !this.dataValidate['password'].lengthText) && 
                              <span className="error">{locale.password_v_length[lang]}</span>}

                            {(!AuthenStore.isValid && !this.dataValidate['password'].formatPass) && 
                              <span className="error">{locale.password_v_struct[lang]}</span>}  
                                
                        </div>
                        <div className="controls-group">
                            <label>{locale.frm_password[lang]}</label>
                            <InputField
                              name="cfmPassword"
                              placeholder="******"
                              value={this.data['cfmPassword']}
                              type="password"
                              minLength={8}
                              maxLength={64}
                              requiredCheck={this.checkRequired}
                              passwordCheck={this.formatPassword}
                              CompareField={this.checkCompareField}
                              onChange={this.onChange}
                              onFocus={this.onFocus}
                            />  
                            {(!AuthenStore.isValid && !this.dataValidate['cfmPassword'].required) && 
                              <span className="error">{locale.password_v[lang]}</span>}
                            {(!AuthenStore.isValid && !this.dataValidate['cfmPassword'].cfmPassword) && 
                              <span className="error">{locale.confirmPassword_v[lang]}</span>}
                        </div>
                        {this.isOpenTip && <div className="row">
                          <div className="controls-group col-sm-12">
                              <p className="noteField">
                                <span>{locale.password_hint[lang]}</span>
                                {locale.notePassword[lang]}
                              </p>
                          </div>
                        </div>}
                        <div className="controls-group">
                          <button className="btn btnSignUp" type="submit">{locale.button_resetpassword[lang]}</button>
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