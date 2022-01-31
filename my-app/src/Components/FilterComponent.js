import React, { Component } from 'react';

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      colours: {}
    };
  }

  componentDidMount() {
    this.setState({
      countries: [
        {id: 'AFG', name: 'Afghanistan'},
        {id: 'ALA', name: 'Åland Islands'},
        {id: 'ALB', name: 'Albania'}
      ]
    });
  }

  render () {
    const { countries } = this.state;
    const { uniqueWeaknesses } = this.props;

    let countriesList = uniqueWeaknesses.length > 0
    	&& uniqueWeaknesses.map((item, i) => {
      return (
        <option key={i} value={i}>{item}</option>
      )
    }, this);

    return (
      <div>
        <select>
          {countriesList}
        </select>
      </div>
    );
  }
}

export default Countries;
