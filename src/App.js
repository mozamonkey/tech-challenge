import React, { Component } from 'react';

// IMPORT REACT MIDDLEWARE HERE
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// PUT ROUTES HERE
import AppRoutes from './routes/AppRoutes';

// IMPORT REDUX STORE
import store from './stores/RootStore';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="body-content w3-main" id="main">
                        <div className="w3-container w3-display-container">
                            <AppRoutes />
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
