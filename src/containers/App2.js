import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App2.css';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchField, requestRobots } from '../actions';
// this for static data (hardCode)
// import { robots } from './robots';

// react can change state using : state, props, children (props.children)
// const state = {
//     robots: robots,
//     searchfield: ""
// }

// mapStateToProps is telling what piece state i need to listen to
// and send down as props
// jadi komponen ini tu mau listen ke siapa gituu (dari reducers)
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        // kalau reducer cuman satu maka
        // searchField: state.searchField
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

// mapDispatchToProps says hey tell me what props I should listen 
// to that actions that need to get dispatch
// dispath is what triggers the action
// so an action is just object that we've created
// in order to send the action we need something call dispatch
// so in get dispatch into the reducer
// dispatch is used to send an actions 
const mapDispathToProps = (dispatch) => { // mapDispatch jalan dulu sebelum mapState
    return {
        // onSearchChange is a prop that it's going to receive
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        // remember: action is just a function that return an object
        // then we dispatch that so the reducer aware of it
        // and this searchField when it gets dispatched is going to listen to

        onRequestRobots: () => requestRobots(dispatch)
        // juga bisa begini (sama saja gan)
        // onRequestRobots: () => dispatch(requestRobots())
        // tetapi di action diubah dari
        // requestRobots => (dispatch) menjadi requestRobots => () => (dispatch)
    }
}

class App2 extends Component{
    // constructor(){
        // super()
        // STATE >> props
        // state is - something that can change and affect our app
        // and they usually live in parent component
        // the component that is the parent that just kind of passes
        // "state" to different component
        // this.state = {
            // robots: []
            // ,searchfield: ""
        // }
        // console.log('constructor');
    // }

    componentDidMount(){
        this.props.onRequestRobots();
        // console.log(this.props.store.getState());
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(Response => {
        //     return Response.json();
        // })
        // .then(users => {
        //     this.setState({ robots: users })
        // })
        // console.log('componentDidMount');
    }

    // onSearchChange coming down as props
    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    //     const filteredRobots = this.state.robots.filter(robot => {
    //         return robot.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase());
    //     })
    //     console.log(filteredRobots);
    // }
    
    render(){
        // const { robots, searchfield } = this.state
        // const { robots } = this.state;
        const { searchField, onSearchChange, robots, isPending, error } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        console.log('render');

        // same as robots.length === 0 ; if no robot then !0 = 1 (execute the if statement)
        // if (!robots.length){
        if (isPending){               // dapat juga gunakan ternary syntax
            return <h1>Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
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

// connect() adalah higher order function = function that return another functions
// jadi (App2) adalah sebagai parameter fungsi dari connect
// mapStateToProps and mapDispathToProps is Redux standart syntax, jadi bisa diganti yg lain
export default connect(mapStateToProps, mapDispathToProps)(App2);
// connect give props to app2
// connect = connect this app component and says subcribe to any state changes
//          in the redux store