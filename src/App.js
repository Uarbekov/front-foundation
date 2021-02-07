import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SubjectComponent from "./components/subject/SubjectComponent";
import CreateSubjectComponent from "./components/subject/CreateSubjectComponent";
import QuestionTypeComponent from "./components/questiontype/QuestionTypeComponent";
import CreateQuestionTypeComponent from "./components/questiontype/CreateQuestionTypeComponent";
import QuestionComponent from "./components/question/QuestionComponent";
import CreateQuestionComponent from "./components/question/CreateQuestionComponent";
import LoginPage from "./common/LoginPage";
import WithHeader from "./common/WithHeader";

function App() {

    return (
        <div>
            <Router>
                <div>
                    <Switch>

                    <Route path="/login" exact component={() => <LoginPage/>}/>
                    {/*<Route path="/" exact component={() => <SubjectComponent/>}/>*/}
                    <Route path="/" exact component={() => WithHeader(<SubjectComponent/>)}/>
                    <Route path="/subject-add/:id" exact component={() => WithHeader(<CreateSubjectComponent/>)}/>
                    <Route path="/subject/:sub/question-type" exact
                           component={() => WithHeader(<QuestionTypeComponent/>)}/>
                    <Route path="/subject/:sub/question-type/:id" exact
                           component={() => WithHeader(<CreateQuestionTypeComponent/>)}/>
                    <Route path="/subject/:sub/question-type/:type/question" exact
                           component={() => WithHeader(<QuestionComponent/>)}/>
                    {/*<Route path="/question_type/:type/question/:id" exact component={() => <CreateQuestionComponent/>}/>*/}
                    <Route path="/subject/:sub/question-type/:type/question/:id" exact
                           component={() => WithHeader(<CreateQuestionComponent/>)}/>
                    </Switch>
                </div>
                {/*<FooterComponent/>*/}
            </Router>
        </div>
    );
}

export default App;
