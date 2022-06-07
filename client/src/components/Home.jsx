import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesAll, getTypes } from '../actions/actions';
import Foods from './Foods';
import NavBar from './NavBar';
import Cards from './Cards';
import Card from './Card';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Paginadofn from './Paginado';
import S from '../styles/Home.module.css';

export default function Home() {
  const [order, setOrder] = useState('');
  const [searchClick, setSearchClick] = useState(false);
  const dispatch = useDispatch();
  const getFood = useSelector(state => state.recipesAll);
  const recipes = useSelector(state => state.recipes);
  const typesAll = useSelector(state => state.types);
  const [foodPerSearch] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage, setFoodsPerPage] = useState(9);
  const indexFoodsLast = currentPage * foodsPerPage;

  const indexFoodsFirst = indexFoodsLast - foodsPerPage;
  const currentFoods = getFood.slice(indexFoodsFirst, indexFoodsLast);
  console.log(currentFoods);
  console.log(indexFoodsFirst);

  const paginado = pageNumber => {
    let page = currentPage;
    console.log(page);
    if (pageNumber === 'start') {
      setCurrentPage(1);
    } else if (pageNumber === 'finish') {
      setCurrentPage(Math.ceil(getFood.length / foodsPerPage));
    } else if (
      pageNumber === 'next' &&
      currentPage < Math.ceil(getFood.length / foodsPerPage)
    ) {
      page = currentPage + 1;
      setCurrentPage(page);
    } else if (pageNumber === 'previous' && currentPage > 1) {
      page = currentPage - 1;
      setCurrentPage(page);
    } else if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    dispatch(getRecipesAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function search() {
    setSearchClick(false);
    setTimeout(() => {
      setCurrentPage(1);
    }, 2000);
  }

  if (searchClick === false) {
    const currentFoods = recipes.slice(indexFoodsFirst, indexFoodsLast);

    return (
      <div className={S.hidden}>
        <h1>Recetas Para El Mundo</h1>
        <div className={S.imagen1}> </div>
        <div>
          <div className={S.home}>
            <div className={S.menu}>
              <NavBar
                typesAll={typesAll}
                setOrder={setOrder}
                setCurrentPage={setCurrentPage}
              />
              <SearchBar search={search} />
              <Paginadofn
                foodsPerPage={foodsPerPage}
                getFood={recipes.length}
                paginado={paginado}
                currentPage={currentPage}
              />
            </div>

            <div className={S.total1}>
              {currentFoods?.map(e => {
                return (
                  <div key={e.idApi ? e.idApi : e.id || 23432}>
                    <Card
                      key={e.idApi ? e.idApi : e.id}
                      name={e.name ? e.name : 'not name'}
                      score={e.score}
                      image={
                        e.image ||
                        'https://cdn.ttgtmedia.com/rms/onlineimages/404_error-h_half_column_mobile.png'
                      }
                      id={e.idApi ? e.idApi : e.id}
                      diets={e.diets}
                      Dish={e.types ? e.types : 'Not contains types food'}
                      Steps={e.steps}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={S.home}>
      <div className={S.home}>
        <SearchBar search={search} />
        <NavBar
          typesAll={typesAll}
          setOrder={setOrder}
          setCurrentPage={setCurrentPage}
        />

        <Paginadofn
          foodsPerPage={foodsPerPage}
          getFood={getFood.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        <div className={S.total1}>
          {currentFoods?.map(u => {
            return (
              <div className={S.total} key={u.idApi ? u.idApi : u.id}>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
