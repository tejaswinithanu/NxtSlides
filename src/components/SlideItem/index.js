import {Component} from 'react'

import './index.css'

class SlideItem extends Component {
  onClickSlide = () => {
    const {slideDetails, onClickSlideTab} = this.props
    const {id} = slideDetails
    onClickSlideTab(id)
  }

  render() {
    const {slideDetails, slideNumber, isActive} = this.props
    const {heading, description} = slideDetails
    const bg = isActive ? 'active-bg' : 'bg-color'
    return (
      <li testid={`slideTab${slideNumber}`}>
        <button className={bg} onClick={this.onClickSlide} type="button">
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
