import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Verification from '../screens/Verification';
import Welcome from '../screens/Welcome';
import SplashScreen from '../screens/screens/SplashScreen';
import ScreenOne from '../screens/screens/ScreenOne';
import ScreenThree from '../screens/screens/ScreenThree';
export const publicRoutes = [
  {
    name: 'Welcome',
    component: Welcome,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Welcome',
    },
  },

  {
    name: 'Login',
    component: Login,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Login',
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'SignUp',
    },
  },

  {
    name: 'Verification',
    component: Verification,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Verification',
    },
  },
  {
    name: 'Splash',
    component: SplashScreen,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Splash',
    },
  },
  {
    name: 'First',
    component: ScreenOne,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'First',
    },
  },
  {
    name: 'Second',
    component: ScreenThree,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Second',
    },
  },

];
