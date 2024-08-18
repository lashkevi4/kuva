import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import CategoryScreen from './components/CategoryScreen';
import PosePreviewScreen from './components/PosePreviewScreen';
import PoseDetailScreen from './components/PoseDetailScreen';
import TipsScreen from './components/TipsScreen';
import TipDetailScreen from './components/TipDetailScreen';
import FavoritesScreen from './components/FavoritesScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/categories" element={<CategoryScreen />} />
      <Route path="/pose-preview/:categoryId" element={<PosePreviewScreen />} />
      <Route path="/pose-detail/:categoryId/:poseId" element={<PoseDetailScreen />} />
      <Route path="/tips" element={<TipsScreen />} />
      <Route path="/tips/:categoryId/:tipId" element={<TipDetailScreen />} />
      <Route path="/favorites" element={<FavoritesScreen />} />
    </Routes>
  );
}

export default App;
