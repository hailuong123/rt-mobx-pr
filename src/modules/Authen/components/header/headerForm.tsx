import * as React from 'react';

// import Breadcrumbs from '../../../resources/components/Breadcrumbs';
// import locale from '../../resources/locale'; 

interface Props {
  title: string;
  description?: string;
  icon?: string;
  content?: string;
  lang?: string;
}
interface State {}

export default class HeaderFormContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render () {
    const { title, description, icon } = this.props;
    return (
      <div className="headerForm">
          <h2>
              {title}
              <span>{description}</span>
          </h2>
          <span className={icon}></span>
      </div>
    );
  }
}
