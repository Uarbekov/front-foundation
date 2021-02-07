import React, {Component} from 'react';
import SubjectService from "../../services/SubjectService";
import {withRouter} from "react-router-dom";
import QuestionTypeService from "../../services/QuestionTypeService";

class CreateQuestionTypeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            sub: this.props.match.params.sub,
            questionAmountTest: '25',
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveSubject = this.saveSubject.bind(this);
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return;
        } else {
            QuestionTypeService.getQuestionTypeById(this.state.id).then((res) => {
                    let subject = res.data.data;
                    this.setState({
                        name: subject.name
                    });
                }
            );
        }
    }

    saveSubject = (e) => {
        e.preventDefault();
        if (this.state.id == -1) {
            let questionType = {name: this.state.name, subjectId: this.state.sub, questionAmountTest: this.state.questionAmountTest};
            QuestionTypeService.createQuestionType(questionType).then(res => {
                this.props.history.push('/subject/' + this.state.sub + '/question-type');
            });
        } else {
            let questionType = {id: this.state.id, name: this.state.name, subjectId: this.state.sub, questionAmountTest: this.state.questionAmountTest};
            QuestionTypeService.updateQuestionType(questionType).then(res => {
                this.props.history.push('/subject/' + this.state.sub + '/question-type');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }


    changeQuestionAmount = (event) => {
        this.setState({questionAmountTest: event.target.value});
    }

    cancel() {
        this.props.history.push('/subject/' + this.state.sub + '/question-type');
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3  offset-md-3'>
                            <h3 className="text-center">Добавление нового типа вопроса</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Название типа вопроса:</label>
                                        <input placeholder='Название предмета' name='subjectName'
                                               className='form-control'
                                               value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>

                                    <div className='form-group'>
                                        <label>Количество вопросов в тесте</label>
                                        <input type='number' name='questionAmount' className='form-control'
                                               value={this.state.questionAmountTest} onChange={this.changeQuestionAmount}/>
                                    </div>


                                    <button className='btn btn-success' onClick={this.saveSubject}>Сохранить</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Назад
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateQuestionTypeComponent);