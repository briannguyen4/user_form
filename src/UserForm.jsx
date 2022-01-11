import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import shortid from 'shortid';


const Container = styled.div`
    background-color: lightgreen;
    height: 99vh;
    width: 99vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    margin-top: 10px;
    margin-bottom: 60px;
    font-size: 44px;
    text-align: center;
`;

const FormContainer = styled.div`
    width: 50vw;
    border: 1px solid black;
    background-color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormTitle = styled.h2`
    margin: 16px 0px;
`;

const Input = styled.input`
    width: 60%;
    height: 32px;
    margin: 10px 0px;
    border: 1px solid lightgrey;
`;

const Dropdown = styled.select`
    width: 60%;
    height: 32px;
    margin: 10px 0px;
    
`

const Message = styled.div`
    color: ${props => props.color};
`

const Button = styled.button`
    /* height: 30px; */
    width: 25%;
    background-color: seagreen;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 16px 0px;

`;

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                name: "",
                email: "",
                password: "",
                occupation: "",
                state: "",
                selections: {
                    occupations: [],
                    states: []
                },
                failed: false,
                success: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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

    handleInput(type) {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.name !== "" && this.state.email !== "" && this.state.password !== "" && this.state.occupation !== "" && this.state.state !== "") {
            axios.post("https://frontend-take-home.fetchrewards.com/form", {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                occupation: this.state.occupation,
                state: this.state.state,
            })
            .then(res=>{
                console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            });

            this.setState({
                failed: false,
                success: true,
                name: "",
                email: "",
                password: "",
                occupation: "",
                state: ""
            })
        } else {
            this.setState({
                success: false,
                failed: true
            })
        }
    }

    renderErrors() {
        return (
            <Message color="red">
                Fill out the entire form and try again.
            </Message> 
        )
    }

    renderSuccess() {
        return (
            <Message color="green">
                Success!
            </Message> 
        )
    }

    render() {
        console.log(this.state);
        return (
            <Container>
                <Title>User Creation Form</Title>
                <FormContainer> 
                <Form onSubmit={this.handleSubmit}>
                        <FormTitle>Create a New Account</FormTitle>
                        <Input value={this.state.name} onChange={this.handleInput('name')}>
                        </Input >
                        <Input value={this.state.email} onChange={this.handleInput('email')}>
                        </Input>
                        <Input value={this.state.password} onChange={this.handleInput('password')}>
                        </Input>
                        <Dropdown value={this.state.occupation} onChange={this.handleInput('occupation')}>
                            <option hidden>Occupation</option>
                            {this.state.selections.occupations.map((value) => (
                                <option key={shortid.generate()}>
                                    {value}
                                </option>
                            ))}
                        </Dropdown>
                        <Dropdown value={this.state.state} onChange={this.handleInput('state')}>
                            <option hidden>State</option>
                            {this.state.selections.states.map((value) => (
                                <option key={shortid.generate()}>
                                    {value.name}
                                </option>
                            ))}
                        </Dropdown>
                        { this.state.failed && this.renderErrors() }
                        { this.state.success && this.renderSuccess() }
                        <Button>Create Account</Button>
                </Form>
                </FormContainer> 

            </Container>
            
        )
    }
}

export default UserForm;