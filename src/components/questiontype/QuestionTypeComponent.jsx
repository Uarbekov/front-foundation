import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';
import QuestionTypeService from "../../services/QuestionTypeService";

class QuestionTypeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subjectId: this.props.match.params.sub,
            result: []
        }
        this.addQuestionType = this.addQuestionType.bind(this);
        this.editQuestionType = this.editQuestionType.bind(this);
        this.deleteQuestionType = this.deleteQuestionType.bind(this);
        this.showQuestionType = this.showQuestionType.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
    }

    editQuestionType(id) {
        this.props.history.push('/subject/' + this.state.subjectId + '/question-type/' + id);
    }

    showQuestionType(id) {
        this.props.history.push('/subject/' + this.state.subjectId + '/question-type/' + id);
    }

    showQuestion(id) {
        this.props.history.push('/subject/' + this.state.subjectId + '/question-type/' + id + '/question');
    }

    deleteQuestionType(id) {
        QuestionTypeService.deleteQuestionTypeById(id).then(res => {
            this.setState({result: this.state.result.filter(result => result.id !== id)});
        });
    }

    componentDidMount() {
        QuestionTypeService.getQuestionTypeBySub(this.state.subjectId).then((res) => {
            this.setState({result: res.data.data})
        })
    }

    addQuestionType() {
        this.props.history.push('/subject/' + this.state.subjectId + '/question-type/-1');
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Типы вопросов</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addQuestionType}> Добавить</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Название</th>
                            <th> Количество вопросов</th>
                            <th> Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.result.map(
                                result =>
                                    <tr key={result.id}>
                                        <td> {result.name} </td>
                                        <td> {result.image} </td>
                                        <td>
                                            <button onClick={() => this.editQuestionType(result.id)}
                                                    className='btn btn-info'> Изменить
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteQuestionType(result.id)}
                                                    className='btn btn-danger'> Удалить
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.showQuestionType(result.id)}
                                                    className='btn btn-primary'> Подробнее
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.showQuestion(result.id)}
                                                    className='btn btn-primary'> Вопросы
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(QuestionTypeComponent);