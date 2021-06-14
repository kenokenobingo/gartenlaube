import {memo, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';

import {CenterLogo} from '../../components/logo';
import FadeIn from '../../components/common/FadeIn';
<<<<<<< HEAD
import Wrap from '../../components/common/Wrap';

import compost from '../../assets/images/compost.jpg';

const CompostImg = React.memo(() => {
  return <img alt="Compost heap." src={compost}></img>;
});

function GetStartedHeader() {
  return <div data-testid="header" className="landing__header"></div>;
=======
import SocialMedia from '../../components/common/SocialMedia';
import Wrap from '../../components/common/Wrap';

const TributeCube = memo(() => {
  return (
    <div
      className="cube"
      data-testid="cube"
      data-aos="fade-up"
      data-aos-delay="150">
      <div className="cube__segment--top"></div>
      <div className="cube__segment--left"></div>
      <div className="cube__segment--right"></div>
    </div>
  );
});

function GetStartedHeader() {
  return (
    <div data-testid="get-started-header" className="landing__header">
      <SocialMedia />
      <NavHamburger />
    </div>
  );
>>>>>>> 35ff66c28e431b749df1c696dfc210ae55d3c3d6
}

export default function GetStarted() {
  /**
   * Their hooks
   */

  const history = useHistory();

  /**
   * Effects
   */

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 40,
      delay: 120,
      mirror: false,
      once: true,
    });
  }, []);

  /**
   * Render
   */

  return (
    <>
      <GetStartedHeader />
      <Wrap className="section-wrapper">
        <FadeIn>
          <CenterLogo />

          <div className="landing">
            <div className="landing__subtitle">
              Managing our gardening community
            </div>

            <div className="landing__img">
              <CompostImg></CompostImg>
            </div>

            <div className="landing__button">
              <button
                className="button"
                onClick={() => {
                  history.push('/join');
                }}>
                Join
              </button>
            </div>
          </div>
        </FadeIn>
      </Wrap>
    </>
  );
}
