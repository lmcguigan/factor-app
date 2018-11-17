import React from "react";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./CheckBtn.css";

class CheckBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.setPopper = this.setPopper.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  setPopper() {
    console.log(this.props.open)
    if (this.props.open === true) {
      this.setState({ popoverOpen: this.props.open })
    }
  }

  render() {
    return (
      <div>
        <button id={`Popover-Check-${this.props.stepnum}`} onClick={this.props.onClick} className="btn check-btn">
          Check
      </button>
        <Popover isOpen={this.props.open} target={`Popover-Check-${this.props.stepnum}`} toggle={this.setPopper}>
          <PopoverHeader>
            <div className="align-right">
              <span className = "close-span" onClick={() => this.props.handleTaskCheck(this.props.stepnum)}>x</span>
            </div>
            <div>
              Feedback for Task {this.props.stepnum}
            </div>
          </PopoverHeader>
          <PopoverBody>{this.props.message}</PopoverBody>
        </Popover>
      </div>
    )
  }

}

export default CheckBtn;
