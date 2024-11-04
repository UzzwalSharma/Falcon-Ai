import React from 'react'
import Navbar from './Navbar'
import HeroSection from '/src/assets/Components/HeroSection.jsx'
import Feature from './Feature'
import Howitworks from './Howitworks'
import Feedbackform from './Feedbackform'
function Landingpage() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Feature/>
      <Howitworks/>
      <Feedbackform/>
    </div>
  )
}

export default Landingpage
