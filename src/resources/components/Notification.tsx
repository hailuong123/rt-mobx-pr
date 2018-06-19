import * as React from 'react';
import globalStore from '../../modules/App/stores/GlobalStore';
// import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import locale from '../translator/locale'; 
// import verifyStore from '../../stores/VerifyStore'; 

interface Props {
  errors: any;
  username?: string;
  onClick?: Function;
  componentDisplay?: string;
}
interface State {}

export default class ErrorContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render () {
    const lang = globalStore.lang;
    const { errors, componentDisplay } = this.props;
    const errorList = errors.message ? JSON.parse(errors.message) : JSON.stringify(errors.message);
    const showErrorComponent = (componentDisplay && componentDisplay !== errors.componentDisplay) ? false : true;
    if (!showErrorComponent) {
      return null;
    }

    return (
      <React.Fragment>
        <div>
          {errorList &&
            <div className="controls-group errors">
              <ul> 
                
                  {Object.keys(errorList || {}).map((key: string, index: number) => (
                    <li key={key}>
                        <p>
                            {
                                typeof(locale[errorList[key]]) !== 'undefined' 
                                    ? locale[errorList[key]][lang] 
                                    : errorList[key]
                            }
                            {errorList[key] === 'account.not.verified' && <>, <span className="resendEmailVerify" onClick={this.onClick}>{locale.clickHere[lang]}</span> {locale['resend.email.verify'][lang]}</>}
                        </p>
                    </li>
                  ))} 
              </ul>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }

  onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

}
