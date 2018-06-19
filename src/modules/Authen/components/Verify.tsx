import * as React from 'react';
import { observer } from 'mobx-react';
import { match as Match } from 'react-router';
import * as queryString from 'query-string';
import HeaderForm from './header/headerForm';
import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import globalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import verifyStore from '../stores/VerifyStore';
import locale from '../resources/locale'; 

interface Props {
  match?: Match<IMatchParams>;
  currentParam?: string;
}
interface State {}

@observer
export default class VerifyContent extends React.Component<Props, State> {
  /* tslint:disable:no-string-literal */

  render () {
    const lang = globalStore.lang;
    const query = queryString.parse(location.search);
    AppStore.toggleLoading(true);
    verifyStore.verify(query.token);
    return (
      <section id="mainContent">
        <div className="innerContent">
          <Breadcrumbs {...this.props} />
          <div className="content container verify">
              {verifyStore.status && <div className="row">
                <div className="col-sm-6 offset-sm-3">
                  <div className="innerForm">
                      <HeaderForm 
                          title={locale.title_verify[lang]} 
                          icon="fa fa-check icon"
                      /> 
                      <div className="contentForm">
                          <p className="verified">{locale.text_verified[lang]}</p>
                      </div>
                  </div>
                </div>
              </div>}

              {
                AppStore.isLoading && <div className="loading"><span className="icon-loading">Loading....</span></div>  
              }
          </div>
        </div>
      </section>
    );
  }
}
