import Media from 'react-media';
import {NavLink} from 'react-router-dom';

import Web3ModalButton from './web3/Web3ModalButton';

export function NavLinks() {
  return (
    <nav role="navigation" id="navigation">
      <ul className="nav__list" data-testid="nav__list">
        <li tabIndex={0}>
          <NavLink to="/membership">
            <span>Membership</span>
          </NavLink>
        </li>
        <li tabIndex={0}>
          <NavLink to="/governance">
            <span>Governance</span>
          </NavLink>
        </li>
        <li tabIndex={0}>
          <NavLink to="/transfers">
            <span>Transfer</span>
          </NavLink>
        </li>
        <li tabIndex={0}>
          <NavLink to="/tributes">
            <span>Tribute</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function Nav() {
  /**
   * Render
   */

  return (
    <Media query="(max-width: 62em)">
      {(matches: boolean) => (
        <div className="nav-header">
          <div className="nav-header__menu-container">
            {/* NAV */}
            <NavLinks />
            <div className="nav-header__walletconnect-button-container">
              <Web3ModalButton showWalletETHBadge />
            </div>
          </div>
        </div>
      )}
    </Media>
  );
}
