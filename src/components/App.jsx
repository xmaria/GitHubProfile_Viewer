import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import RepoList from './github/RepoList.jsx';
import Search from './github/Search.jsx';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'rvkumar92',
            userData:[],
            userRepos:[],
            perPage:5
        }
    }
    
//Get User Data from Github   
getUserData(){
    $.ajax({
        url:'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
        dataType:'json' ,
        cache: false,
        success:function(data){
            this.setState({userData:data})
            console.log(data);
             }.bind(this),
        error:function(xhr,status,err){
            this.setState({username:null})
            console.log(err);
        }.bind(this)
});
}

//Get User Repositories

getUserRepos(){
    $.ajax({
        url:'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
        dataType:'json' ,
        cache: false,
        success:function(data){
            this.setState({userRepos:data})
             }.bind(this),
        error:function(xhr,status,err){
            this.setState({username:null})
            console.log(err);
        }.bind(this)
});
}

componentDidMount(){
    this.getUserData();
    this.getUserRepos();
}

handleOnFormSubmit(username){
    this.setState({username: username}, function(){
        this.getUserData();
    this.getUserRepos(); 
    })
}


    render(){
        return(
            <div>
            <Search onFormSubmit={this.handleOnFormSubmit.bind(this)}/>
            <Profile {...this.state}/>
            </div>
            
            )
    }
}

App.propTypes= {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};

App.defaultProps={
   clientSecret:'48cf1b97ff35a8416413da46b5bfbe65a5bef353',
   clientId:'e236d621b6808e705d9f'
};

export default App