import React, { Suspense, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

//import Lottos from './lottos/pages/Lottos';
//import Projects from './projectslanding/pages/Projects'
//import Leaderboard from './leaderboard/pages/Leaderboard';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Navigation/Footer';
//import Auth from './auth/pages/Auth';
//import Home from './homepage/pages/Home'
//import PrivacyPolicy from './shared/components/Navigation/Privacy';

import { HashconnectContextProvider } from './shared/context/auth-context'
import { HashConnectClient } from './shared/hooks/hashconnect';

import { ThreeBody} from '@uiball/loaders'

const Lottos = React.lazy(() => import('./lottos/pages/Lottos'));
const Leaderboard = React.lazy(() => import('./leaderboard/pages/Leaderboard'));
const Auth = React.lazy(() => import('./auth/pages/Auth'));
const Home = React.lazy(() => import('./homepage/pages/Home'));
const PrivacyPolicy = React.lazy(() => import('./shared/components/Navigation/Privacy'));
const Projects = React.lazy(() => import('./projectslanding/pages/Projects'));

const App = () => {

  const [isConnected, setIsConnected] = useState(false);

  let routes;

  if (isConnected) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Auth/>} />
        <Route exact path="/projects" element={<Projects/>} />
        <Route exact path="/lottos/project/:projectName" element={<Lottos/>} />
        <Route exact path="/rex/account/:accountId" element={<Lottos/>} />
        <Route exact path="/leaderboard" element={<Leaderboard/>} />
        <Route exact path="/privacy" element={<PrivacyPolicy/>} />
        <Route to="/" />
      </Routes>
    );
  }

  if (!isConnected) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Auth/>} />
        <Route exact path="/projects" element={<Projects/>} />
        <Route exact path="/lottos/project/:projectName" element={<Lottos/>} />
        <Route exact path="/rex/account/:accountId" element={<Lottos/>} />
        <Route exact path="/leaderboard" element={<Leaderboard/>} />
        <Route exact path="/privacy" element={<PrivacyPolicy/>} />
        <Route to="/" />
      </Routes>
    );
  }

  return (
    <HashconnectContextProvider>
    <Router>
      <MainNavigation />
      <HashConnectClient/>
      <main>
        <Suspense 
          fallback={
            <div className="center">
              <ThreeBody speed={.7} color='#242424'/>
            </div>}>
          {routes}
        </Suspense>
      </main>
      <Footer/>
    </Router>
    </HashconnectContextProvider>
  );
};

export default App;
