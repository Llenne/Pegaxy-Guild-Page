import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {NoEthereumProviderError, UserRejectedRequestError} from "@web3-react/injected-connector";
import {Button} from "@mui/material";
import MetamaskIcon from "../../assets/metamask.png";
import useWeb3Auth from "../../hooks/useWeb3Auth";

export const ConnectButton = (props: any) => {
    const { onConnect } = props;

    const { metamaskError } = useWeb3Auth();

    function getErrorMessage(error: Error) {
        if (error instanceof NoEthereumProviderError) {
            return 'Connect to Metamask'
        } else if (error instanceof UnsupportedChainIdError) {
            return "Switch to the Polygon network"
        } else if (
            error instanceof UserRejectedRequestError
        ) {
            return 'Authorize this website to access your Polygon account.'
        } else {
            console.error(error)
            return 'An unknown error occurred. Check the console for more details.'
        }
    }

    return (
        <>
            <Button
                onClick={onConnect}
                variant={"outlined"}
            >
                <img style={{
                    maxWidth: '100%',
                    height: 24,
                    marginRight: 12
                }} src={MetamaskIcon} alt=""/>
                <span>
                    {
                        metamaskError ? (
                            getErrorMessage(metamaskError)
                        ) : (
                            'Connect with Metamask'
                        )
                    }
                </span>
            </Button>
        </>
    )
}
