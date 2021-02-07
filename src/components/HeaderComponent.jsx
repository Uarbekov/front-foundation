import React, {Component} from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                        <div><a href="/" className="navbar-brand">Предметы</a></div>
                        <div><a href="/" className="navbar-brand">Клиенты</a></div>
                        <div><a href="/" className="navbar-brand">Родители</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;