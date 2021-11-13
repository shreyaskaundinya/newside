import { CssBaseline, GeistProvider } from '@geist-ui/react';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import bgSvg from './assets/svgs/bg3.svg';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './hooks/ScrollToTop';
import LoadingPage from './pages/LoadingPage';

const Article = lazy(() => import('./pages/Article'));
const Auth = lazy(() => import('./pages/Auth'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Error404 = lazy(() => import('./pages/Error404'));
const Explore = lazy(() => import('./pages/Explore'));
const Home = lazy(() => import('./pages/Home'));
const TopicNews = lazy(() => import('./pages/TopicNews'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
    return (
        <GeistProvider>
            <CssBaseline />
            <Suspense fallback={<LoadingPage />}>
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
            </Suspense>
        </GeistProvider>
    );
}

export default App;
