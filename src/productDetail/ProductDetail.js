import React from 'react';
import { Link } from "react-router-dom";

class ProductDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            data: {
              productDetail:{}
            }
        };
    }

    componentDidMount() {
        setTimeout(()=>{
            fetch("/api/" + this.props.match.params.id + ".json")
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoading: false,
                        data: {
                            productDetail: data
                        }
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
        }, 1000)
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
                        <h1>{this.state.data.productDetail.productName}</h1>
                    </div>
                    <div className="row border-bottom pb-2">
                        <div className="col-md-4">
                            <img className="img-fluid" src={this.state.data.productDetail.imageUrl} />
                        </div>
                        <div className="col-md-8">
                            <dl className="row">
                                <dt className="col-sm-3">Product code</dt>
                                <dd className="col-sm-9">{this.state.data.productDetail.productCode}</dd>

                                <dt className="col-sm-3">Price</dt>
                                <dd className="col-sm-9">{this.state.data.productDetail.price}</dd>

                                <dt className="col-sm-3">Release Date</dt>
                                <dd className="col-sm-9">{this.state.data.productDetail.releaseDate}</dd>

                                <dt className="col-sm-3">Rating</dt>
                                <dd className="col-sm-9">{this.state.data.productDetail.starRating}</dd>

                                <dt className="col-sm-3 text-truncate">Tags</dt>
                                <dd className="col-sm-9">
                                    {
                                        this.state.data.productDetail.tags.map(
                                            (tag)=>
                                            <span key={tag} className="badge badge-pill badge-primary mr-2">{tag}</span>
                                        )
                                    }
                                    
                                </dd>
                            </dl>
                            <p>{this.state.data.productDetail.description}</p>
                        </div>
                    </div>

                    <div className="row pt-4">
                        <div className="col-md-12 text-right">
                            <Link className="btn btn-primary btn-sm mr-1" to={`/`}>Back to list</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ProductDetails;