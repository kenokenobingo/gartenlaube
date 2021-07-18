import React, {useState, useCallback, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
import Web3 from 'web3';
import {Contract as Web3Contract} from 'web3-eth-contract/types';

import {AbiItem} from 'web3-utils';

import FadeIn from '../../components/common/FadeIn';
import Wrap from '../../components/common/Wrap';
// import {DAO_REGISTRY_CONTRACT_ADDRESS} from '../../config';
import {DEFAULT_CHAIN, WATER_CONTRACT_ADDRESS} from '../../config';
import {ETHEREUM_PROVIDER_URL} from '../../config';

const web3 = new Web3(Web3.givenProvider || ETHEREUM_PROVIDER_URL);

export default function Water() {
  /**
   * Their hooks
   */

  // const {account, web3Instance} = useWeb3Modal();

  const [waterContract, setWaterContract] = useState<Web3Contract>();
  const [irrigationStatus, setIrrigationStatus] = useState<String>(
    '🚨 Error: Cannot determine status.'
  );
  const [renderStatus, setRenderStatus] = useState<String>();

  const waterAddressValue: string = WATER_CONTRACT_ADDRESS[DEFAULT_CHAIN];

  /**
   * Functions
   */

  const getWaterContractCached = useCallback(getWaterContract, [
    waterAddressValue,
  ]);

  const getIrrigationStatusCached = useCallback(getIrrigationStatus, [
    waterContract,
    irrigationStatus,
  ]);

  useEffect(() => {
    getWaterContractCached();
  }, [getWaterContractCached]);

  useEffect(() => {
    getIrrigationStatusCached();
  }, [getIrrigationStatusCached]);

  async function getWaterContract() {
    if (!web3 || !waterAddressValue) {
      setWaterContract(undefined);
      console.log('water contract not found');
      return;
    }

    try {
      const {default: lazyWaterABI} = await import(
        '../../truffle-contracts/WaterContract.json'
      );
      const waterContract: AbiItem[] = lazyWaterABI as any;
      const instance = new web3.eth.Contract(waterContract, waterAddressValue);
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
    if (!waterContract) {
      console.log('error getting irrigation status');
      return;
    }

    try {
      const result = await waterContract.methods.getIrrigation().call();
      setIrrigationStatus(String(result));
      console.log('Result ' + result);

      if (irrigationStatus) {
        setRenderStatus('🟢 Irrigation in progress.');
      } else if (!irrigationStatus) {
        setRenderStatus('🔴 No irrigation necessary.');
      } else {
        setRenderStatus('🚨 Error: Cannot determine irrigation status.');
      }
    } catch (error) {
      console.error(error);
      setIrrigationStatus('');
      setRenderStatus('🚨 Error: Cannot determine irrigation status.');
    }
  }

  return (
    <RenderWrapper>
      <button className="titlebar__action" onClick={getIrrigationStatus}>
        Get Status
      </button>
      <p>{renderStatus}</p>
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
          <h2 className="titlebar__title">Irrigation Status</h2>
        </div>
        {/* RENDER CHILDREN */}
        {props.children}
      </FadeIn>
    </Wrap>
  );
}
