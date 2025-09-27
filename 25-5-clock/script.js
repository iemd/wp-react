class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: "Session",
      timeLeft: 1500,
      timerStatus: "reset"
    };
    this.timer = null; // To store the seTimeout ID for clearing
  }

  /**** 1. Format Time ****/
  formatSecondsToMMSS = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad with leading zero if less than 10
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  /**** 2. Handle Break Length ****/
  handleBreakLength = (event) => {
    const { breakLength } = this.state;
    const btnValue = event.currentTarget.value;

    if (btnValue === "+") {
      if (breakLength < 60) {
        this.setState({
          breakLength: breakLength + 1
        });
      }
    }
    if (btnValue === "-") {
      if (breakLength > 1 && breakLength < 60) {
        this.setState({
          breakLength: breakLength - 1
        });
      }
    }
  };

  /**** 3. Handle Session Length ****/
  handleSessionLength = (event) => {
    const { sessionLength, timeLeft } = this.state;
    const btnValue = event.currentTarget.value;

    if (btnValue === "+") {
      if (sessionLength < 60) {
        this.setState({
          sessionLength: sessionLength + 1,
          timeLeft: timeLeft + 60
        });
      }
    }
    if (btnValue === "-") {
      if (sessionLength > 1) {
        this.setState({
          sessionLength: sessionLength - 1,
          timeLeft: timeLeft - 60
        });
      }
    }
  };

  /**** 4. Start Timer ****/
  startTimer = (audioRef) => {
    this.state.timeLeft++;
    const countdownTick = () => {
      if (this.state.timeLeft > 0) {
        this.setState({
          timeLeft: this.state.timeLeft - 1,
          timerStatus: "start"
        });
        this.timer = setTimeout(countdownTick, 1000);
      } else {
        //console.log("Countdown Finished!");
        this.setState(
          {
            timerType: this.state.timerType === "Session" ? "Break" : "Session",
            timeLeft:
              this.state.timerType === "Session"
                ? this.state.breakLength * 60 + 1
                : this.state.sessionLength * 60 + 1,
            timerStatus: "start"
          },
          () => {
            audioRef.current.play();
            countdownTick();
          }
        );
      }
    };
    countdownTick();
  };

  /**** 5. Handle Play/Pause Button ****/
  handlePlay = (audioRef) => {
    const { timeLeft, timerStatus } = this.state;
    if (timerStatus === "start") {
      this.setState({
        timerStatus: "stop"
      });
      clearTimeout(this.timer);
    }
    if (timerStatus === "reset" || timerStatus === "stop") {
      this.startTimer(audioRef);
    }
  };

  /**** 6. Handle Reset Button ****/
  handleReset = (audioRef) => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: "Session",
      timeLeft: 1500,
      timerStatus: "reset"
    });
    clearTimeout(this.timer);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  render() {
    return (
      <TwentyFivePlusFiveClock>
        <BreakLength
          breakLength={this.state.breakLength}
          handleBreakLength={this.handleBreakLength}
        />
        <SessionLength
          sessionLength={this.state.sessionLength}
          handleSessionLength={this.handleSessionLength}
        />
        <Timer
          timerType={this.state.timerType}
          timeLeft={this.state.timeLeft}
          formatSecondsToMMSS={this.formatSecondsToMMSS}
        />
        <TimerControl
          handlePlay={this.handlePlay}
          handleReset={this.handleReset}
        />
      </TwentyFivePlusFiveClock>
    );
  }
}

const TwentyFivePlusFiveClock = (props) => {
  return (
    <div>
      <div className="main-title">25 + 5 Clock</div>
      {props.children}
    </div>
  );
};

const BreakLength = ({ breakLength, handleBreakLength }) => {
  return (
    <div className="length-control">
      <div id="break-label">Break Length</div>
      <button
        className="btn-label"
        id="break-decrement"
        value="-"
        onClick={handleBreakLength}
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div className="btn-label" id="break-length">
        {breakLength}
      </div>
      <button
        className="btn-label"
        id="break-increment"
        value="+"
        onClick={handleBreakLength}
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
};

const SessionLength = ({ sessionLength, handleSessionLength }) => {
  return (
    <div className="length-control">
      <div id="session-label">Session Length</div>
      <button
        className="btn-label"
        id="session-decrement"
        value="-"
        onClick={handleSessionLength}
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div className="btn-label" id="session-length">
        {sessionLength}
      </div>
      <button
        className="btn-label"
        id="session-increment"
        value="+"
        onClick={handleSessionLength}
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
};

const Timer = ({ timerType, timeLeft, formatSecondsToMMSS }) => {
  return (
    <div className="timer">
      <div className="timer-wrapper">
        <div id="timer-label">{timerType}</div>
        <div id="time-left">{formatSecondsToMMSS(timeLeft)}</div>
      </div>
    </div>
  );
};

const TimerControl = ({ handlePlay, handleReset }) => {
  const audioRef = React.useRef(null);
  return (
    <>
      <div className="timer-control">
        <button
          id="start_stop"
          onClick={() => {
            handlePlay(audioRef);
          }}
        >
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button
          id="reset"
          onClick={() => {
            handleReset(audioRef);
          }}
        >
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      <audio
        ref={audioRef}
        id="beep"
        preload="auto"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
