import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import { useSwipeable } from 'react-swipeable';
import BurgerMenu from './BurgerMenu';
import '../styles/global.css';


function TipDetailScreen() {

  // get parameters from url
  const { categoryId, tipId } = useParams();

  // create state to hold the current tip and all tips
  const [state, setState] = useState({
    tip: { title: '', content: [], image: '' },
    tips: []
  });

  // create navigation function to move between pages
  const navigate = useNavigate();

  // find the category by id or set an empty object if not found
  const category = categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  useEffect(() => {

    // create url to request data from the server
    const url = `/data/tips/${category.path}/data.json`;

    // fetch data from the server
    fetch(url)

      // convert server response to json
      .then(response => response.json())
      .then(data => {

        // find the tip by id in the list
        const tipData = data.tips.find(t => t.id === parseInt(tipId));

        // update state with the current tip and all tips
        setState({
          tip: tipData || { title: '', content: [], image: '' },
          tips: data.tips
        });

      })

      .catch(error => {
        // log error if data loading fails
        console.error('Error loading data:', error);
      });

  }, [category.path, tipId]);

  // get the id of the next tip
  const getNextTipId = () => {

    // find the index of the current tip
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));

    // calculate the index of the next tip
    const nextIndex = (currentIndex + 1) % state.tips.length;

    // return the id of the next tip
    return state.tips[nextIndex].id;
  };

  // get the id of the previous tip
  const getPrevTipId = () => {

    // find the index of the current tip
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));

    // calculate the index of the previous tip
    const prevIndex = (currentIndex - 1 + state.tips.length) % state.tips.length;

    // return the id of the previous tip
    return state.tips[prevIndex].id;
  };

  // handle swipe left (next tip)
  const handleSwipeLeft = () => {
    const nextTipId = getNextTipId();
    navigate(`/tips/${categoryId}/${nextTipId}`);
  };

  // handle swipe right (previous tip)
  const handleSwipeRight = () => {
    const prevTipId = getPrevTipId();
    navigate(`/tips/${categoryId}/${prevTipId}`);
  };

  // configure swipe gestures using useSwipeable
  const handlers = useSwipeable({

    // swipe left - trigger handleSwipeLeft
    onSwipedLeft: handleSwipeLeft,

    // swipe right - trigger handleSwipeRight
    onSwipedRight: handleSwipeRight,

    // prevent default touchmove event
    preventDefaultTouchmoveEvent: true,

    // this should work, but it didn't for me
    trackMouse: true
  });

  return (

    <div className="main-container">

      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">{category.name}</h1>

      <div className="tip" {...handlers}>

        <img
          src={`/images/tips/${category.path}/${state.tip.image}`}
          alt={state.tip.title}
          className="tip-image"
        />

        <h2 className="tip-title">{state.tip.title}</h2>

        {state.tip.content.map((paragraph, index) => (
          <p key={index} className="tip-content">{paragraph}</p>
        ))}

      </div>

      <div className="tip-navigation">

        {/* button to go to the previous tip */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)} className="tip-navButton">
          <img src="/images/app/left.svg" alt="previous" className="tip-icon" />
        </button>

        {/* display the current tip number */}
        <span className="tip-pageIndicator">{`${tipId}/${state.tips.length}`}</span>

        {/* button to go to the next tip */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)} className="tip-navButton">
          <img src="/images/app/right.svg" alt="next" className="tip-icon" />
        </button>

      </div>

      {/* extra space */}
      <div className="tip-bottomSpace"></div>

    </div>

  );
}


export default TipDetailScreen;
