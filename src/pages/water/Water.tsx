import React from 'react';
import {useHistory} from 'react-router-dom';

import {DaoAdapterConstants} from '../../components/adapters-extensions/enums';
import FadeIn from '../../components/common/FadeIn';
import Proposals from '../../components/proposals/Proposals';
import Wrap from '../../components/common/Wrap';

export default function Water() {
  /**
   * Render
   */

  return (
    <RenderWrapper>
      <Proposals
        adapterName={DaoAdapterConstants.TRIBUTE}
        includeProposalsExistingOnlyOffchain={true}
      />
    </RenderWrapper>
  );
}

function RenderWrapper(props: React.PropsWithChildren<any>): JSX.Element {
  /**
   * Their hooks
   */

  const history = useHistory();

  /**
   * Functions
   */

  function triggerIrrigation(event: React.MouseEvent<HTMLButtonElement>) {
    
  }

  /**
   * Render
   */

  return (
    <Wrap className="section-wrapper">
      <FadeIn>
        <div className="titlebar">
          <h2 className="titlebar__title">Water</h2>
          <button className="titlebar__action" onClick={triggerIrrigation}>
            Trigger Irrigation
          </button>
        </div>

        {/* RENDER CHILDREN */}
        {props.children}
      </FadeIn>
    </Wrap>
  );
}