import { CssBaseline, GeistProvider } from '@geist-ui/react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import bgSvg from './assets/svgs/bg3.svg';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './hooks/ScrollToTop';
import Article from './pages/Article';
import Auth from './pages/Auth';
import Bookmarks from './pages/Bookmarks';
import Error404 from './pages/Error404';
import Explore from './pages/Explore';
import Home from './pages/Home';
import TopicNews from './pages/TopicNews';
import UserProfile from './pages/UserProfile';

function App() {
    return (
        <GeistProvider>
            <CssBaseline />
            <Router>
                <ScrollToTop />
                <div
                    className='App'
                    style={{
                        backgroundImage: `url(${bgSvg})`,
                        backgroundPosition: 'top',
                        backgroundRepeat: 'repeat',
                        backgroundSize: 'cover',
                    }}>
                    <Navbar />
                    <AnimatePresence exitBeforeEnter>
                        <Switch>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <Route path='/auth'>
                                <Auth />
                            </Route>
                            <Route path='/me'>
                                <UserProfile />
                            </Route>
                            <Route path='/bookmarks'>
                                <Bookmarks />
                            </Route>
                            <Route path='/explore'>
                                <Explore />
                            </Route>
                            <Route path='/article/:id'>
                                <Article />
                            </Route>
                            <Route path='/topic/:topic'>
                                <TopicNews />
                            </Route>
                            <Route path='*'>
                                <Error404 />
                            </Route>
                        </Switch>
                    </AnimatePresence>
                    <Footer />
                </div>
            </Router>
        </GeistProvider>
    );
}

export default App;
