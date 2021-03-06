import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import RecipeScreen from "./screens/RecipeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import UserProfileScreen from "./screens/UserProfileScreen"
import GroupScreen from "./screens/GroupScreen"
import ListGroupsScreen from "./screens/ListGroupScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import ResetPasswordScreeen from "./screens/ResetPasswordScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/recipe/:id" component={RecipeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route path="/profile" component={UserProfileScreen} />
          <Route path="/mylists" component={ListGroupsScreen} />
          <Route path="/group/:id" component={GroupScreen} />
          <Route path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/reset/:token" component={ResetPasswordScreeen} />
          <Route exact path="/search/:keyword" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
