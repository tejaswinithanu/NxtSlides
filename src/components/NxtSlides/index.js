import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Header from '../Header'
import SlideItem from '../SlideItem'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    activeId: initialSlidesList[0].id,
    slidesList: initialSlidesList,
    activeHeading: initialSlidesList[0].heading,
    activeDescription: initialSlidesList[0].description,
    isHeadingEditing: false,
    isDescriptionEditing: false,
  }

  onHeadingLostFocus = () => {
    this.setState({isHeadingEditing: false})
  }

  onDescriptionLostFocus = () => {
    this.setState({isDescriptionEditing: false})
  }

  onClickHeading = () => {
    this.setState({isHeadingEditing: true, isDescriptionEditing: false})
  }

  onClickDescription = () => {
    this.setState({isDescriptionEditing: true, isHeadingEditing: false})
  }

  onChangeHeading = event => {
    this.setState({activeHeading: event.target.value}, this.updateHeading)
  }

  updateHeading = () => {
    const {activeHeading, activeId, slidesList} = this.state
    const newSlidesList = slidesList.map(eachSlide => {
      if (eachSlide.id === activeId) {
        return {
          id: activeId,
          heading: activeHeading,
          description: eachSlide.description,
        }
      }
      return eachSlide
    })
    this.setState({slidesList: newSlidesList})
  }

  onChangeDescription = event => {
    this.setState(
      {activeDescription: event.target.value},
      this.updateDescription,
    )
  }

  updateDescription = () => {
    const {activeDescription, activeId, slidesList} = this.state
    const newSlidesList = slidesList.map(eachSlide => {
      if (eachSlide.id === activeId) {
        return {
          id: activeId,
          heading: eachSlide.heading,
          description: activeDescription,
        }
      }
      return eachSlide
    })
    this.setState({slidesList: newSlidesList})
  }

  onClickSlideTab = id => {
    const {slidesList} = this.state
    const activeSlide = slidesList.filter(each => each.id === id)
    this.setState({
      activeHeading: activeSlide[0].heading,
      activeDescription: activeSlide[0].description,
      activeId: id,
      isHeadingEditing: false,
      isDescriptionEditing: false,
    })
  }

  onAddNewSlide = () => {
    const {slidesList, activeId} = this.state
    const newSlideDetails = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }
    const index = slidesList.findIndex(each => each.id === activeId)
    slidesList.splice(index + 1, 0, newSlideDetails)
    this.setState(
      {
        slidesList,
        activeId: newSlideDetails.id,
        activeHeading: newSlideDetails.heading,
        activeDescription: newSlideDetails.description,
        isHeadingEditing: false,
        isDescriptionEditing: false,
      },
      console.log(slidesList),
    )
  }

  render() {
    const {
      slidesList,
      activeHeading,
      activeDescription,
      isHeadingEditing,
      isDescriptionEditing,
      activeId,
    } = this.state
    return (
      <div>
        <Header />
        <button onClick={this.onAddNewSlide} type="submit">
          <img
            alt="new plus icon"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
          />
          <p>New</p>
        </button>
        <div>
          <ol>
            {slidesList.map(eachSlide => (
              <SlideItem
                slideNumber={
                  initialSlidesList.findIndex(
                    each => each.id === eachSlide.id,
                  ) + 1
                }
                key={eachSlide.id}
                slideDetails={eachSlide}
                onClickSlideTab={this.onClickSlideTab}
                isActive={eachSlide.id === activeId}
              />
            ))}
          </ol>
          <div>
            {isHeadingEditing ? (
              <input
                onChange={this.onChangeHeading}
                onBlur={this.onHeadingLostFocus}
                value={activeHeading}
                type="text"
              />
            ) : (
              <h1 onClick={this.onClickHeading}>{activeHeading}</h1>
            )}
            {isDescriptionEditing ? (
              <input
                onChange={this.onChangeDescription}
                onBlur={this.onDescriptionLostFocus}
                value={activeDescription}
                type="text"
              />
            ) : (
              <p onClick={this.onClickDescription}>{activeDescription}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
