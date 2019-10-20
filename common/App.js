import React, { Component } from 'react';

class App extends Component {
    state = { input: '', responses: [] };

    handleInputChange = event => {
        this.setState({ input: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        const input = this.state.input ? `/${this.state.input}` : '';

        fetch(`api/timestamp${input}`).then(response =>
            response.json().then(data =>
                this.setState({
                    input: '',
                    responses: [JSON.stringify(data), ...this.state.responses],
                })
            )
        );
    };

    handleClear = () => {
        this.setState({ input: '', responses: [] });
    };

    render() {
        return (
            <div className="app">
                <main>
                    <h1 className="masthead">Timestamp Microservice</h1>

                    <div className="container">
                        <div className="card">
                            <h2 className="masthead">User Stories</h2>
                            <ol>
                                <li>
                                    The API endpoint is{' '}
                                    <code>
                                        GET /api/timestamp/:date_string?{' '}
                                    </code>
                                </li>
                                <li>
                                    A date string is valid if it can be
                                    successfully parsed by{' '}
                                    <code>new Date(date_string)</code>.
                                    <br />
                                    Note that the unix timestamp needs to be an{' '}
                                    <strong>integer</strong> (not a string)
                                    specifying <strong>milliseconds</strong>.
                                    <br />
                                    In our test we will use date strings
                                    compliant with ISO-8601 (e.g.{' '}
                                    <code>"2016-11-20"</code>) because this will
                                    ensure an UTC timestamp.
                                </li>
                                <li>
                                    If the date string is <strong>empty</strong>{' '}
                                    it should be equivalent to trigger{' '}
                                    <code>new Date()</code>, i.e. the service
                                    uses the current timestamp.
                                </li>
                                <li>
                                    If the date string is <strong>valid</strong>{' '}
                                    the api returns a JSON having the structure
                                    <br />
                                    <code>{`{"unix": <date.getTime()>, "utc" : <date.toUTCString()>}`}</code>
                                    <br />
                                    e.g.
                                    <code>{`{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`}</code>
                                </li>
                                <li>
                                    If the date string is{' '}
                                    <strong>invalid</strong> the api returns a
                                    JSON having the structure <br />
                                    <code>{`{"error" : "Invalid Date"}`}</code>.
                                    It is what you get from the date
                                    manipulation functions used above.
                                </li>
                            </ol>

                            <h2 className="masthead">Example Usage</h2>
                            <code className="response">
                                GET /api/timestamp/2015-12-25
                            </code>
                            <code className="response">
                                GET /api/timestamp/1450137600
                            </code>
                            <h2 className="masthead">Example Output</h2>
                            <code className="response">{`{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`}</code>
                        </div>

                        <div className="card">
                            <h2 className="masthead">
                                Parse Date String or Timestamp
                            </h2>

                            <form onSubmit={this.handleFormSubmit}>
                                <code className="response">
                                    <label htmlFor="date_string">
                                        <span>GET /api/timestamp/</span>
                                        <input
                                            type="text"
                                            placeholder="now"
                                            value={this.state.input}
                                            onChange={this.handleInputChange}
                                        />
                                    </label>
                                </code>

                                <div className="buttons">
                                    <div>
                                        <button>Submit</button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={this.handleClear}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {this.state.responses.length > 0 ? (
                            <div className="card">
                                <h2 className="masthead">Output</h2>
                                <div className="responses">
                                    {this.state.responses.map((response, i) => (
                                        <code className="response" key={i}>
                                            {response}
                                        </code>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </main>
                <footer>
                    A{' '}
                    <a
                        href="https://freecodecamp.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        freeCodeCamp
                    </a>{' '}
                    APIs and Microservices Project
                </footer>
            </div>
        );
    }
}
export default App;
