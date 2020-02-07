import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from 'formik';

class ProductEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                error: null,
                isLoading: true,
                productDetail:{}
        }
    }

    componentDidMount() {
        // load data 
        if(this.props.match.params.id > 0){
            this.loadData();
        }

        // init product 
        if(Number(this.props.match.params.id)===0){
            this.setState({
                isLoading: false,
                productDetail: {
                    "id": null,
                    "productName": "",
                    "productCode": "",
                    "releaseDate": "",
                    "description": "",
                    "price": 0,
                    "starRating": 0,
                    "imageUrl": "",
                    "tags": []
                }
            });
        }
    }
    
    loadData(){
        fetch("http://localhost:3004/products/" + this.props.match.params.id)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoading: false,
                        productDetail: data
                    });
                    console.log(this.state);
                },
                (error) => {
                    this.setState({
                    isLoading: false,
                    error,
                    });
                }
            )
    }

    render(){
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (this.state.isLoading) {
            return (
                <div className="container">
                    <h2>Loading ... </h2>
                </div>
            )
        } else {
            return (
                <div>
        <div className="row mb-3 mt-3">
            <h1 className="col-md-12">{this.props.match.params.id > 0 ? 'Edit product' : 'Create product'}</h1>
        </div>
        <Formik initialValues={{ 
                    productName: this.state.productDetail.productName,
                    imageUrl: this.state.productDetail.imageUrl,
                    productCode: this.state.productDetail.productCode,
                    releaseDate: this.state.productDetail.releaseDate,
                    price: this.state.productDetail.price,
                    starRating: this.state.productDetail.starRating,
                    description: this.state.productDetail.description,
                    tags: this.state.productDetail.tags
                }}
                validate={values => {
                    let errors = {};
                    if (!values.productName) {
                      errors.productName = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('sending', values);
                    if(this.props.match.params.id > 0){
                        fetch("http://localhost:3004/products/" + this.props.match.params.id, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                                // "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: JSON.stringify(values)
                        }).then(
                            (data) => {
                                console.log(data);
                                this.props.history.push(`/`)
                            },
                            (error) => {
                                this.setState({
                                isLoading: false,
                                error,
                                });
                            }
                        )
                    }else{
                        fetch("http://localhost:3004/products/", {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                // "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: JSON.stringify(values)
                        }).then(
                            (data) => {
                                console.log(data);
                                this.props.history.push(`/`)
                            },
                            (error) => {
                                this.setState({
                                isLoading: false,
                                error,
                                });
                            }
                        )
                    }
                }}
          >
          {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
          }) => (
            
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group" >
                        <label className="control-label">Product Image</label>
                        <input
                            name='imageUrl'
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            placeholder="Image url"
                            onBlur={handleBlur}
                            value={values.imageUrl}/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Product Name</label>
                        <input
                            name='productName'
                            className="form-control"
                            type="text"
                            onChange={handleChange}     
                            placeholder="Name (required)"
                            onBlur={handleBlur}
                            value={values.productName}/>
                        {
                            errors.productName && touched.productName && errors.productName && 
                            <div className="alert alert-danger mt-3" role="alert">
                                {errors.productName && touched.productName && errors.productName}
                            </div>
                        }
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <label className="control-label">Product Code</label>
                            <input className="form-control"
                                    type="text"
                                    name="productCode"
                                    onChange={handleChange}     
                                    onBlur={handleBlur}
                                    value={values.productCode} 
                                    placeholder="Code (required)" />
                        </div>

                        <div className="col-md-6">
                            <label className="control-label">Available</label>
                            <input className="form-control" 
                                    type="date"
                                    name="releaseDate"
                                    onChange={handleChange}     
                                    onBlur={handleBlur}
                                    value={values.releaseDate} 
                                    placeholder="Available" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <label className="control-label">Price</label>
                            <input className="form-control"
                                    type="number"
                                    name="price"
                                    onChange={handleChange}     
                                    onBlur={handleBlur}
                                    value={values.price}   
                                    placeholder="Price" />
                        </div>

                        <div className="col-md-6">
                            <label className="control-label">Rating (1-5)</label>
                            <input className="form-control"
                                    type="number"
                                    min="1" 
                                    max="5"
                                    step="1"
                                    name="starRating"
                                    onChange={handleChange}     
                                    onBlur={handleBlur}
                                    value={values.starRating}   
                                    placeholder="Rating" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Description</label>
                        <textarea className="form-control" 
                                placeholder="Description"
                                name="description"
                                onChange={handleChange}     
                                onBlur={handleBlur}
                                value={values.description} 
                                rows="3"></textarea>
                    </div>
                    <div>
                        <label className="control-label">Tags</label>
                        <FieldArray 
                            name="tags"
                            render={arrayHelpers => (
                                <div className="form-group row">
                                    {
                                       values.tags && values.tags.map((tag, index)=>
                                            <div className="col-md-3 mb-3" key={index}>
                                            <Field 
                                                name={`tags.${index}`}
                                                render={({ field }) => (
                                                    <div className="input-group">
                                                        <input  className="form-control" {...field}  />
                                                        <div className="input-group-append">
                                                            <button 
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                                type="button">-</button>
                                                        </div>
                                                    </div>
                                                )}/>
                                            </div>
                                        )   
                                    }

                                    <div className="col-md-12 text-right">
                                            <button className="btn btn-primary btn-sm"
                                                    onClick={() => arrayHelpers.push('')}
                                                    type="button">Add Tag
                                            </button>
                                    </div>
                                </div>
                            )} /> 
                  
                    </div>
      
                    <hr />
                    <div className="pt-4 text-right">
                        <Link className="btn btn-danger mr-3" to={`/`}>Cancel</Link>
                        <input type="submit" className="btn btn-primary" value="Save" />
                    </div>
                </fieldset>

                <div>
            </div>
        </form>
      )}
      </Formik>
      </div>
            );
        }
    }
}

export default ProductEdit;