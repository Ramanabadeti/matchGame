import {Component} from 'react'
import ImageOption from '../ImageOption/index'
import TabElement from '../TabElement/index'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = props
    this.state = {
      inTimer: true,
      score: 0,
      selectedTabImgs: 'FRUIT',
      mainImage: imagesList[0],
      timer: 60,
    }
  }

  renderMainImage = () => {
    const {imagesList} = this.props

    const imageID = Math.floor(Math.random() * imagesList.length)
    const obj = imagesList[imageID]
    this.setState(prev => ({mainImage: obj, score: prev.score + 1}))
  }

  tabClicked = tabId => {
    this.setState({selectedTabImgs: tabId})
  }

  answerClicked = id => {
    const {mainImage} = this.state
    console.log(id)
    if (id === mainImage.id) {
      console.log(true)
      this.renderMainImage()
    } else {
      this.setState({inTimer: false})
    }
  }

  componentDidMount = () => {
    this.timerId = setInterval(this.runTimer, 1000)
  }

  runTimer = () => {
    const {timer} = this.state
    if (timer !== 0) {
      this.setState(prev => ({timer: prev.timer - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({inTimer: false})
    }
  }

  reStart = () => {
    const {imagesList} = this.props
    this.setState({
      inTimer: true,
      score: 0,
      selectedTabImgs: 'FRUIT',
      mainImage: imagesList[0],
      timer: 60,
    })
    this.timerId = setInterval(this.runTimer, 1000)
  }

  render() {
    const {score, selectedTabImgs, mainImage, timer, inTimer} = this.state
    const {tabsList, imagesList} = this.props

    const filterImgsList = imagesList.filter(
      each => each.category === selectedTabImgs,
    )
    return (
      <div>
        <nav className="navContainer">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul className="content">
            <li>
              <p>Score: {score}</p>
            </li>
            <li className="timer">
              <img
                className="timerLogo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p>{timer} sec</p>
            </li>
          </ul>
        </nav>
        <div className="main">
          {inTimer && (
            <div>
              <img className="queImg" src={mainImage.imageUrl} alt="match" />

              <ul className="tabContainer">
                {tabsList.map(each => (
                  <TabElement
                    key={each.tabId}
                    tabClicked={this.tabClicked}
                    tabDetails={each}
                    selectedTabImgs={selectedTabImgs}
                    tabsList={tabsList}
                  />
                ))}
              </ul>
              <ul className="btnImgContainer">
                {filterImgsList.map(each => (
                  <ImageOption
                    key={each.id}
                    answerClicked={this.answerClicked}
                    optionDetails={each}
                  />
                ))}
              </ul>
            </div>
          )}
          {!inTimer && (
            <div className="resultContainer">
              <img
                className="resultImg"
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
              />
              <p>YOUR SCORE</p>
              <p>score: {score}</p>
              <button className="replayBtn" onClick={this.reStart}>
                <img
                  className="replayBtn"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />{' '}
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
