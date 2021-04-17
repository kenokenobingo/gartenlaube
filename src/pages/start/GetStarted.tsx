import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';

import {CenterLogo} from '../../components/logo';
import FadeIn from '../../components/common/FadeIn';
import Wrap from '../../components/common/Wrap';

import compost from '../../assets/images/compost.jpg';

const CompostImg = React.memo(() => {
  return <img alt="Compost heap." src={compost}></img>;
});

function GetStartedHeader() {
  return (
    <div data-testid="header" className="landing__header">
    </div>
  );
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
