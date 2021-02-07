import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SubjectService from "../../services/SubjectService";
import MediaService from "../../services/MediaService";
import CommonConst from "../../common/CommonConst";

class CreateSubjectComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: '',
            image: '',
            questionAmount: '25',
            selectedFile: null
        }
        this.changeSubjectNameHandler = this.changeSubjectNameHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.saveSubject = this.saveSubject.bind(this);
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return;
        } else {
            SubjectService.getSubjectById(this.state.id).then((res) => {
                    let subject = res.data.data;
                    this.setState({
                        name: subject.name,
                        image: subject.image
                    });
                }
            );
        }
    }

    saveSubject = (e) => {
        e.preventDefault();
        if (this.state.id == -1) {
            let subject = {name: this.state.name, image: this.state.image, questionAmount: this.state.questionAmount};
            console.log('subject =>' + JSON.stringify(subject));
            SubjectService.createSubject(subject).then(res => {
                this.props.history.push('/');
            });
        } else {
            let subject = {id: this.state.id, name: this.state.name, image: this.state.image, questionAmount: this.state.questionAmount};
            console.log('subject =>' + JSON.stringify(subject));
            SubjectService.updateSubject(subject).then(res => {
                this.props.history.push('/');
            });
        }
    }

    fileSelectedHandler = event => {
        // var file;
        MediaService.downloadMedia(event.target.files[0]).then((response) => {
            this.setState({
                selectedFile: response.data
            })
            console.log(response.data)
        });

        console.log(this.state.selectedFile);
        // console.log(event.target.files[0]);
    }
    changeSubjectNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeImageHandler = (event) => {
        this.setState({image: event.target.value});
    }

    changeQuestionAmount = (event) => {
        this.setState({questionAmount: event.target.value});
    }

    cancel() {
        this.props.history.push('/');
    }

    render() {
        if (this.state.selectedFile == null) {
            return (
                this.getFieldWithoutImg()
            );
        }
        return (
            this.getField()
        );
    }

    getField() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3  offset-md-3'>
                            <h3 className="text-center">Добавление нового предмета</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Название предмета:</label>
                                        <input placeholder='Название предмета' name='subjectName'
                                               className='form-control'
                                               value={this.state.name} onChange={this.changeSubjectNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Рисунок предмета:</label>
                                        <input placeholder='Рисунок предмета' name='image' className='form-control'
                                               value={this.state.image} onChange={this.changeImageHandler}/>
                                    </div>

                                    <div className='form-group'>
                                        <label>Количество вопросов в тесте</label>
                                        <input type='number' name='questionAmount' className='form-control'
                                               value={this.state.questionAmount} onChange={this.changeQuestionAmount}/>
                                    </div>


                                    <div className='form-group'>
                                        <label>Рисунок предмета real:</label>
                                        <input type='file' onChange={this.fileSelectedHandler}/>
                                        <img className='card-img'
                                             src={CommonConst.getCommonMediaUrl() + this.state.selectedFile}/>
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

    getFieldWithoutImg() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3  offset-md-3'>
                            <h3 className="text-center">Добавление нового предмета</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Название предмета:</label>
                                        <input placeholder='Название предмета' name='subjectName'
                                               className='form-control'
                                               value={this.state.name} onChange={this.changeSubjectNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Рисунок предмета:</label>
                                        <input placeholder='Рисунок предмета' name='image' className='form-control'
                                               value={this.state.image} onChange={this.changeImageHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Количество вопросов в тесте</label>
                                        <input type='number' name='questionAmount' className='form-control'
                                               value={this.state.questionAmount} onChange={this.changeQuestionAmount}/>
                                    </div>

                                    <div className='form-group'>
                                        <label>Рисунок предмета real:</label>
                                        <input type='file' onChange={this.fileSelectedHandler}/>
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

export default withRouter(CreateSubjectComponent);