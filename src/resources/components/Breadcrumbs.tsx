
import * as React from 'react';
import { observer } from 'mobx-react';
import { match as Match } from 'react-router';
import globalStore from '../../modules/App/stores/GlobalStore';
import locale from '../../modules/App/resources//locale';

interface Props {
  match?: Match<IMatchParams>;
  hash?: string;
}
interface State {}

@observer
export default class Breadcrumbs extends React.Component<Props, State> {
  
  render () {
    let hash = '';
    if (this.props.match && this.props.match.params) {
      hash = (this.props.match as any).params.hash;
    }

    const lang = globalStore.lang;
    const currentPath = globalStore.currentPath;
    const breakcrumbs = globalStore.breakcrumbs;
    
    return (
      <div className="headerTitle">
        <div className="container">
          <h2>
            {locale[currentPath][lang]}
            <span> {`${hash !== '' && hash !== undefined ? `#${hash}` : ''}`}</span>
          </h2>
          <div className="breakcrumb">
            <ul>
            {
              (breakcrumbs || []).map((item, index) => (
                <li key={index}>
                  {index !== breakcrumbs.length - 1 &&  <span><a href="/">{locale[`${item}`][lang]}</a>&nbsp;/&nbsp;</span>}
                  {index === breakcrumbs.length - 1 &&  <span><span>{locale[`${item}`][lang]}</span></span>}
                </li>
              ))
            }
            </ul>
          </div>
        </div>
        <hr />
      </div>
    );
  }
} 
