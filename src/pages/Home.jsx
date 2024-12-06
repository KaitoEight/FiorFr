import HeroSection from '../components/HeroSection'
import CTA from '../components/CTA'
import FeatureCards from '../components/features'
import Faqs from '../components/Faqs'
import FoodSwiper from '../components/FoodSwiper'
import BigTextSection from '../components/animatedText'


const Home = () => {
  return (
    <div >
        <HeroSection />
        <BigTextSection />
        <h1 className='text-5xl font-extrabold text-black text-center mt-10 mb-10 underline'>OPTIONS</h1>
        <FeatureCards />
        <FoodSwiper />
        <CTA />
        <Faqs />
    </div>
  )
}

export default Home
