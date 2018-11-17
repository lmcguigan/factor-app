import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./StepBtn.css";

class StepBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      theseDirections: ""
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){
    this.loadDirections();
  }

  loadDirections(){
    if (this.props.stepnum === "1"){
      let step1directions = "Identify A, B, and C for the trinomial provided. Don't forget their signs!";
      this.setState({theseDirections: step1directions})
    }
    if (this.props.stepnum === "2"){
      let step2directions = "Fill in the top and bottom portions of the diamond. The top diamond should be the product of A and C. The bottom diamond should be filled in with your B value";
      this.setState({theseDirections: step2directions})
    }
    if (this.props.stepnum === "3"){
      let step3directions = "Fill in the sides of the diamond. What two numbers multiply together to give you the number on the top and add together to give you the number on the bottom?";
      this.setState({theseDirections: step3directions})
    }
    if (this.props.stepnum === "4"){
      let step4directions = "Break the linear term of the quadratic trinomial into two, using the coefficients you found with the diamond and including the variable.";
      this.setState({theseDirections: step4directions})
    }
    if (this.props.stepnum === "5"){
      let step5directions = "Fill in the box with the quadratic term, two linear terms, and constant.";
      this.setState({theseDirections: step5directions})
    }
    if (this.props.stepnum === "6"){
      let step6directions = "Pull out the common factor from each row and each column.";
      this.setState({theseDirections: step6directions})
    }
    if (this.props.stepnum === "7"){
      let step7directions = "Write out the two linear binomial factors. Do not include parentheses.";
      this.setState({theseDirections: step7directions})
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <button id={`Popover-${this.props.stepnum}`} className="btn get-step-btn" onClick={this.toggle}>
          Instructions
        </button>
        <Popover isOpen={this.state.popoverOpen} target={`Popover-${this.props.stepnum}`} toggle={this.toggle}>
          <PopoverHeader>Directions for Step {this.props.stepnum}</PopoverHeader>
          <PopoverBody>{this.state.theseDirections}</PopoverBody>
        </Popover>
      </div>
    );
  }
}
export default StepBtn;
