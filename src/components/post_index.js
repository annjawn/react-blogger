import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';  //to run map function on an object
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

class PostIndex extends Component{
  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, (post)=>{
      return (

        <List.Item key={post.id}>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Header as='a'>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </List.Header>
          <List.Description as='a'>
            Categories: {post.categories}
          </List.Description>
        </List.Item>

      );
    });
  }

  render(){
    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        <h3>React Blogger</h3>
        <List divided relaxed>
          {this.renderPosts()}
        </List>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            New Post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    posts: state.posts
  };
}

//{ fetchPosts } is equivalent to calling mapDispatchToProps action creator
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
