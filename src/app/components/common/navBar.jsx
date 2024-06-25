import React, { useEffect, useState } from 'react';
import '../../styles/tabs.scss';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import iconSV from '../../images/xbox-one-game-control-with-low-battery-status-svgrepo-com.svg';
import _ from 'lodash';
import { useCurrentCat, useStateCategories } from '../../store/categoryStore';
import { useCart } from '../../../store';
import Search from './form/searchForm';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../store/productsStore';

const NavBar = () => {
  // const { categories } = useCategories();

  const stateCategories = useStateCategories((state) => state.categories);

  console.log(stateCategories);

  const cartItems = useCart((state) => state.cartItems);
  const displayCart = useCart((state) => state.setDisplayCart);
  const currentCat = useCurrentCat((state) => state.category);
  const setCurrentCat = useCurrentCat((state) => state.setItems);

  const [menuActive, setMenuActive] = useState(false);
  const history = useHistory();
  const { currentUser, logOut } = useAuth();
  const setQuery = useSearch((state) => state.setQuery);
  const searchQuery = useSearch((state) => state.searchQuery);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const handleToggle = () => {
    setMenuActive(!menuActive);
  };

  const handleTab = (e, cat) => {
    const allTabs = document.querySelectorAll('.menu-list li');
    for (let i = 0; i <= allTabs.length - 1; i++) {
      if (allTabs[i].className) {
        allTabs[i].className = '';
      }
    }
    e.currentTarget.className = 'active';
    if (cat) {
      setCurrentCat(cat);
      history.push('/showcase');
    }
    setQuery('');
  };

  const handleQuery = (event) => {
    // setCurrentCategory(undefined);
    setCurrentSearchQuery(event.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setQuery(currentSearchQuery);
      setCurrentSearchQuery('');
    }
  };

  useEffect(() => {
    console.log(currentCat);
  }, [currentCat]);

  const sortedCategories = _.orderBy(stateCategories, ['order'], ['asc']);
  const categoriesList = sortedCategories.map((cat) => (
    <li
      key={cat.id}
      style={{ '--bg': ` ${cat.color}` }}
      className={cat.name === 'all' ? 'active' : ''}
      onClick={(e) => handleTab(e, cat)}>
      <span href="#">
        <div className="icon">
          <i className={!cat.icon ? cat.class : cat.icon}></i>
        </div>
        <div className="text">{cat.rus}</div>
      </span>
    </li>
  ));

  return (
    <>
      {/* <div
        className={menuActive ? 'menu-toggle active' : 'menu-toggle'}
        onClick={handleToggle}></div> */}
      <div className={menuActive ? 'sidebar active' : 'sidebar'}>
        <ul>
          <li className="logo">
            <Link to={'/showcase'}>
              <div className="icon">
                <img src={iconSV} className="psac_img" alt="" />
              </div>
              <div className="text">Store Logo</div>
            </Link>
          </li>
          <div className="menu-list">
            <Search
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              handleQuery={handleQuery}
            />
            <li style={{ '--bg': '#d6911a' }} className={''} onClick={handleTab}>
              {!currentUser.name ? (
                <Link to={'/login'}>
                  <div className="icon">
                    <i className={'fa-solid fa-arrow-right-to-bracket'}></i>
                  </div>
                  <div className={'text'}>Войти</div>
                </Link>
              ) : (
                <Link to={'/showcase'}>
                  <div className="icon" onClick={displayCart}>
                    <i className={'fa-solid fa-cart-shopping'}></i>
                    <div className="user">{cartItems.length}</div>
                  </div>
                  <div className={'text'}>{currentUser.name}</div>
                  <div className="icon">
                    <i className="fa-solid fa-right-from-bracket" onClick={logOut}></i>
                  </div>
                </Link>
              )}
            </li>
            {categoriesList}
            {currentUser.isAdmin && (
              <li onClick={handleTab} style={{ '--bg': '#72d61a' }}>
                <Link to={'/admin'}>
                  <div className="icon">
                    <i className={'fa-solid fa-gears'}></i>
                  </div>
                  <div className={'text'}>управление</div>
                </Link>
              </li>
            )}
            <li>
              <span>
                <div className="icon toggle" onClick={handleToggle}>
                  <i
                    className={
                      menuActive ? 'fa-solid fa-angles-left active' : 'fa-solid fa-angles-left'
                    }></i>
                </div>
              </span>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
