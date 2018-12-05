import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import CheckBtn from "../../components/CheckBtn";
import StepBtn from "../../components/StepBtn";
import GetAnswerBtn from "../../components/GetAnswerBtn";
import Input from "../../components/Form";
import InputEmulator from "../../components/InputEmulator";
import SquareInputEmulator from "../../components/SquareInputEmulator";
import API from "../../utils/API";
import NumberCircle from "../../components/NumberCircle";
import { ModalContainer, Modal, ModalCloseButton, ModalNextButton } from "../../components/Modal";
import "./FactorInterface.css";

class FactorInterface extends Component {
    state = {
        username: "",
        currentProblemId: "",
        userTotalPoints: 0,
        userPointsThisRound: 0,
        A: null,
        B: null,
        BSign: null,
        BnoSign: null,
        CSign: null,
        CnoSign: null,
        C: null,
        //user task 1 inputs - identify A, B, and C
        userA: "",
        userB: "",
        userC: "",
        //user task 2 inputs - fill in top and bottom of diamond
        userAC: "",
        userBottom: "",
        //user task 3 inputs - fill in diamond sides
        userLeftDiamond: "",
        userRightDiamond: "",
        //user task 4 inputs - break linear term into two terms
        userLeftLinearTerm: "",
        userRightLinearTerm: "",
        //user task 5 inputs - fill in the box
        userTopLeftBox: "",
        userTopRightBox: "",
        userBottomLeftBox: "",
        userBottomRightBox: "",
        //user task 6 inputs - pull out common factors
        userTopLeftFactor: "",
        userTopRightFactor: "",
        userLeftTopFactor: "",
        userLeftBottomFactor: "",
        //user task 7 inputs - write out two binomial factors
        userBinomialFactor1: "",
        userBinomialFactor2: "",
        //data the program is pulling from
        commonFactorTopLeft: "",
        commonFactorTopRight: "",
        commonFactorLeftTop: "",
        commonFactorLeftBottom: "",
        linearCoefficients: [-15, 2],
        linearTerms: ["-15x", "2x"],
        linearTermsinBox: ["-15x", "2x"],
        binomialFactors: ["3x+1", "2x-5"],
        step: 1,
        //step 1 checking and showing answer
        step1showAnswer: false,
        step1checkMsg: "",
        step1showCheckMsg: false,
        //step 2 checking and showing answer
        step2showAnswer: false,
        step2checkMsg: "",
        step2showCheckMsg: false,
        //step 3 checking and showing answer
        step3showAnswer: false,
        step3checkMsg: "",
        step3showCheckMsg: false,
        //step 4 checking and showing answer
        step4showAnswer: false,
        step4checkMsg: "",
        step4showCheckMsg: false,
        //step 5 checking and showing answer
        step5showAnswer: false,
        step5checkMsg: "",
        step5showCheckMsg: false,
        //step 6 checking and showing answer
        step6showAnswer: false,
        step6checkMsg: "",
        step6showCheckMsg: false,
        //step 7 checking and showing answer
        step7showAnswer: false,
        step7checkMsg: "",
        step7showCheckMsg: false,
        modalShow: false,
        modalMessage: "",
        modalNextButton: false
    }
    reset() {
        this.setState({
            currentProblemId: "",
            userPointsThisRound: 0,
            userA: "",
            userB: "",
            userC: "",
            //user task 2 inputs - fill in top and bottom of diamond
            userAC: "",
            userBottom: "",
            //user task 3 inputs - fill in diamond sides
            userLeftDiamond: "",
            userRightDiamond: "",
            //user task 4 inputs - break linear term into two terms
            userLeftLinearTerm: "",
            userRightLinearTerm: "",
            //user task 5 inputs - fill in the box
            userTopLeftBox: "",
            userTopRightBox: "",
            userBottomLeftBox: "",
            userBottomRightBox: "",
            //user task 6 inputs - pull out common factors
            userTopLeftFactor: "",
            userTopRightFactor: "",
            userLeftTopFactor: "",
            userLeftBottomFactor: "",
            //user task 7 inputs - write out two binomial factors
            userBinomialFactor1: "",
            userBinomialFactor2: "",
            //data the program is pulling from
            commonFactorTopLeft: "",
            commonFactorTopRight: "",
            commonFactorLeftTop: "",
            commonFactorLeftBottom: "",
            step: 1,
            //step 1 checking and showing answer
            step1showAnswer: false,
            step1checkMsg: "",
            step1showCheckMsg: false,
            //step 2 checking and showing answer
            step2showAnswer: false,
            step2checkMsg: "",
            step2showCheckMsg: false,
            //step 3 checking and showing answer
            step3showAnswer: false,
            step3checkMsg: "",
            step3showCheckMsg: false,
            //step 4 checking and showing answer
            step4showAnswer: false,
            step4checkMsg: "",
            step4showCheckMsg: false,
            //step 5 checking and showing answer
            step5showAnswer: false,
            step5checkMsg: "",
            step5showCheckMsg: false,
            //step 6 checking and showing answer
            step6showAnswer: false,
            step6checkMsg: "",
            step6showCheckMsg: false,
            //step 7 checking and showing answer
            step7showAnswer: false,
            step7checkMsg: "",
            step7showCheckMsg: false,
            modalShow: false,
            modalMessage: "",
            modalNextButton: false
        });
    }
    printState = () => {
        console.log(this.state);
    }
    closeModal() {
        this.setState({ modalShow: false })
    }
    closeModalStep7 = () => {
        this.closeModal();
        this.getNextProblem(this.state.userPointsThisRound);
    };

    componentDidMount() {
        console.log(this.state);
        this.getUserData();
        this.getCommonFactors();
    };

    getCommonFactors = (theseLinearTerms) => {
        console.log(theseLinearTerms);
        if (theseLinearTerms === undefined) {
            console.log(this.state.linearTermsinBox);
            let linearTermsinBoxCopy = [];
            for (let r = 0; r < this.state.linearTermsinBox.length; r++) {
                linearTermsinBoxCopy.push(this.state.linearTermsinBox[r]);
            }
            let linearTermsinBoxCoefficients = []
            for (let p = 0; p < linearTermsinBoxCopy.length; p++) {
                let indexOfX = linearTermsinBoxCopy[p].indexOf("x");
                let linearCoefficientBox = linearTermsinBoxCopy[p].slice(0, indexOfX);
                linearTermsinBoxCoefficients.push(linearCoefficientBox);
            }
            console.log(this.state.linearTermsinBox);
            console.log(linearTermsinBoxCoefficients);
            const commonFactorTL = this.findGCF(this.state.A, linearTermsinBoxCoefficients[1]) + "x";
            let commonFactorTR = this.findGCF(linearTermsinBoxCoefficients[0], this.state.C);
            const commonFactorLT = this.findGCF(this.state.A, linearTermsinBoxCoefficients[0]) + "x";
            let commonFactorLB = this.findGCF(linearTermsinBoxCoefficients[1], this.state.C);
            if (linearTermsinBoxCoefficients[0] < 0 && this.state.C < 0) {
                commonFactorTR = -commonFactorTR;
            }
            if (linearTermsinBoxCoefficients[1] < 0 && this.state.C < 0) {
                commonFactorLB = -commonFactorLB;
            }
            if (linearTermsinBoxCoefficients[0] < 0 && linearTermsinBoxCoefficients[1] < 0) {
                commonFactorTR = -commonFactorTR;
                commonFactorLB = -commonFactorLB;
            }
            console.log(commonFactorTL);
            console.log(commonFactorTR);
            console.log(commonFactorLT);
            console.log(commonFactorLB);
            this.setState({ commonFactorTopLeft: commonFactorTL, commonFactorTopRight: commonFactorTR, commonFactorLeftTop: commonFactorLT, commonFactorLeftBottom: commonFactorLB });

        }
        else {
            let theseLinearTermsCoefficients = [];
            for (let b = 0; b < theseLinearTerms.length; b++) {
                if (theseLinearTerms[b] === "x") {
                    theseLinearTermsCoefficients.push(1);
                }
                else if (theseLinearTerms[b] === "-x") {
                    theseLinearTermsCoefficients.push(-1);
                }
                else {
                    let indexOfX = theseLinearTerms[b].indexOf("x");
                    let thisLinearTermsCoefficient = theseLinearTerms[b].slice(0, indexOfX);
                    theseLinearTermsCoefficients.push(thisLinearTermsCoefficient);
                }
                console.log(theseLinearTermsCoefficients);
            }
            const commonFactorTL = this.findGCF(this.state.A, theseLinearTermsCoefficients[1]) + "x";
            let commonFactorTR = this.findGCF(theseLinearTermsCoefficients[0], this.state.C);
            const commonFactorLT = this.findGCF(this.state.A, theseLinearTermsCoefficients[0]) + "x";
            let commonFactorLB = this.findGCF(theseLinearTermsCoefficients[1], this.state.C);
            if (theseLinearTermsCoefficients[0] < 0 && this.state.C < 0) {
                commonFactorTR = -commonFactorTR;
            }
            if (theseLinearTermsCoefficients[1] < 0 && this.state.C < 0) {
                commonFactorLB = -commonFactorLB;
            }
            if (theseLinearTermsCoefficients[0] < 0 && theseLinearTermsCoefficients[1] < 0) {
                commonFactorTR = -commonFactorTR;
                commonFactorLB = -commonFactorLB;
            }
            console.log(commonFactorTL);
            console.log(commonFactorTR);
            console.log(commonFactorLT);
            console.log(commonFactorLB);
            this.setState({ commonFactorTopLeft: commonFactorTL, commonFactorTopRight: commonFactorTR, commonFactorLeftTop: commonFactorLT, commonFactorLeftBottom: commonFactorLB });

        }
    };

    getNextProblem = (pointsThisRound) => {
        console.log("getting next problem")
        if (pointsThisRound === 7) {
            //mark the problem as solved in the database
            API.updateUserProblems(this.state.currentProblemId).then((response) => {
                console.log(response)
            })
            //update user score in the db
            API.updateUserScore({ userid: this.props.match.params.id, pointsToAdd: pointsThisRound }).then((response) => {
                console.log(response);
            })
        }
        else {
            //problem is not fully solved, it will appear for them again
            //still need to update user score in the db with any points they did receive
            API.updateUserScore({ userid: this.props.match.params.id, pointsToAdd: pointsThisRound }).then((response) => {
                console.log(response);
            })
        }
        //in either case, we will reset the state and get the user data once again to load in a new problem
        this.reset();
        this.getUserData();
    }

    getUserData = () => {
        API.getUser(this.props.match.params.id).then((response) => {
            console.log(response);
            let allUserProblems = response.data.problems;
            //push all unsolved problems to an array
            let unsolvedProblems = [];
            for (let j = 0; j < allUserProblems.length; j++) {
                let thisProblem = allUserProblems[j];
                if (thisProblem.solved === false) {
                    unsolvedProblems.push(thisProblem)
                }
            }
            //randomly choose one problem from the array
            let randomProblem = unsolvedProblems[Math.floor(Math.random() * unsolvedProblems.length)];
            //parse out B and C
            let problemBSign = "";
            if (randomProblem.B < 0) {
                problemBSign = "-"
            }
            else {
                problemBSign = "+"
            }
            let problemCSign = "";
            if (randomProblem.C < 0) {
                problemCSign = "-"
            }
            else {
                problemCSign = "+"
            }
            //store its id in the state
            //set all the applicable parts of the state equal to the values from the problem
            this.setState({
                username: response.data.username,
                userTotalPoints: response.data.points,
                currentProblemId: randomProblem._id,
                A: randomProblem.A,
                B: randomProblem.B,
                C: randomProblem.C,
                BSign: problemBSign,
                BnoSign: Math.abs(randomProblem.B),
                CSign: problemCSign,
                CnoSign: Math.abs(randomProblem.C),
                binomialFactors: randomProblem.binomialFactors,
                linearCoefficients: randomProblem.linearCoefficients,
                linearTerms: [randomProblem.linearCoefficients[0] + "x", randomProblem.linearCoefficients[1] + "x"],
                linearTermsinBox: [randomProblem.linearCoefficients[0] + "x", randomProblem.linearCoefficients[1] + "x"]
            })
            this.getCommonFactors();
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        if (name === "AInput") {
            this.setState({ userA: parseInt(value) })
        }
        if (name === "BInput") {
            this.setState({ userB: parseInt(value) })
        }
        if (name === "CInput") {
            this.setState({ userC: parseInt(value) })
        }
        if (name === "ACInput") {
            this.setState({ userAC: parseInt(value) })
        }
        if (name === "BBottomInput") {
            this.setState({ userBottom: parseInt(value) })
        }
        if (name === "left-linear-diamond") {
            this.setState({ userLeftDiamond: parseInt(value) })
        }
        if (name === "right-linear-diamond") {
            this.setState({ userRightDiamond: parseInt(value) })
        }
        if (name === "linearterm1") {
            this.setState({ userLeftLinearTerm: value })
        }
        if (name === "linearterm2") {
            this.setState({ userRightLinearTerm: value })
        }
        if (name === "box-quadratic-term") {
            this.setState({ userTopLeftBox: value })
        }
        if (name === "box-linear-term-top") {
            this.setState({ userTopRightBox: value })
        }
        if (name === "box-linear-term-bottom") {
            this.setState({ userBottomLeftBox: value })
        }
        if (name === "box-constant") {
            this.setState({ userBottomRightBox: parseInt(value) })
        }
        if (name === "common-factor-top-left") {
            this.setState({ userTopLeftFactor: value })
        }
        if (name === "common-factor-top-right") {
            this.setState({ userTopRightFactor: parseInt(value) })
        }
        if (name === "common-factor-left-top") {
            this.setState({ userLeftTopFactor: value })
        }
        if (name === "common-factor-left-bottom") {
            this.setState({ userLeftBottomFactor: parseInt(value) })
        }
        if (name === "binomial-factor-one") {
            this.setState({ userBinomialFactor1: value })
        }
        if (name === "binomial-factor-two") {
            this.setState({ userBinomialFactor2: value })
        }
    };

    handleTaskOneCheck = () => {
        let taskOneMessage = "";
        let userRoundPoints = this.state.userPointsThisRound;
        if (this.state.userA === this.state.A && this.state.userB === this.state.B && this.state.userC === this.state.C) {
            taskOneMessage = ("A, B, and C correctly identified. Task One Complete.");
            this.setState({
                step: 2,
                step1showAnswer: true,
                modalMessage: taskOneMessage,
                modalShow: true,
                userPointsThisRound: userRoundPoints + 1
            })
        }
        else {
            let messages = "";
            if (this.state.userA === this.state.A) {
                messages = messages + "Your A value " + this.state.userA + " is correct. ";
            }
            else {
                messages = messages + "Your A value " + this.state.userA + " is incorrect. ";
            }
            if (this.state.userB === this.state.B) {
                messages = messages + "Your B value " + this.state.userB + " is correct. ";
            }
            else {
                messages = messages + "Your B value " + this.state.userB + " is incorrect. ";
            }
            if (this.state.userC === this.state.C) {
                messages = messages + "Your C value " + this.state.userC + " is correct. ";
            }
            else {
                messages = messages + "Your C value " + this.state.userC + " is incorrect. "
            }
            taskOneMessage = messages;
        }
        console.log(taskOneMessage);
        this.setState({ step1checkMsg: taskOneMessage, step1showCheckMsg: true })
    };

    handleTaskTwoCheck = () => {
        let taskTwoMessage = "";
        let userRoundPoints = this.state.userPointsThisRound;
        if (this.state.userAC === (this.state.A * this.state.C) && this.state.userBottom === this.state.B) {
            taskTwoMessage = "Top and bottom diamond correctly filled. Task Two complete!";
            this.setState({
                step: 3,
                step2showAnswer: true,
                modalMessage: taskTwoMessage,
                modalShow: true,
                userPointsThisRound: userRoundPoints + 1
            })
        }
        else {
            let messages = "";
            if (this.state.userAC === (this.state.A * this.state.C)) {
                messages = messages + "Your top diamond (AC product) " + this.state.userAC + " is correct. "
            }
            else {
                messages = messages + "Your top diamond (AC product) " + this.state.userAC + " is incorrect. "
            }
            if (this.state.userBottom === this.state.B) {
                messages = messages + "Your bottom diamond (B value) " + this.state.userBottom + " is correct. "
            }
            else {
                messages = messages + "Your bottom diamond (B value) " + this.state.userBottom + " is incorrect. "
            }
            console.log(messages)
            taskTwoMessage = messages;
        }
        console.log(taskTwoMessage);
        this.setState({ step2checkMsg: taskTwoMessage, step2showCheckMsg: true });
    };

    handleTaskThreeCheck = () => {
        //this will create a duplicate copy of the linear coefficient array
        //if its empty when the functions are through that means the user got them both right
        const linearCoefficients = this.state.linearCoefficients;
        let linearCoefficientsCopy = [];
        for (let y = 0; y < linearCoefficients.length; y++) {
            linearCoefficientsCopy.push(linearCoefficients[y])
        }
        let userLinCoArray = [];
        console.log(linearCoefficientsCopy);
        let taskThreeMessage = "";
        let messages = "";
        let userRoundPoints = this.state.userPointsThisRound;
        if (linearCoefficients.indexOf(this.state.userLeftDiamond) !== -1) {
            messages = messages + "Right diamond's value " + this.state.userLeftDiamond + " matches a linear coefficient. ";
            let index = linearCoefficientsCopy.indexOf(this.state.userLeftDiamond);
            linearCoefficientsCopy.splice(index, 1);
            userLinCoArray.push(this.state.userLeftDiamond);
            console.log(linearCoefficients);
            console.log(linearCoefficientsCopy);
            console.log(userLinCoArray);
        }
        else {
            messages = messages + "Right diamond's value " + this.state.userLeftDiamond + " does not match a linear coefficient. ";
        }
        if (linearCoefficients.indexOf(this.state.userRightDiamond) !== -1) {
            messages = messages + "Left diamond's value " + this.state.userRightDiamond + " matches a linear coefficient. ";
            let index = linearCoefficientsCopy.indexOf(this.state.userRightDiamond);
            linearCoefficientsCopy.splice(index, 1);
            userLinCoArray.push(this.state.userRightDiamond);
            console.log(linearCoefficients);
            console.log(linearCoefficientsCopy);
            console.log(userLinCoArray);
        }
        else {
            messages = messages + "Left diamond's value " + this.state.userRightDiamond + " does not match a linear coefficient. ";
        }
        if (linearCoefficientsCopy.length === 0) {
            taskThreeMessage = "Your left and right diamonds contain the correct values. Task Three complete!";
            console.log(taskThreeMessage);
            console.log(userLinCoArray);
            this.setState({
                step: 4, step3showAnswer: true, modalMessage: taskThreeMessage,
                modalShow: true, linearCoefficients: userLinCoArray, userPointsThisRound: userRoundPoints + 1
            })
        }
        else {
            taskThreeMessage = messages;
        }
        console.log(messages);
        console.log(taskThreeMessage);
        this.setState({ step3checkMsg: taskThreeMessage, step3showCheckMsg: true });
    }

    handleTaskFourCheck = () => {
        //make a copy of the linear terms array
        const linearTerms = this.state.linearTerms;
        let linearTermsCopy = [];
        for (let w = 0; w < linearTerms.length; w++) {
            linearTermsCopy.push(linearTerms[w])
        }
        let userLinearTerms = [];
        let taskFourMessage = "";
        let messages = "";
        let thisMessage = "";
        let userRoundPoints = this.state.userPointsThisRound;
        if (linearTerms.indexOf(this.state.userLeftLinearTerm) !== -1) {
            thisMessage = "Linear term entered on the left is correct. "
            messages = messages + thisMessage;
            //remove from array to guard against duplicates
            let index = linearTermsCopy.indexOf(this.state.userLeftLinearTerm);
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userLeftLinearTerm);
        }
        else if (this.state.userLeftLinearTerm === "x" && this.state.linearTerms.indexOf("1x") !== -1) {
            thisMessage = "Linear term entered on the left is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("1x")
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userLeftLinearTerm);
        }
        else if (this.state.userLeftLinearTerm === "-x" && this.state.linearTerms.indexOf("-1x") !== -1) {
            thisMessage = "Linear term entered on the left is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("-1x")
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userLeftLinearTerm);
        }
        else {
            thisMessage = "Linear term entered on the left is incorrect. "
            messages = messages + thisMessage;
        }
        if (linearTerms.indexOf(this.state.userRightLinearTerm) !== -1) {
            console.log(linearTerms);
            let thisMessage = "Linear term entered on the right is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf(this.state.userRightLinearTerm);
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userRightLinearTerm);
        }
        else if (this.state.userRightLinearTerm === "x" && this.state.linearTerms.indexOf("1x") !== -1) {
            thisMessage = "Linear term entered on the left is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("1x")
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userRightLinearTerm);
        }
        else if (this.state.userRightLinearTerm === "-x" && this.state.linearTerms.indexOf("-1x") !== -1) {
            thisMessage = "Linear term entered on the left is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("-1x")
            linearTermsCopy.splice(index, 1);
            userLinearTerms.push(this.state.userRightLinearTerm);
        }
        else {
            thisMessage = "Linear term entered on the right is incorrect. "
            messages = messages + thisMessage;
        }
        if (linearTermsCopy.length === 0) {
            taskFourMessage = "Both linear terms correct. Task Four complete!";
            this.setState({
                step: 5,
                step4showAnswer: true,
                linearTerms: userLinearTerms,
                modalMessage: taskFourMessage,
                modalShow: true,
                userPointsThisRound: userRoundPoints + 1
            })
        }
        else {
            taskFourMessage = messages;
        }
        this.setState({ step4checkMsg: taskFourMessage, step4showCheckMsg: true })
    }

    handleTaskFiveCheck = () => {
        let userRoundPoints = this.state.userPointsThisRound;
        const linearTerms = this.state.linearTerms;
        let linearTermsCopy = [];
        for (let k = 0; k < linearTerms.length; k++) {
            linearTermsCopy.push(linearTerms[k])
        }
        console.log(linearTerms);
        let taskFiveMessage = "";
        let messages = "";
        let thisMessage = "";
        let userLinearTermArray = [];
        if (this.state.userTopLeftBox === (this.state.A + "x^2")) {
            thisMessage = "Quadratic term entered in the top left box is correct. "
            messages = messages + thisMessage;
        }
        else {
            thisMessage = "Quadratic term entered in the top left box is incorrect. "
            messages = messages + thisMessage;
        }
        if (linearTerms.indexOf(this.state.userTopRightBox) !== -1) {
            thisMessage = "Linear term entered in the top right box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf(this.state.userTopRightBox);
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userTopRightBox);
            console.log(linearTerms);
        }
        else if (this.state.userTopRightBox === "x" && this.state.linearTerms.indexOf("1x") !== -1) {
            thisMessage = "Linear term entered in the top right box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("1x")
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userTopRightBox);
        }
        else if (this.state.userTopRightBox === "-x" && this.state.linearTerms.indexOf("-1x") !== -1) {
            thisMessage = "Linear term entered in the top right box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("-1x")
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userTopRightBox);
        }
        else {
            thisMessage = "Linear term entered in the top right box is incorrect. "
            messages = messages + thisMessage;
        }
        if (linearTerms.indexOf(this.state.userBottomLeftBox) !== -1) {
            thisMessage = "Linear term entered in the bottom left box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf(this.state.userBottomLeftBox);
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userBottomLeftBox)
            console.log(linearTerms);
            console.log(userLinearTermArray);
        }
        else if (this.state.userBottomLeftBox === "x" && this.state.linearTerms.indexOf("1x") !== -1) {
            thisMessage = "Linear term entered in the top right box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("1x")
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userBottomLeftBox);
        }
        else if (this.state.userBottomLeftBox === "-x" && this.state.linearTerms.indexOf("-1x") !== -1) {
            thisMessage = "Linear term entered in the top right box is correct. "
            messages = messages + thisMessage;
            let index = linearTermsCopy.indexOf("-1x")
            linearTermsCopy.splice(index, 1);
            userLinearTermArray.push(this.state.userBottomLeftBox);
        }
        else {
            thisMessage = "Linear term entered in the bottom left box is incorrect. "
            messages = messages + thisMessage;
        }
        if (this.state.userBottomRightBox === this.state.C) {
            thisMessage = "Constant entered in bottom right box is correct. "
            messages = messages + thisMessage;
        }
        else {
            thisMessage = "Constant entered in bottom right box is incorrect. "
            messages = messages + thisMessage;
        }
        if (this.state.userTopLeftBox === (this.state.A + "x^2") && linearTermsCopy.length === 0 && this.state.userBottomRightBox === (this.state.C)) {
            taskFiveMessage = "All values entered in the boxes are correct. Task Five complete!";
            this.setState({ step: 6, step5showAnswer: true, modalMessage: taskFiveMessage, modalShow: true, linearTermsinBox: userLinearTermArray, userPointsThisRound: userRoundPoints + 1 })
        }
        else {
            taskFiveMessage = messages;
        }
        console.log(userLinearTermArray);
        this.setState({ step5checkMsg: taskFiveMessage, step5showCheckMsg: true })
        this.getCommonFactors(userLinearTermArray);
    }

    handleTaskSixCheck = () => {
        let userRoundPoints = this.state.userPointsThisRound;
        let taskSixMessage = "";
        let messages = "";
        let thisMessage = "";
        let correctCount = 0;
        let thisUserTopLeftFactor = this.state.userTopLeftFactor;
        //top left common factor
        if (this.state.userTopLeftFactor === this.state.commonFactorTopLeft) {
            thisMessage = "Top left common factor " + this.state.userTopLeftFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else if (this.state.userTopLeftFactor === "x" && this.state.commonFactorTopLeft === "1x") {
            thisMessage = "Top left common factor " + this.state.userTopLeftFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else if (this.state.userTopLeftFactor === "-x" && this.state.commonFactorTopLeft === "-1x") {
            thisMessage = "Top left common factor " + this.state.userTopLeftFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else {
            thisMessage = "Top left common factor " + this.state.userTopLeftFactor + " is incorrect. "
            messages = messages + thisMessage;
        }
        //top right common factor
        if (this.state.userTopRightFactor === this.state.commonFactorTopRight) {
            thisMessage = "Top right common factor " + this.state.userTopRightFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else {
            thisMessage = "Top right common factor " + this.state.userTopRightFactor + " is incorrect. "
            messages = messages + thisMessage;
        }
        //left top common factor
        let thisUserLeftTopFactor = this.state.userLeftTopFactor;
        if (this.state.userLeftTopFactor === this.state.commonFactorLeftTop) {
            thisMessage = "Left top common factor " + this.state.userLeftTopFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else if (this.state.userLeftTopFactor === "x" && this.state.commonFactorLeftTop === "1x") {
            thisMessage = "Left top common factor " + this.state.userLeftTopFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else if (this.state.userLeftTopFactor === "-x" && this.state.commonFactorLeftTop === "-1x") {
            thisMessage = "Left top common factor " + this.state.userLeftTopFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else {
            thisMessage = "Left top common factor " + this.state.userLeftTopFactor + " is incorrect. ";
            messages = messages + thisMessage;
        }
        //left bottom common factor
        if (this.state.userLeftBottomFactor === this.state.commonFactorLeftBottom) {
            thisMessage = "Left bottom common factor " + this.state.userLeftBottomFactor + " is correct. ";
            messages = messages + thisMessage;
            correctCount = correctCount + 1;
        }
        else {
            thisMessage = "Left bottom common factor " + this.state.userLeftBottomFactor + " is incorrect. ";
            messages = messages + thisMessage;
        }
        if (correctCount === 4) {
            taskSixMessage = "All of your common factors are correct. Task Six complete!";
            this.setState({ step: 7, step6showAnswer: true, modalMessage: taskSixMessage, modalShow: true, commonFactorTopLeft: thisUserTopLeftFactor, commonFactorLeftTop: thisUserLeftTopFactor, userPointsThisRound: userRoundPoints + 1 })
        }
        else {
            taskSixMessage = messages;
            this.setState({ step6checkMsg: taskSixMessage, step6showCheckMsg: true })
        }
    }

    handleTaskSevenCheck = () => {
        let userRoundPoints = this.state.userPointsThisRound;
        const binomialFactors = this.state.binomialFactors;
        let binomialFactorsCopy = [];
        for (let q = 0; q < binomialFactors.length; q++) {
            binomialFactorsCopy.push(binomialFactors[q])
        }
        let usersBinomialFactors = [];
        let taskSevenMessage = "";
        let messages = "";
        let thisMessage = "";
        if (binomialFactorsCopy.indexOf(this.state.userBinomialFactor1) !== -1) {
            thisMessage = "The binomial factor entered on the left is correct. "
            let index = binomialFactorsCopy.indexOf(this.state.userBinomialFactor1);
            binomialFactorsCopy.splice(index, 1);
            usersBinomialFactors.push(this.state.userBinomialFactor1);
            console.log(thisMessage);
            messages = messages + thisMessage;
        }
        else {
            thisMessage = "The binomial factor entered on the left is incorrect. "
            console.log(thisMessage)
            messages = messages + thisMessage
        }
        if (binomialFactorsCopy.indexOf(this.state.userBinomialFactor2) !== -1) {
            thisMessage = "The binomial factor entered on the right is correct. "
            let index = binomialFactorsCopy.indexOf(this.state.userBinomialFactor2);
            binomialFactorsCopy.splice(index, 1);
            usersBinomialFactors.push(this.state.userBinomialFactor2);
            console.log(thisMessage)
            messages = messages + thisMessage
        }
        else {
            thisMessage = "The binomial factor entered on the right is incorrect. "
            console.log(thisMessage)
            messages = messages + thisMessage
        }
        if (binomialFactorsCopy.length === 0) {
            taskSevenMessage = "Both of the binomial factors you entered are correct. ";
            this.setState({ step: 7, step7showAnswer: true, binomialFactors: usersBinomialFactors, modalMessage: taskSevenMessage, modalShow: true, modalNextButton: true, userPointsThisRound: userRoundPoints + 1 })
        }
        else {
            taskSevenMessage = messages;
        }
        this.setState({ step7checkMsg: taskSevenMessage, step7showCheckMsg: true })
    }

    handleTaskCheck = (taskNumber) => {
        console.log("Checking task number " + taskNumber);
        console.log(this.state);
        if (taskNumber === 1) {
            if (this.state.step1showCheckMsg === false) {
                this.handleTaskOneCheck();
            }
            else {
                this.setState({ step1showCheckMsg: false })
            }
        }
        if (taskNumber === 2) {
            if (this.state.step2showCheckMsg === false) {
                this.handleTaskTwoCheck();
            }
            else {
                this.setState({ step2showCheckMsg: false })
            }
        }
        if (taskNumber === 3) {
            if (this.state.step3showCheckMsg === false) {
                this.handleTaskThreeCheck();
            }
            else {
                this.setState({ step3showCheckMsg: false })
            }
        }
        if (taskNumber === 4) {
            if (this.state.step4showCheckMsg === false) {
                this.handleTaskFourCheck();
            }
            else {
                this.setState({ step4showCheckMsg: false })
            }
        }
        if (taskNumber === 5) {
            if (this.state.step5showCheckMsg === false) {
                this.handleTaskFiveCheck();
            }
            else {
                this.setState({ step5showCheckMsg: false })
            }
        }
        if (taskNumber === 6) {
            if (this.state.step6showCheckMsg === false) {
                this.handleTaskSixCheck();
            }
            else {
                this.setState({ step6showCheckMsg: false })
            }
        }
        if (taskNumber === 7) {
            if (this.state.step7showCheckMsg === false) {
                this.handleTaskSevenCheck();
            }
            else {
                this.setState({ step7showCheckMsg: false })
            }
        }
    };

    handleGetAns = (taskNumber) => {
        console.log("Getting answer for task number " + taskNumber)
        if (taskNumber === 1) {
            console.log(this.state)
            this.setState({ step1showAnswer: true, step: 2 })
        }
        if (taskNumber === 2) {
            this.setState({ step2showAnswer: true, step: 3 })
        }
        if (taskNumber === 3) {
            this.setState({ step3showAnswer: true, step: 4 })
        }
        if (taskNumber === 4) {
            this.setState({ step4showAnswer: true, step: 5 })
        }
        if (taskNumber === 5) {
            this.setState({ step5showAnswer: true, step: 6 })
        }
        if (taskNumber === 6) {
            this.setState({ step6showAnswer: true, step: 7 })
        }
        if (taskNumber === 7) {
            this.setState({ step7showAnswer: true })
        }
    };

    findGCF = (firstNumber, secondNumber) => {
        firstNumber = Math.abs(firstNumber);
        secondNumber = Math.abs(secondNumber);
        if (secondNumber > firstNumber) { var temporary = firstNumber; firstNumber = secondNumber; secondNumber = temporary; }
        while (true) {
            if (secondNumber === 0) return firstNumber;
            firstNumber %= secondNumber;
            if (firstNumber === 0) return secondNumber;
            secondNumber %= firstNumber;
        }
    }

    render() {
        return (
            <Container fluid>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark" onClick={() =>this.printState()}>
                    <div className="navbar-header">
                        <h1><a className="navbar-brand" href="/">factor.it</a></h1>
                    </div>
                    <ul className="nav navbar-nav ml-auto">
                        <li>Playing as: <span className="yellow">{this.state.username}</span></li>
                        <li>Points this Round: <span className="yellow">{this.state.userPointsThisRound} </span></li>
                        <li>Total Points: <span className="yellow">{this.state.userTotalPoints}</span></li>
                        <li>Step <span className="yellow">{this.state.step}</span> of 7</li>
                        <li><button className="btn next-btn" onClick={() => this.getNextProblem(this.state.userPointsThisRound)}>Next Problem</button></li>
                    </ul>
                </nav>
                <Row clName="body-row">
                    <Col size="12 lg-6">
                        <Row clName="height14">
                            <Col size="4 md-3" clName="numCol">
                                <Row>
                                    <Col size="12">
                                        <NumberCircle stepnum="1"></NumberCircle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size="12">
                                        <StepBtn stepnum="1"></StepBtn>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size="12">
                                        {this.state.step1showAnswer ? (
                                            <div></div>)
                                            : (
                                                <CheckBtn stepnum={1} open={this.state.step1showCheckMsg} message={this.state.step1checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(1)}></CheckBtn>
                                            )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size="12">
                                        {this.state.step1showAnswer ? (
                                            <div></div>)
                                            : (
                                                <GetAnswerBtn onClick={() => this.handleGetAns(1)}></GetAnswerBtn>
                                            )}
                                    </Col>
                                </Row>
                            </Col>
                            <Col size="8 md-9">
                                {this.state.step1showAnswer ? (
                                    <Row clName="justify-content-center">
                                        <Col size="4 md-3" clName="ACol">
                                            <label htmlFor="inputEmulatorA">A</label>
                                            <InputEmulator name="inputEmulatorA">
                                                {this.state.A}
                                            </InputEmulator>
                                        </Col>
                                        <Col size="4 md-3" clName="BCol">
                                            <label htmlFor="inputEmulatorB">B</label>
                                            <InputEmulator name="inputEmulatorB">
                                                {this.state.B}
                                            </InputEmulator>
                                        </Col>
                                        <Col size="4 md-3" clName="CCol">
                                            <label htmlFor="inputEmulatorC">C</label>
                                            <InputEmulator name="inputEmulatorC">
                                                {this.state.C}
                                            </InputEmulator>
                                        </Col>
                                    </Row>

                                ) : (
                                        <Row clName="justify-content-center">
                                            <Col size="4 md-3" clName="ACol">
                                                <label htmlFor="inputA">A</label>
                                                <Input name="AInput" id="inputA" onChange={this.handleInputChange}></Input>
                                            </Col>
                                            <Col size="4 md-3" clName="BCol">
                                                <label htmlFor="inputB">B</label>
                                                <Input name="BInput" id="inputB" onChange={this.handleInputChange}></Input>
                                            </Col>
                                            <Col size="4 md-3" clName="CCol">
                                                <label htmlFor="inputC">C</label>
                                                <Input name="CInput" id="inputC" onChange={this.handleInputChange}></Input>
                                            </Col>
                                        </Row>
                                    )}
                                <Row>
                                    <Col size="12" clName="text-align-center">
                                        {this.state.A === null ? (
                                            <div></div>
                                        ) : (
                                                <h2>{this.state.A}x<sup>2</sup>{this.state.BSign}{this.state.BnoSign}x{this.state.CSign}{this.state.CnoSign}</h2>
                                            )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col size="12 lg-6">
                        {this.state.step < 2 ? (
                            <div></div>
                        ) : (
                                <Row clName="height14-color">
                                    <Col size="12 sm-6" clName='diamond'>
                                        <div>
                                            <Row>
                                                <div className="box box-ac text-align-center">
                                                    <div className="rotateable">
                                                        {this.state.step2showAnswer ? (
                                                            <SquareInputEmulator name="AC-answer">{this.state.A * this.state.C}</SquareInputEmulator>
                                                        ) : (
                                                                <Input className="square-input" name="ACInput" id="inputAC" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="box box-linear box-linear-top text-align-center">
                                                    <div className="rotateable">
                                                        {this.state.step < 3 ? (
                                                            <div></div>
                                                        ) : (
                                                                <div>
                                                                    {this.state.step3showAnswer ? (
                                                                        <SquareInputEmulator name="left-lin-co-answer">{this.state.linearCoefficients[0]}</SquareInputEmulator>
                                                                    ) : (
                                                                            <Input className="square-input" name="left-linear-diamond" id="llin-diamond" onChange={this.handleInputChange}></Input>
                                                                        )}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="box box-linear box-linear-bottom text-align-center">
                                                    <div className="rotateable">
                                                        {this.state.step < 3 ? (
                                                            <div></div>
                                                        ) : (<div>
                                                            {this.state.step3showAnswer ? (
                                                                <SquareInputEmulator name="right-lin-co-answer">{this.state.linearCoefficients[1]}</SquareInputEmulator>
                                                            ) : (
                                                                    <Input className="square-input" name="right-linear-diamond" id="rlin-diamond" onChange={this.handleInputChange}></Input>
                                                                )}

                                                        </div>)}
                                                    </div>
                                                </div>
                                                <div className="box box-bottom">
                                                    <div className="rotateable">
                                                        {this.state.step2showAnswer ? (
                                                            <SquareInputEmulator name="bottom-answer">{this.state.B}</SquareInputEmulator>
                                                        ) : (
                                                                <Input className="square-input" name="BBottomInput" id="inputBBottom" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col size="6 sm-3" clName="numCol">
                                        <Row>
                                            <Col size="12">
                                                <NumberCircle stepnum="2"></NumberCircle>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12"><StepBtn stepnum="2"></StepBtn></Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step2showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <CheckBtn stepnum={2} open={this.state.step2showCheckMsg} message={this.state.step2checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(2)}></CheckBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step2showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <GetAnswerBtn onClick={() => this.handleGetAns(2)}></GetAnswerBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    {this.state.step < 3 ? (
                                        <div></div>
                                    ) : (
                                            <Col size="6 sm-3" clName="numCol">
                                                <Row>
                                                    <Col size="12">
                                                        <NumberCircle stepnum="3"></NumberCircle>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12"><StepBtn stepnum="3"></StepBtn></Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step3showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <CheckBtn stepnum={3} open={this.state.step3showCheckMsg} message={this.state.step3checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(3)}></CheckBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step3showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <GetAnswerBtn onClick={() => this.handleGetAns(3)}></GetAnswerBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )}
                                </Row>
                            )}
                    </Col>
                </Row>
                <Row>
                    {this.state.step < 4 ? (
                        <div></div>
                    ) : (
                            <Col size="12 lg-6">
                                <Row clName="margin-row">
                                    <Col size="12" clName="step4">
                                        <Row>
                                            <Col size="3" clName="numCol">
                                                <Row>
                                                    <Col size="12">
                                                        <NumberCircle stepnum="4"></NumberCircle>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12"><StepBtn stepnum="4"></StepBtn></Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step4showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <CheckBtn stepnum={4} open={this.state.step4showCheckMsg} message={this.state.step4checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(4)}></CheckBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step4showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <GetAnswerBtn onClick={() => this.handleGetAns(4)}></GetAnswerBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col size="9">
                                                {this.state.step4showAnswer ? (
                                                    <Row>
                                                        <Col size="3 md-2" clName="text-align-content lin-term-col">
                                                            <h2 className="floath2">{this.state.A}x<sup>2</sup></h2>
                                                        </Col>
                                                        <Col size="3 md-4" clName="text-align-center lin-term-col">
                                                            <label htmlFor="inputEmulator-lin1">linear term</label>
                                                            <InputEmulator name="inputEmulator-lin1">
                                                                {this.state.linearTerms[0]}
                                                            </InputEmulator>
                                                        </Col>
                                                        <Col size="3 md-4" clName="text-align-center lin-term-col">
                                                            <label htmlFor="inputEmulator-lin2">linear term</label>
                                                            <InputEmulator name="inputEmulator-lin2">
                                                                {this.state.linearTerms[1]}
                                                            </InputEmulator>
                                                        </Col>
                                                        <Col size="3 md-2" clName="text-align-content lin-term-col">
                                                            <h2 className="floath2">{this.state.C}</h2>
                                                        </Col>
                                                    </Row>
                                                )
                                                    : (
                                                        <Row>
                                                            <Col size="2" clName="text-align-content">
                                                                <h2 className="floath2">{this.state.A}x<sup>2</sup></h2>
                                                            </Col>
                                                            <Col size="4" clName="text-align-center">
                                                                <label htmlFor="linearterm1">linear term</label>
                                                                <Input name="linearterm1" id="inputlinear1" onChange={this.handleInputChange}></Input>
                                                            </Col>
                                                            <Col size="4" clName="text-align-center">
                                                                <label htmlFor="linearterm2">linear term</label>
                                                                <Input name="linearterm2" id="inputlinear2" onChange={this.handleInputChange}></Input>
                                                            </Col>
                                                            <Col size="2" clName="text-align-content">
                                                                <h2 className="floath2">{this.state.C}</h2>
                                                            </Col>
                                                        </Row>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    {this.state.step < 5 ? (
                        <div></div>
                    ) : (
                            <Col size="12 lg-6">
                                <Row clName="height18">
                                    <Col size="12 sm-6" clName="boxCol">
                                        <Row>
                                            <div className="box"></div>
                                            {this.state.step < 6 ? (
                                                <div className="box"></div>
                                            ) : (
                                                    <div className="box">
                                                        {this.state.step6showAnswer ? (
                                                            <SquareInputEmulator name="input-emulator-common-top-left">{this.state.commonFactorTopLeft}</SquareInputEmulator>)
                                                            : (
                                                                <Input className="square-input" name="common-factor-top-left" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                )}
                                            {this.state.step < 6 ? (
                                                <div className="box"></div>
                                            ) : (
                                                    <div className="box">
                                                        {this.state.step6showAnswer ? (
                                                            <SquareInputEmulator name="input-emulator-common-top-right">{this.state.commonFactorTopRight}</SquareInputEmulator>)
                                                            : (
                                                                <Input className="square-input" name="common-factor-top-right" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                )}
                                        </Row>
                                        <Row>
                                            {this.state.step < 6 ? (
                                                <div className="box"></div>
                                            ) : (
                                                    <div className="box">
                                                        {this.state.step6showAnswer ? (
                                                            <SquareInputEmulator name="input-emulator-common-left-top">{this.state.commonFactorLeftTop}</SquareInputEmulator>)
                                                            : (
                                                                <Input className="square-input" name="common-factor-left-top" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                )}
                                            <div className="box box-quad">
                                                {this.state.step5showAnswer ? (
                                                    <SquareInputEmulator name="input-emulator-box-quad">{this.state.A}x<sup>2</sup></SquareInputEmulator>)
                                                    : (
                                                        <Input className="square-input" name="box-quadratic-term" onChange={this.handleInputChange}></Input>
                                                    )}
                                            </div>
                                            <div className="box box-linear box-linear-top">
                                                {this.state.step5showAnswer ? (
                                                    <SquareInputEmulator name="input-emulator-box-lin-top">{this.state.linearTermsinBox[0]}</SquareInputEmulator>)
                                                    : (
                                                        <Input className="square-input" name="box-linear-term-top" onChange={this.handleInputChange}></Input>
                                                    )}
                                            </div>
                                        </Row>
                                        <Row>
                                            {this.state.step < 6 ? (
                                                <div className="box"></div>
                                            ) : (
                                                    <div className="box">
                                                        {this.state.step6showAnswer ? (
                                                            <SquareInputEmulator name="input-emulator-common-left-bottom">{this.state.commonFactorLeftBottom}</SquareInputEmulator>)
                                                            : (
                                                                <Input className="square-input" name="common-factor-left-bottom" onChange={this.handleInputChange}></Input>
                                                            )}
                                                    </div>
                                                )}
                                            <div className="box box-linear box-linear-bottom">
                                                {this.state.step5showAnswer ? (
                                                    <SquareInputEmulator name="input-emulator-box-lin-bottom">{this.state.linearTermsinBox[1]}</SquareInputEmulator>)
                                                    : (
                                                        <Input className="square-input" name="box-linear-term-bottom" onChange={this.handleInputChange}></Input>
                                                    )}
                                            </div>
                                            <div className="box box-constant">
                                                {this.state.step5showAnswer ? (
                                                    <SquareInputEmulator name="input-emulator-box-constant">{this.state.C}</SquareInputEmulator>)
                                                    : (
                                                        <Input className="square-input" name="box-constant" onChange={this.handleInputChange}></Input>
                                                    )}
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col size="6 sm-3" clName="numCol">
                                        <Row>
                                            <Col size="12">
                                                <NumberCircle stepnum="5"></NumberCircle>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12"><StepBtn stepnum="5"></StepBtn></Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step5showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <CheckBtn stepnum={5} open={this.state.step5showCheckMsg} message={this.state.step5checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(5)}></CheckBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step5showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <GetAnswerBtn onClick={() => this.handleGetAns(5)}></GetAnswerBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    {this.state.step < 6 ? (
                                        <Col size="6 sm-3" clName="numCol"></Col>
                                    ) : (
                                            <Col size="6 sm-3" clName="numCol">
                                                <Row>
                                                    <Col size="12">
                                                        <NumberCircle stepnum="6"></NumberCircle>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12"><StepBtn stepnum="6"></StepBtn></Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step6showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <CheckBtn stepnum={6} open={this.state.step6showCheckMsg} message={this.state.step6checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(6)}></CheckBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size="12">
                                                        {this.state.step6showAnswer ? (
                                                            <div></div>)
                                                            : (
                                                                <GetAnswerBtn onClick={() => this.handleGetAns(6)}></GetAnswerBtn>
                                                            )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )}
                                </Row>
                            </Col>
                        )}
                </Row>
                <Row clName="justify-content-center">
                    <Col size="12 lg-6">
                        {this.state.step < 7 ? (
                            <div></div>
                        ) : (
                                <Row>
                                    <Col size="3" clName="numCol">
                                        <Row>
                                            <Col size="12">
                                                <NumberCircle stepnum="7"></NumberCircle>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12"><StepBtn stepnum="7"></StepBtn></Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step7showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <CheckBtn stepnum={7} open={this.state.step7showCheckMsg} message={this.state.step7checkMsg} handleTaskCheck={this.handleTaskCheck} onClick={() => this.handleTaskCheck(7)}></CheckBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="12">
                                                {this.state.step7showAnswer ? (
                                                    <div></div>)
                                                    : (
                                                        <GetAnswerBtn onClick={() => this.handleGetAns(7)}></GetAnswerBtn>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size="9">
                                        <Row>
                                            <Col size="6" clName="text-align-center">
                                                {this.state.step7showAnswer ? (
                                                    <div>
                                                        <label htmlFor="input-emulator-binomial-1">binomial factor</label>
                                                        <InputEmulator name="input-emulator-binomial-1">{this.state.binomialFactors[0]}</InputEmulator>
                                                    </div>

                                                ) : (
                                                        <div>
                                                            <label htmlFor="binomial-factor-one">binomial factor</label>
                                                            <Input name="binomial-factor-one" onChange={this.handleInputChange}></Input>
                                                        </div>
                                                    )}
                                            </Col>
                                            <Col size="6" clName="text-align-center">
                                                {this.state.step7showAnswer ? (
                                                    <div>
                                                        <label htmlFor="input-emulator-binomial-2">binomial factor</label>
                                                        <InputEmulator name="input-emulator-binomial-2">{this.state.binomialFactors[1]}</InputEmulator>
                                                    </div>

                                                ) : (
                                                        <div>
                                                            <label htmlFor="binomial-factor-two">binomial factor</label>
                                                            <Input name="binomial-factor-two" onChange={this.handleInputChange}></Input>
                                                        </div>
                                                    )}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            )}
                    </Col>
                </Row>
                {this.state.modalShow ? (
                    <ModalContainer>
                        <Modal>
                            <p className="modaltext">
                                {this.state.modalMessage}
                            </p>
                            {this.state.modalNextButton ? (
                                <ModalNextButton onClick={() => this.closeModalStep7()}></ModalNextButton>
                            ) : (
                                    <ModalCloseButton onClick={() => this.closeModal()}></ModalCloseButton>
                                )}
                        </Modal>
                    </ModalContainer>
                ) : (
                        <ModalContainer>
                        </ModalContainer>
                    )}
            </Container>
        )
    }
}
export default FactorInterface;