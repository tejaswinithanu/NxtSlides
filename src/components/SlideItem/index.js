import {Component} from 'react'

class SlideItem extends Component {
  onClickSlide = () => {
    const {slideDetails, onClickSlideTab} = this.props
    const {id} = slideDetails
    onClickSlideTab(id)
  }

  render() {
    const {slideDetails, slideNumber} = this.props
    const {heading, description} = slideDetails
    return (
      <li testid={`slideTab${slideNumber}`}>
        <button onClick={this.onClickSlide} type="button">
          <p>{slideNumber}</p>
          <div>
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </button>
      </li>
    )
  }
}

export default SlideItem
