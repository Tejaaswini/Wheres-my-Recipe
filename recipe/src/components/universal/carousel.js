import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import img1 from '../../img/meh.jpg';
import img2 from '../../img/222.jpg';
import img3 from '../../img/33.jpg';

const items = [
    {
        src: img1,
        altText: 'Slide 1',
        caption: 'Edit'
    },
    {
        src: img2,
        altText: 'Slide 2',
        caption: 'Save'
    },
    {
        src: img3,
        altText: 'Slide 3',
        caption: 'Search'
    }
]

class CarouselComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const slides = items.map((item) => (
            <CarouselItem 
                onExiting = { this.onExiting }
                onExited = { this.onExited }
                key = { item.src }
            >
                <div className="carouselimg">
                    <img src={ item.src } alt={ item.altText } className="imageclass" />
                </div>
                <CarouselCaption captionText={ item.caption } captionHeader={ item.caption } />
            </CarouselItem>  
        ));

        return (
            <Carousel 
                activeIndex={ activeIndex }
                next={ this.next }
                previous={ this.previous }
            >
                <CarouselIndicators 
                    items={ items }
                    activeIndex={ activeIndex }
                    onClickHandler={ this.goToIndex }
                />
                    { slides }
                <CarouselControl 
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={ this.previous }
                />
                <CarouselControl 
                    direction="next"
                    directionText="Next"
                    onClickHandler={ this.next }
                />
            </Carousel>
        );
    }
}

export default CarouselComponent;