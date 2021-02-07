import React from "react";
import HeaderComponent from "../components/HeaderComponent";

function WithHeader(component) {
    return (
        <div>
            <HeaderComponent/>
            <div className="container-fluid common">
                {component}
            </div>
        </div>

    );
}

export default WithHeader;