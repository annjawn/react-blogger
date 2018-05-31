import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

//form states = pristine, touched, invalid. touched means user has focused
//and then focused away.

class PostNew extends Component{
  renderField(field){
    const { meta: { touched, error } } = field; //this is destructuring field.meta.touched and field.meta.error
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    if (field.compType == 'textarea') {
      return(
        <div className={className}>
          <label>{field.label}</label>
          <textarea
            className="form-control"
            {...field.input}
          />
          <div className='text-help'>
            {touched ? error : ''}
          </div>
        </div>
      )
    }

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type = {field.compType}
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) =>{

    //post to API using action creator
    //the create post takes a block as a callback function
    //and uses it to navigate back to home page upon successful
    //post to the API
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" label="Title" compType="text" component={this.renderField} />
        <Field name="categories" label="Categories" compType="text" component={this.renderField} />
        <Field name="content" label="Content" compType="textarea" component={this.renderField} />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>

      </form>
    );
  }
}

//this is the form validation, uses internal variable "values"
function validate(values){
  const errors = {};
  if(!values.title){
    errors.title = 'Title is required'
  } else if (values.title.length < 5){
    errors.title = 'Title must be atleast 5 characters long'
  }

  if (!values.categories) {
    errors.categories = 'Enter atleast one catergory'
  }

  if (!values.content) {
    errors.content = 'Your post is empty'
  }
  //validate the inputs from 'values'

  //if errors is empty, the form is fine to submit
  return errors;
}

export default reduxForm({
  validate: validate,
  form : 'postNewForm'
})(
  connect(null, { createPost })(PostNew)
);
