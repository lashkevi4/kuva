import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import CategoryScreen from './components/CategoryScreen';
import PosePreviewScreen from './components/PosePreviewScreen';
import PoseDetailScreen from './components/PoseDetailScreen';
import TipsScreen from './components/TipsScreen';
import TipDetailScreen from './components/TipDetailScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/categories" element={<CategoryScreen />} />
      <Route path="/pose-preview/:categoryId" element={<PosePreviewScreen />} />
      <Route path="/pose-detail/:poseId" element={<PoseDetailScreen />} />
      <Route path="/tips" element={<TipsScreen />} />
      <Route path="/tip-detail/:tipId" element={<TipDetailScreen />} />
    </Routes>
  );
}

export default App;
