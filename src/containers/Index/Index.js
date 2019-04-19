import React, { Component } from 'react';
import './Index.css';
import axios from 'axios';
import DataList from '../../components/DataList/DataList';
import Navbar from '../../components/Navbar/Navbar';

class Index extends Component {
    constructor(props) {
        super(props);
        this.items = [
            'Sachin',
            'Rishabh',
            'Sudeep',
            'Ram',
            'Mohan'
        ];
        this.state = {
            contacts: [],
            per: 10,
            page: 1,
            totalPages: null,
            scrolling: false,

            text: '',
            suggestions: [],

            loadedPost: null,
         }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
       const { per, page, contacts } = this.state;
       axios.get(`https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`)
      .then(response => {
        // console.log(response);
        this.setState({
            contacts: [...contacts, ...response.data.contacts],
            totalPages: response.data.total_pages,
        })
      })
    }

    componentWillMount() {
       this.handleSubmit();
    }

    handleSubmit = (e) => {
            axios.get(`https://student-example-api.herokuapp.com/v1/contacts.json${this.state.text}`)
            .then( response => {
                // console.log("jgj", response);
                this.setState({loadedPost: response.data.contacts});
            });
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.contacts.sort().filter(v => regex.test(v.name, v.id)); 
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected = (value) => {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }));
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map(item => <li onClick={() => this.suggestionSelected(item.name)} key={item.id}>{item.name}</li>)}
            </ul>
        )
    }




    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling: true
        }), this.getData)
    }

  render() {
    //   console.log("Text:", this.state.text);
    return (
      <React.Fragment>
        <div className="Index-Navbar">
            <Navbar 
                text={this.state.text}
                submit={this.handleSubmit}
                changed={this.onTextChanged}
                renderSuggestions={this.renderSuggestions} />
        </div>
        <div>
            <DataList data={this.state.contacts} />
        </div>
        <div className="Index-Bottom">
            <p className="Index-Loadmore" onClick={this.loadMore}>Load more...</p>
        </div>
      </React.Fragment>
    )
  }
}

export default Index;
