import React, { Component } from 'react';
import './App2.css';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';

// this for static data (hardCode)
import { robots } from './robots';

// react can change state using : state, props, children
const state = {
    robots: robots,
    searchfield: ""
}

class App2 extends Component{
    constructor(){
        super()
        // STATE >> props
        // state is - something that can change and affect our app
        // and they usually live in parent component
        // the component that is the parent that just kind of passes
        // "state" to different component
        this.state = {
            robots: [],
            searchfield: ""
        }
        console.log('constructor');
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => {
            return Response.json();
        })
        .then(users => {
            this.setState({ robots: users })
        })
        console.log('componentDidMount');
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        // const filteredRobots = this.state.robots.filter(robot => {
        //     return robot.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase());
        // })
        // console.log(filteredRobots);
    }
    
    render(){
        const { robots, searchfield } = this.state
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })
        console.log('render');

        // same as robots.length === 0 ; if no robot then !0 = 1 (execute the if statement)
        if (!robots.length){
            return <h1>Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} className='pointer'/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    }  
}

export default App2;