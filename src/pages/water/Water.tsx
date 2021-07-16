import React, {useState, useCallback, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
import {useWeb3Modal} from '../../components/web3/hooks';
// import Web3 from 'web3';
import {Contract as Web3Contract} from 'web3-eth-contract/types';

import {AbiItem} from 'web3-utils';

import FadeIn from '../../components/common/FadeIn';
import Wrap from '../../components/common/Wrap';
// import {DAO_REGISTRY_CONTRACT_ADDRESS} from '../../config';
// import {WATER_CONTRACT_ADDRESS} from '../../config';

export default function Water() {
  /**
   * Their hooks
   */

  const {account, web3Instance} = useWeb3Modal();
  const [waterContract, setWaterContract] = useState<Web3Contract>();
  const [irrigationStatus, setIrrigationStatus] = useState<String>();

  const waterAddressValue: string =
    '0x8Ed9814B3b8759FFD948E87dFcc8C6196c0Dc4f1';

  /**
   * Functions
   */

  const getWaterContractCached = useCallback(getWaterContract, [
    waterAddressValue,
    web3Instance,
  ]);

  const getIrrigationStatusCached = useCallback(getIrrigationStatus, [
    account,
    waterContract,
  ]);

  useEffect(() => {
    getWaterContractCached();
  }, [getWaterContractCached]);

  useEffect(() => {
    getIrrigationStatusCached();
  }, [getIrrigationStatusCached]);

  async function getWaterContract() {
    if (!web3Instance || !waterAddressValue) {
      setWaterContract(undefined);
      console.log('water contract not found');
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
      console.log('water contract set: ' + instance);
      console.log('methods: ' + instance.methods);
      var method;

      for (method in instance.methods) {
        console.log(method);
      }

      return instance;
    } catch (error) {
      console.error(error);
      setWaterContract(undefined);
    }
  }

  async function getIrrigationStatus() {
    if (!account || !waterContract) {
      console.log('error getting irrigation status');
      return;
    }

    try {
      const result = await waterContract.methods.getIrrigation().call();
      setIrrigationStatus(result);
      console.log('Result ' + result);
    } catch (error) {
      console.error(error);
      setIrrigationStatus(undefined);
    }
  }

  return (
    <RenderWrapper>
      <button className="titlebar__action" onClick={getIrrigationStatus}>
        Get Status
      </button>
      <p>{irrigationStatus}</p>
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
        <div className="titlebar">
          <h2 className="titlebar__title">Water</h2>
        </div>
        {/* RENDER CHILDREN */}
        {props.children}
      </FadeIn>
    </Wrap>
  );
}
