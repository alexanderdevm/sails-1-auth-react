import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../Shared/header';
import {
  homeSetFirstValue,
  homeSetSecondValue,
  homeSetValues
} from '../../actions/homeActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fValue: '1',
      sValue: '2'
    };
  }

  componentWillReceiveProps(nextProps) {
    let { firstValue } = this.props;
    console.log(firstValue, nextProps.firstValue);
  }

  render() {
    let { firstValue, secondValue } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <Header />
        <div>
          <h3>Home</h3>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="form-group">
              <label htmlFor="val1">Value 1:</label>
              <input
                type="text"
                className="form-control"
                id="val1"
                onChange={e => this.setfirst(e)}
                value={this.state.fValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="val2">Value 2:</label>
              <input
                type="text"
                className="form-control"
                id="val2"
                onChange={e => this.setSecond(e)}
                value={this.state.sValue}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Move"
                className="btn btn-primary"
                onClick={this.setRValue}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="res1"
                disabled
                value={firstValue}
              />
              <input
                type="text"
                className="form-control"
                id="res2"
                disabled
                value={secondValue}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  setfirst = function(e) {
    this.setState({
      fValue: e.target.value
    });
  };

  setSecond = function(e) {
    this.setState({
      sValue: e.target.value
    });
  };

  setRValue = e => {
    e.preventDefault();
    let { fValue, sValue } = this.state;
    // this.props.hom
    this.props.homeSetValues(fValue, sValue);
    console.log(this.props);
  };
}

Home.propTypes = {
  homeSetSecondValue: PropTypes.func,
  homeSetFirstValue: PropTypes.func,
  homeSetValues: PropTypes.func,
  firstValue: PropTypes.string,
  secondValue: PropTypes.string
};

const mapStateToProps = state => {
  return {
    firstValue: state.homeReducer.firstValue,
    secondValue: state.homeReducer.secondValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeSetFirstValue: value => dispatch(homeSetFirstValue(value)),
    homeSetSecondValue: value => dispatch(homeSetSecondValue(value)),
    homeSetValues: (first, second) => dispatch(homeSetValues(first, second))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
