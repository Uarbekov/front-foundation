import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import QuestionService from "../../services/QuestionService";

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: this.props.match.params.sub,
            typeId: this.props.match.params.type,
            question: []
        }
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion() {
        // this.props.history.push("/question_type/" + this.state.typeId + "/question/-1");
        this.props.history.push("/subject/" + this.state.sub + "/question-type/" + this.state.typeId + "/question/-1");
    }

    editQuestion(id) {
        // this.props.history.push('/subject/' + this.state.subjectId + '/question-type/' + id);
        this.props.history.push("/subject/" + this.state.sub + "/question-type/" + this.state.typeId + "/question/" + id);
    }

    componentDidMount() {
        QuestionService.getByType(this.state.typeId).then(res => {
            this.setState({question: res.data.data})
        })
    }

    render() {
        return(
          <div>
              <h2 className="text-center">Вопросы</h2>

              <div className="row">
                  <button className="btn btn-primary" onClick={this.addQuestion}> Добавить</button>
              </div>
              <div className="row">
                  <table className="table table-striped table-bordered">
                      <thead>
                      <tr>
                          <th className="table-dark" style={{width: "2%"}}> Номер </th>
                          <th> Вопрос </th>
                          <th style={{width: "10%"}}> Тип вопроса </th>
                          <th> Ответ </th>
                          <th> Объяснение </th>
                          <th style={{width: "2%"}}> Активный </th>
                          <th style={{width: "350px"}}> Действие </th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          this.state.question.map(
                              question =>
                                  <tr key={question.id}>
                                      <td className="table-dark"> {question.id}</td>
                                      <td> {question.question}</td>
                                      <td> {question.questionType}</td>
                                      <td> {question.answer1}</td>
                                      <td> {question.solutionImage}</td>
                                      <td> {question.isDeleted}</td>
                                      <td>
                                          <button onClick={()=> this.editQuestion(question.id)} className='btn btn-info'> Изменить </button>
                                          <button style={{marginLeft: "10px"}} onClick={()=> this.deleteQuestionType(question.id)} className='btn btn-danger'> Удалить </button>
                                          <button style={{marginLeft: "10px"}} onClick={()=> this.showQuestion(question.id)} className='btn btn-primary'> Подробнее </button>
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

export default withRouter(QuestionComponent);