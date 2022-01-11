# User Form Application

This is a web application for a user registration form created with the following technologies: [React.js](https://reactjs.org/docs/getting-started.html), [styled-components](https://styled-components.com/docs/basics), and [Axios](https://axios-http.com/docs/intro).

![alt text](https://github.com/briannguyen4/user_form/blob/main/public/image.png)

## Features

* A user form allowing users to submit their information with a HTTP POST request made to an external URL. If any of the fields weren't filled out, the application will render an error message. If all of the inputs were properly supplied, a success message will appear.

* An HTTP GET request is sent to an external API to receive a JSON object of occupation and state selections.


## Code Snippets

This user registration form provides 5 inputs for the user. Two of them, occupation and state, should be selected from a JSON body provided from an external API. The following lifecycle method will deal with receiving that information. After the Form component successfully mounts,an axios GET method is sent to a url to receive the JSON response, and then it is stored into local state.

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
After state receives the JSON body, it can be used to render dropdown options on the page. In the following code, a map function is called on the JSON body slice of state, converting them into option tags. Because componentDidMount is only called after the page renders, it is possible to get an error on this mapping. To prevent this, an initial value of an empty array is set for the target slice of state to ensure the map function can still run. After the componentDidMount function runs and state is updated, there is a re-render which properly displays the new selections. 

The handleInput function dynamically updates state according to the content inside the user's input. When the form is submitted, all of the input information inside of state is sent as an object as a argument alongside the axios POST request.

```
<Dropdown value={this.state.occupation} onChange={this.handleInput('occupation')}>
        <option hidden>Occupation</option>
        {this.state.selections.occupations.map((value) => (
        <option key={shortid.generate()}>{value}</option>))}
</Dropdown>
```

State manipulation and conditional rendering is applied to ensure that status messages are properly displayed. When the form is submitted, if any of the inputs are empty, this.state.failed is set to true. In the following code snippet, the renderError message will only run if that is the case. The same is true for the success message, it only appears if the state success property is true.

```
{ this.state.failed && this.renderErrors() }
{ this.state.success && this.renderSuccess() }
```

