## User Form Application

* This is a web application for a user registration form created with the following technologies: [React.js](https://reactjs.org/docs/getting-started.html), [styled-components](https://styled-components.com/docs/basics), and [Axios](https://axios-http.com/docs/intro).

## Features

* An HTTP GET request is sent to an external API to receive a JSON object of occupation and state selections.

* Upon submission of the form, a HTTP POST request is made to an external URL. If any of the fields weren't filled out, the application will render an error message. If all of the inputs were properly supplied, a success message will appear.

## Code Snippets
This user registration form provides 5 inputs for the user. Two of them, occupation and state, should be selected from a JSON object provided from an external API.
The following code deals with receiving that object. Upon successful mounting of the Form component,an axios GET method will be sent to a url to receive the JSON response, and then it is stored into the local state.

```
componentDidMount() {
        axios({
            method: 'get',
            url: 'https://frontend-take-home.fetchrewards.com/form',
            responseType: 'json',
            validateStatus: () => true
          })
            .then((response) => {
                this.setState((state) => {
                    return {selections: response.data};
                });
            });
    }
```
