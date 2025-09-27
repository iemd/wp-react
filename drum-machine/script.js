const heaterKit = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];
const smoothPianoKit = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];
const bank = { heaterKit: "Heater Kit", smoothPianoKit: "Smooth Piano Kit" };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioClips: heaterKit,
      display: "",
      defaultVolumn: 0.3,
      bank: ""
    };

    this.play = this.play.bind(this);
    this.handleVolumeSlider = this.handleVolumeSlider.bind(this);
    this.handleBankBtnClick = this.handleBankBtnClick.bind(this);
  }

  play(audioClip) {
    const audio = document.getElementById(audioClip.keyTrigger);
    const button = document.getElementById(audioClip.id);
    audio.play();

    button.style.backgroundColor = "lightblue";
    button.style.transform = "translate(1px, 1px)";
    setTimeout(() => {
      button.style.backgroundColor = "";
      button.style.transform = "scale(1)";
    }, 80);

    document.getElementById("display").innerText = audioClip.id;
  }

  handleKeyDown(event) {
    const id = event.key;
    const audio = document.getElementById(id.toUpperCase());
    if (audio) {
      audio.play();
      document.getElementById("display").innerText = audio.parentElement.id;
    }
  }

  handleVolumeSlider(event) {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.volume = event.target.value;
    });
  }

  handleBankBtnClick() {
    this.setState((prevState) => {
      if (prevState.audioClips == heaterKit) {
        return { audioClips: smoothPianoKit, bank: bank.smoothPianoKit };
      } else {
        return { audioClips: heaterKit, bank: bank.heaterKit };
      }
    });
    document.getElementById("display").innerText = this.state.bank;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <DrumMachine>
        <KeyBoard audioClips={this.state.audioClips} play={this.play} />
        <Controls
          bank={this.state.bank}
          defaultVolumn={this.state.defaultVolumn}
          handleVolumeSlider={this.handleVolumeSlider}
          handleBankBtnClick={this.handleBankBtnClick}
        />
      </DrumMachine>
    );
  }
}

const DrumMachine = (props) => {
  return (
    <div className="container-fluid" id="drum-machine">
      <div className="row my-4">{props.children}</div>
    </div>
  );
};

const KeyBoard = ({ audioClips, play }) => {
  return (
    <div className="col fixed-width-column">
      <div className="pad-bank">
        {audioClips.map((audioClip) => (
          <button
            key={audioClip.id}
            className="drum-pad"
            id={audioClip.id}
            onClick={() => play(audioClip)}
          >
            <audio
              className="clip"
              id={audioClip.keyTrigger}
              src={audioClip.url}
            ></audio>
            {audioClip.keyTrigger}
          </button>
        ))}
      </div>
    </div>
  );
};

const Controls = ({ bank, handleVolumeSlider, handleBankBtnClick }) => {
  return (
    <>
      <div className="col fixed-width-column">
        <div className="controls-container">
          <p id="display" className="text-center">
            {bank}
          </p>
          <div className="volume-slider">
            <input
              type="range"
              onInput={handleVolumeSlider}
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.3"
            />
          </div>
          <div className="bank">
            <button
              type="button"
              onClick={handleBankBtnClick}
              className="btn btn-primary"
              id="bank"
            >
              Bank
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
