import { connect } from 'react-redux';
import S from '../styles/Foods.module.css';

function Foods(props) {
  if (props.foodsDetails) {
    return (
      <div className={S.contenedor}>
        {props.foodsDetails.map(u => (
          <div className={S.food} key={u.idApi}>
            <img className={S.img} src={u.image} alt="not image" />
            <h3 className={S.food1}>{u.name}</h3>
          </div>
        ))}
      </div>
    );
  }
  return <div>Sin Recetas</div>;
}

function mapStateToProps(state) {
  return {
    foodsDetails: state.recipesAll,
  };
}

export default connect(mapStateToProps, null)(Foods);
