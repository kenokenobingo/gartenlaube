import React from 'react';
import {useHistory} from 'react-router-dom';

import {BURN_ADDRESS} from '../../util/constants';
import FadeIn from '../../components/common/FadeIn';
import GovernanceProposalsList from '../../components/governance/GovernanceProposalsList';
import Wrap from '../../components/common/Wrap';

export default function GovernanceProposals() {
  const history = useHistory();

  /**
   * Functions
   */

  function handleClickProposalDetails(id: string) {
    id && history.push(`/governance/${id}`);
  }

  /**
   * Render
   */

  return (
    <RenderWrapper>
      <GovernanceProposalsList
        actionId={BURN_ADDRESS}
        onProposalClick={handleClickProposalDetails}
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

  function goToNewProposal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    history.push('/governance-proposal');
  }

  /**
   * Render
   */

  return (
    <Wrap className="section-wrapper">
      <FadeIn>
        <div className="titlebar">
          <h2 className="titlebar__title">Governance</h2>
          <button className="titlebar__action" onClick={goToNewProposal}>
            New Proposal
          </button>
        </div>

        {/* RENDER CHILDREN */}
        {props.children}
      </FadeIn>
    </Wrap>
  );
}
