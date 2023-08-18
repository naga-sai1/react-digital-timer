import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getElapsedSecondsInTimeFormat = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  incrementTimeElapsedInSecond = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    if (timeInSeconds === timerLimitInMinutes * 60) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timerLimitInMinutes} = this.state
    if (timeInSeconds === timerLimitInMinutes * 60) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSecond, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onDecreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-btn"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="limit-controller-btn"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="time-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="status">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controller-container">
              <button
                className="btn"
                type="button"
                onClick={this.onStartOrPauseTimer}
              >
                <img src={imageUrl} alt={altText} className="icon" />
                <p className="timer-controller-label">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button className="btn" type="button" onClick={this.onResetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
            </div>
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
