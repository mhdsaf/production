import React, { Component } from 'react'
import classes from './Question1.css'
import Checkbox from '@material-ui/core/Checkbox'
import {connect} from 'react-redux'
import * as authActions from '../../../../redux/actions/auth'
import { withRouter } from 'react-router-dom'
class Type1 extends Component{
    state = ({
        answersMap: {
            '0':'English',
            '1':'Math',
            '2':'Biology',
            '3':'Chemistry',
            '4':'Physics',
        },
        answers: []
    })
    clickHandler = (event)=>{
        // answers
        let arr = [...this.props.reduxAnswers]
        let answer = this.state.answersMap[event.target.id[0]]
        let answers = [...this.state.answers]
        let index = answers.indexOf(answer)
        if(index > -1){
            answers.splice(index, 1)
        }else{
            answers.push(answer)
        }
        arr[5] = answers
        this.props.saveAnswer(arr)
        //select / unselect
        let s = [...this.props.reduxOptions]
        let c = [...this.props.reduxCheck]
        let c1 = [...c[0]]
        let s1 = [...s[5]]
        if(s1[event.target.id[0]]===''){
            s1[event.target.id[0]] = classes.selected
        }else{
            s1[event.target.id[0]] = ''
        }
        c1[event.target.id[0]] = !c1[event.target.id[0]]
        s[5] = [...s1]
        c[0] = [...c1]
        this.props.saveOptions(s)
        this.props.saveCheck(c)
        this.setState({
            answers: [...answers]
        })
    }
    render() {
        let option1 = ''
        let option2 = ''
        let option3 = ''
        let option4 = ''
        let option5 = ''
        if(this.props.reduxData.page){
            option1 = this.props.reduxData.questions.type2.q1[1]
            option2 = this.props.reduxData.questions.type2.q1[2]
            option3 = this.props.reduxData.questions.type2.q1[3]
            option4 = this.props.reduxData.questions.type2.q1[4]
            option5 = this.props.reduxData.questions.type2.q1[5]
        }
        return (
            <div className='mb-3'>
                <div className="row">
                    <div className="col-6">
                        <div onClick={this.clickHandler} className={`${classes.input} ${this.props.reduxOptions[5][0]}`} id='0q6'>
                            <Checkbox checked={this.props.reduxCheck[0][0]} id='0q6' size="small" inputProps={{ 'aria-label': 'checkbox with small size' }}/>{option1}
                        </div>
                        <div onClick={this.clickHandler} className={`mt-2 ${classes.input} ${this.props.reduxOptions[5][1]}`} id='1q6'>
                            <Checkbox checked={this.props.reduxCheck[0][1]} id='1q6' size="small" inputProps={{ 'aria-label': 'checkbox with small size' }}/>{option2}
                        </div>
                        <div onClick={this.clickHandler} className={`mt-2 ${classes.input} ${this.props.reduxOptions[5][2]}`} id='2q6'>
                            <Checkbox checked={this.props.reduxCheck[0][2]} id='2q6' size="small" inputProps={{ 'aria-label': 'checkbox with small size' }}/>{option3}
                        </div>
                    </div>
                    <div className="col-6">
                        <div onClick={this.clickHandler} className={`${classes.input} ${this.props.reduxOptions[5][3]}`} id='3q6'>
                            <Checkbox checked={this.props.reduxCheck[0][3]} id='3q6' size="small" inputProps={{ 'aria-label': 'checkbox with small size' }}/>{option4}
                        </div>
                        <div onClick={this.clickHandler} className={`mt-2 ${classes.input} ${this.props.reduxOptions[5][4]}`} id='4q6'>
                            <Checkbox checked={this.props.reduxCheck[0][4]} id='4q6' size="small" inputProps={{ 'aria-label': 'checkbox with small size' }}/>{option5}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      reduxData: state.authState.data,
      reduxAnswers: state.authState.answers,
      reduxOptions: state.authState.options,
      reduxCheck: state.authState.check
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveData: (data) => dispatch(authActions.saveData(data)),
        saveAnswer: (answers) => dispatch(authActions.saveAnswer(answers)),
        saveOptions: (options) => dispatch(authActions.saveOption(options)),
        saveCheck: (check) => dispatch(authActions.saveCheck(check))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Type1))