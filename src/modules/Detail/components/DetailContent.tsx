
import * as React from 'react';
import { observer } from 'mobx-react';
// import Popup from '../../../resources/components/Popup';
import SideRightContent from './SideRightContent';
import TransactionDetail from './TransactionDetail';
import BlockDetail from './BlockDetail';
import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import AppStore from '../../App/stores/AppStore';

interface Props {
  hash?: any;
  currentParam: string;
  data: any;
}
interface State {
  type: String;
}

@observer
class DetailContent extends React.Component<Props, State> {
    
  render () {
    const { currentParam } = this.props;
    
    return (
      <section id="mainContent">
        <div className="innerContent">
          <Breadcrumbs {...this.props} />

          <div className="content container">
            {
              !AppStore.isLoading && 
              <div className="row">
                <div className="col">
                  {currentParam === 'transaction' && <TransactionDetail data={this.props.data} />}
                  {currentParam === 'block' && <BlockDetail data={this.props.data} />}
                </div>
                <SideRightContent currentParam={currentParam} data={this.props.data} />
              </div>
            }
            {
              AppStore.isLoading && <div className="loading"><span className="icon-loading">Loading....</span></div>  
            }
          </div>
        </div>
      </section>
    );
  }

}

export default DetailContent as React.ComponentClass<Props>;
