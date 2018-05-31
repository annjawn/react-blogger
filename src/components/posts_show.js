import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component{
  componentDidMount(){
    const { id } = this.props.match.params; //params will give access to all the wid card elements of the url, in this case :id
    this.props.fetchPost(id);
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading... </div>;
    }

    return(
      <div>
        <Link to="/">Home</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick}> Delete </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>

      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps){
  //ownprops makes sure that only the required post is passd to the component state
  //from the app state instead of the whole state object which could have many many
  //posts
  return { post: posts[ownProps.match.params.id] };
};

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ fetchPost: fetchPost,
//                               deletePost: deletePost
//                               }, dispatch);
// }

//export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
//The below code is a shortcut to mapDispatchToProps

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
