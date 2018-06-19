import * as React from 'react';
import globalStore from '../../../App/stores/GlobalStore';
// import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import locale from '../../resources/locale'; 

interface Props {
  data: object;
}
interface State {}

export default class SuccessContent extends React.Component<Props, State> {
  
  render () {
    const lang = globalStore.lang;
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="controls-group success">
          <ul>  
            <li>
                <p>{locale.text_signin_verify_p[lang]} {data['email']}</p>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
