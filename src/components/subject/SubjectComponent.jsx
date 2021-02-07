import React, {Component} from 'react';
import SubjectService from "../../services/SubjectService";

import {withRouter} from 'react-router-dom';
import QuestionTypeService from "../../services/QuestionTypeService";

class SubjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: []
        }
        this.addSubject = this.addSubject.bind(this);
        this.editSubject = this.editSubject.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
        this.showQuestionType = this.showQuestionType.bind(this);
    }
    editSubject(id) {
        this.props.history.push('/subject-add/'+id);
    }

    deleteSubject(id) {
        SubjectService.deleteQuestionTypeById(id).then(res => {
            this.setState({result: this.state.result.filter(result => result.id !==id)});
        });
    }

    showQuestionType(id) {
        this.props.history.push("/subject/" + id + "/question-type");
    }

    componentDidMount() {
        SubjectService.getSubjects().
        then((res) => {
            this.setState({result: res.data.data})
        })
            .catch((error) => {
                switch (error.response.status) {
                    case 403:
                        this.props.history.push('/login');
                }
            })
    }
    addSubject() {
        this.props.history.push('/subject-add/-1');
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center">Предметы</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addSubject}> Добавить</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Предметы</th>
                            <th> изображение</th>
                            <th> действие</th>
                            {/*<th> Previous result</th>*/}
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
                                            <button onClick={()=> this.editSubject(result.id)} className='btn btn-info'> Изменить </button>
                                            <button style={{marginLeft: "10px"}} onClick={()=> this.deleteSubject(result.id)} className='btn btn-danger'> Удалить </button>
                                            <button style={{marginLeft: "10px"}} onClick={()=> this.showQuestionType(result.id)} className='btn btn-primary'> Типы вопросов </button>
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

export default withRouter(SubjectComponent);