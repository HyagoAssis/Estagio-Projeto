import React, {useState} from "react";
import Rating from '@material-ui/lab/Rating';



import './styles.css';

export interface GameProps {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer?: string;
  release_date?: string;
  freetogame_profile_url?: string;
}

const Game: React.FC<GameProps> = (props) => {

  const localValue = localStorage.getItem('classification' + props.id);

  const localStatus = localStorage.getItem('status' + props.id);

  const [value, setValue] = useState(localValue != null ? parseInt(localValue) : 0);

  const [status, setStatus] = useState(localStatus != null ? (localStatus) : '');

  return (
    <div id="game-block">
      <div className="img-block">
        <img src={props.thumbnail} alt={"imagem: " + props.title} className="img-game" />
      </div>
      <div className="content-block">
        <p><span className="game-title">Título:</span> {props.title}</p>
        <p><span className="game-title">Gênero:</span> {props.genre}</p>
        <p><span className="game-title">Plataforma:</span> {props.platform}</p>
        <p><span className="game-title">Editora:</span> {props.publisher}</p>
        <p><span className="game-title">Link:</span> <a className="game-link" href={props.game_url}>{props.game_url}</a></p>
        <p><span className="game-title">Descrição:</span> {props.short_description}</p>

        <div className="content-classification">
          <div className="evaluation">
            <p>Avalie</p>
            <Rating
              name={"evaluation" + props.id}
              value={value}
              max={4}
              onChange={(event, newValue) => {
                  if (newValue != null) {
                    localStorage.setItem('classification' + props.id, newValue.toString());
                    setValue(newValue);
                  }
                  else{
                    newValue = 0;
                    localStorage.setItem('classification' + props.id, newValue.toString());
                    setValue(newValue);
                  }
            
              }}
            />
          </div>
          <div className="status">
            <p>Status</p>
            <select
              className="status-select"
              name={'status' + props.id}
              value={status}
              onChange={e => {
                console.log(status);
                console.log(e.target.value);
                localStorage.setItem('status' + props.id, e.target.value)
                setStatus(e.target.value)
              }}
            >
              <option> Selecione uma opção </option>
              <option> Joguei</option>
              <option> Jogando</option>
              <option> Querendo Jogar</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;