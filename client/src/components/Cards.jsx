import { connect } from 'react-redux';
import Card from './Card';
import { Link } from 'react-router-dom';
import S from '../styles/Cards.module.css';

function Cards(props) {
  if (props.foodDetails) {
    return (
      <div className={S.contenedor}>
        {props.foodDetails.map(u => (
          <Card
            key={u.idApi ? u.idApi : u.id}
            name={u.name}
            score={u.score}
            image={u.image}
            id={u.idApi ? u.idApi : u.id}
            diets={u.diets}
            Dish={u.types}
            Steps={u.steps}
          />
        ))}
      </div>
    );
  }
  return <div>Sin Recetas</div>;
}

function mapStateToProps(state) {
  return {
    foodDetails: state.recipesAll,
  };
}

export default connect(mapStateToProps, null)(Cards);
