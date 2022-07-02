import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Nft from "../nfts/Card";
import Loader from "../ui/Loader";
import { Row } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core"
import { RingLoader } from "react-spinners";
import '../explore/Explore.css';
import { getNfts } from '../../utils/minter'

import { getContract } from '../../hooks/useContract';
import { nftAbi, nftAddress } from "../../contracts";



const Profile = () => {
    // to keep track of all NFTs to map over later
    const [nfts, setNfts] = useState([]);
    // check if NFTs are loaded or not
    const [loading, setLoading] = useState(false);
    let minterContract;

     //connector, library, chainId, account, activate, deactivate
     const web3reactContext = useWeb3React();

    const getAssets = useCallback(async () => {
      try {
          if (!web3reactContext.account) return;
          // create NFT contract abstraction
          const minterContract = getContract(web3reactContext.library, web3reactContext.account, nftAddress, nftAbi['abi']);
          // sets loading to true so it displays react animation while NFTs load
          setLoading(true);

          const all_nfts = await getNfts(minterContract);

          const userNfts = all_nfts.filter(e => e.owner.toLowerCase() === web3reactContext.account.toLowerCase());
          
          if (!userNfts) return;
          // sets nft list to be the filtered items
          setNfts(userNfts);
        } catch (error) {
          console.log({ error });
        } finally {
          // set loading to false so it stops react animation
          setLoading(false);
        }
      }, [web3reactContext.account, web3reactContext.library]);

      useEffect(() => {
        try {
          // gets all market Items when the page loads
          getAssets();
        } catch (error) {
          console.log({ error });
        }
      }, [getAssets, minterContract]);

    return (
        <div className="explore-section">
        {!loading ? (
            <>
            {nfts.length >= 1 ? (
            <Row xs={1} sm={1} lg={1} className="w-100">
                {nfts.map((_nft) => (
                    <Nft
                        key={_nft.index}
                        nft={{
                        ..._nft,
                        }}
                    />
                ))}
            </Row>
            ) : (
                <div className="nonfts-div">
                    {<RingLoader color={"green"} size={150} />}
                    <span className="nonfts-text">No NFTs yet <br /> Create one to display</span>
                </div>
            )
            }
            </>
        ) : (
            <Loader />
        )}
        </div>
    );
    };
    

Profile.propTypes = {
    minterContract: PropTypes.instanceOf(Object)
 };
    
Profile.defaultProps = {
minterContract: null,
};

export default Profile;
