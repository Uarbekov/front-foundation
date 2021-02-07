import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SubjectService from "../../services/SubjectService";
import MediaService from "../../services/MediaService";
import CommonConst from "../../common/CommonConst";
import QuestionService from "../../services/QuestionService";

class CreateQuestionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sub: this.props.match.params.sub,
            id: this.props.match.params.id,
            type: this.props.match.params.type,
            question: '',
            selectedFile: null,
            explanation: null,

            listA: [
                {number: 1, answer: '', isCorrect: null, image: '', id: null},
                {number: 2, answer: '', isCorrect: null, image: '', id: null},
                {number: 3, answer: '', isCorrect: null, image: '', id: null},
                {number: 4, answer: '', isCorrect: null, image: '', id: null},
                {number: 5, answer: '', isCorrect: null, image: '', id: null},
                {number: 6, answer: '', isCorrect: null, image: '', id: null},
                {number: 7, answer: '', isCorrect: null, image: '', id: null},
                {number: 8, answer: '', isCorrect: null, image: '', id: null},

            ]

        }
        this.setAnswer = this.setAnswer.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return;
        } else {
            QuestionService.getById(this.state.id).then((res) => {
                    let question = res.data.data;
                    this.setState({
                        question: question.question,
                        selectedFile: question.questionImage
                    });
                }
            );
        }
    }

    saveQuestion = (e) => {
        e.preventDefault();
        if (this.state.id == -1) {
            let question = {
                question: this.state.question,
                questionImage: this.state.selectedFile,
                questionType: this.state.type,
                solutionImage: this.state.explanation,
                answers: this.state.listA,

            };
            console.log('question =>' + JSON.stringify(question));
            QuestionService.createQuestion(question).then(res => {
                this.props.history.push('/subject/'+ this.state.sub + '/question-type/'  + this.state.type + ' /question');
            });
        } else {
            let question = {id: this.state.id, name: this.state.name, image: this.state.image};
            console.log('question =>' + JSON.stringify(question));
            QuestionService.updateQuestion(question).then(res => {
                this.props.history.push('/subject/'+ this.state.sub + '/question-type/'  + this.state.type + ' /question');
            });
        }
    }

    addAnswer = () => {
        this.setState({
            listA: this.state.listA.concat([
                    {id: 5, answer: '', isCorrect: null, image: ''},
                    {id: 6, answer: '', isCorrect: null, image: ''},
                    {id: 7, answer: '', isCorrect: null, image: ''},
                    {id: 8, answer: '', isCorrect: null, image: ''},
                ]
            )
        });
    };

    fileSelectedHandler = event => {
        MediaService.downloadMedia(event.target.files[0]).then((response) => {
            this.setState({
                selectedFile: response.data
            })
        });
    }

    explanationFileSelectedHandler = event => {
        MediaService.downloadMedia(event.target.files[0]).then((response) => {
            this.setState({
                explanation: response.data
            })
        });
    }

    changeQuestion = (event) => {
        this.setState({question: event.target.value});
    }

    setAnswer(event, props) {
        props.answer = event.target.value;
        console.log(props.answer);
    }

    imageSelectedHandler(image, props) {
        MediaService.downloadMedia(image.target.files[0]).then((response) => {
            props.image = response.data;
            this.setState({})
        });
    }

    changeChangeBox(event, props) {
        props.isCorrect = event.target.checked;
    }

    cancel() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='container '>
                <div className='row'>
                    <div className='card col-md-12'>
                        <h3 className="text-center">Добавление нового вопроса</h3>
                        <div className='card-body'>

                            <form>
                                <div className='form-group'>
                                    <label>Вопрос:</label>
                                    <input placeholder='Вопрос' name='question' className='form-control'
                                           value={this.state.question} onChange={this.changeQuestion}/>
                                </div>
                                <div className='form-group'>
                                    <label>Рисунок вопроса:</label>
                                    <input type='file' onChange={this.fileSelectedHandler}/>
                                    <img className='img'
                                         src={CommonConst.getCommonMediaUrl() + this.state.selectedFile}/>
                                </div>
                                <div className='form-group'>
                                    <label>Рисунок объяснения:</label>
                                    <input type='file' onChange={this.explanationFileSelectedHandler}/>
                                    <img className='img'
                                         src={CommonConst.getCommonMediaUrl() + this.state.explanation}/>
                                </div>
                                <div>
                                    {this.state.listA.map(i => (
                                        this.getQuestionFormList(i)
                                    ))}

                                    <button className='btn btn-success' style={{marginBottom: "10px"}}
                                            onClick={this.addAnswer}>Добавить ответ
                                    </button>
                                </div>

                                <button className='btn btn-success' onClick={this.saveQuestion}>Сохранить</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)}
                                        style={{marginLeft: "10px"}}>Назад
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getQuestionFormList(props) {
        if (props.image == null || props.image === '') {
            return (
                this.getQuestionFieldList(props)
            );
        } else {
            return (
                <div>
                    {this.getQuestionFieldList(props)}
                    <img className='img'
                         src={CommonConst.getCommonMediaUrl() + props.image}/>
                </div>
            );
        }
    }

    getQuestionFieldList(props) {
        return (
            <div className='d-flex'>
                <input placeholder={'Ответ ' + props.number} className='form-control'
                       onChange={(e) => this.setAnswer(e, props)}/>
                <input type='checkbox'
                       className='checkbox' onChange={(e) => this.changeChangeBox(e, props)}/>
                <label style={{marginLeft: "10px"}}>правильный ответ</label>
                <input type='file' style={{marginLeft: "10px"}}
                       onChange={(e) => this.imageSelectedHandler(e, props)}/>
            </div>
        );
    }
}

export default withRouter(CreateQuestionComponent);