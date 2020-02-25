import React, { Component } from 'react';
import CarouselComponent from '../components/universal/carousel';

class Homepage extends Component {

    render() { 
        return (
            <div>
                <CarouselComponent />
                <div className="container mid-section">
                    <div className="row">
                        <div className="col-md-8">
                            <br />
                            <h3>Where's My Recipe?</h3>
                            <hr />
                            <p>
                                Love Collecting Recipes? You can save - edit - search and use them whenever you want! 
                            </p>
                            <p>
                                A simple platform where you can login to view all your saved recipes at any point of time. A user friendly feature to enable a hassel free usage.
                            </p>
                        </div>
                    </div>

                    <hr className="featurette-divider" /> 

                </div> 
            {/* <!-- Container --> */}
            </div>
        );
    }
}

export default Homepage;