import React from 'react';
import {debounce} from 'lodash';
import {Multiselect} from 'react-widgets';
import 'react-widgets/lib/less/react-widgets.less'

export default class Root extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getItems = debounce(this.getItems.bind(this), 150);

    this.state = {
      value: [{value: ''}],
      searchTerm: '',
      data: [{value: ''}]
    };
  }

  getItems(term) {
    this.setState({
      data: [{value: term}]
    });
  }

  onSearch(term) {
    this.setState({
      searchTerm: term
    });
    this.getItems(term);
  }

  onChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <Multiselect
        id="search"
        data={this.state.data}
        value={this.state.value}
        onSearch={this.onSearch}
        searchTerm={this.state.searchTerm}
        valueField="value"
        textField="value"
        onChange={this.onChange}
      />
    );
  }
}