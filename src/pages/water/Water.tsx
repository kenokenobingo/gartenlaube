import React from 'react';
import {useState} from 'react';
// import {useHistory} from 'react-router-dom';
import {useWeb3Modal} from '../../components/web3/hooks';
// import Web3 from 'web3';
import {Contract as Web3Contract} from 'web3-eth-contract/types';

import {AbiItem} from 'web3-utils';

import FadeIn from '../../components/common/FadeIn';
import Wrap from '../../components/common/Wrap';
import {WATER_CONTRACT_ADDRESS} from '../../config';

export default function Water() {
  /**
   * Render
   */

  /**
   * Their hooks
   */

  const [waterContract, setWaterContract] = useState<Web3Contract>();
  const {web3Instance} = useWeb3Modal();

  // const web3 = new Web3();

  const waterAddressValue = String(WATER_CONTRACT_ADDRESS);

  /**
   * Functions
   */

  async function getWaterContract() {
    if (!web3Instance || !waterAddressValue) {
      setWaterContract(undefined);
      return;
    }

    try {
      const {default: lazyWaterABI} = await import(
        '../../truffle-contracts/WaterContract.json'
      );
      const waterContract: AbiItem[] = lazyWaterABI as any;
      const instance = new web3Instance.eth.Contract(
        waterContract,
        waterAddressValue
      );
      setWaterContract(instance);
    } catch (error) {
      console.error(error);
      setWaterContract(undefined);
    }
  }

  function triggerIrrigation(event: React.MouseEvent<HTMLButtonElement>) {
    getWaterContract();
    if (!waterContract) {
      return;
    }

    try {
      waterContract.methods.getHumidity.then(function (error: string, result: string) {
        console.log(result);
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <RenderWrapper>
      <h2 className="titlebar__title">Water</h2>
      <button className="titlebar__action" onClick={triggerIrrigation}>
        Trigger Irrigation
      </button>
    </RenderWrapper>
  );
}

function RenderWrapper(props: React.PropsWithChildren<any>): JSX.Element {
  /**
   * Render
   */

  return (
    <Wrap className="section-wrapper">
      <FadeIn>
        <div className="titlebar"></div>
        {/* RENDER CHILDREN */}
        {props.children}
      </FadeIn>
    </Wrap>
  );
}
