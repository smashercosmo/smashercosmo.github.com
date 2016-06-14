import React, { Component } from 'react';
import {Multiselect} from 'react-widgets';
import 'react-widgets/lib/less/react-widgets.less'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: [{value: ''}],
      searchTerm: '',
      data: [{value: ''}]
    };
    //this.getItems = debounce(this.getItems, 150);
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
        id="search-filter-keywords"
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
