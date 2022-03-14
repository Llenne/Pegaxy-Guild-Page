import {Box} from "@mui/material";
import {PegaTable, PegaTableData} from "./PegaTable";
import React, {useEffect, useState} from "react";
import {calculateBreedCooldown, calculateRaceCooldown} from "../../../../utils/calculations";
import {useWeb3React} from "@web3-react/core";
import {useFetch} from "use-http";

export const PegaTableContainer = () => {

    const { account: metamaskAccount } = useWeb3React();

    const [pegaList, setPegaList] = useState<Array<PegaTableData> | Array<never>>([]);

    // pegas/owner/user/0x664Fe01207Dc37C84A97A8dCdC28bCc1Da6bEE57?bloodLine=Klin&gender=Male&breedType=Founding&minBreedCount=0&maxBreedCount=7&service=RENT_SERVICE

    const { get: getPegaData, loading: loadingPegaData, error: errorPegaData } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/pegas/owner`, {
        loading: true,
        retries: 5,
        cacheLife: 2 * 60000, // 2 minutes
        persist: true
    });

    const getData = async () => {
        const data = await getPegaData(`/user/${metamaskAccount}`);

        // console.log('data', data);

        if (data && data.length > 0) {
            setPegaList(data.map((pega: PegaTableData) => ({
                ...pega,
                breedCooldownMillis: calculateBreedCooldown(pega),
                raceCooldownMillis: calculateRaceCooldown(pega),
                totalVISEarned: Number(Number((pega.ownerPegaRewards + pega.renterPegaRewards)).toFixed(2)),
                energy: calculateRaceCooldown(pega) !== 0 ? 0 : pega.energy
            })))
        }
    }

    useEffect(() => {
        if (metamaskAccount) {
            getData()
        }
    }, [metamaskAccount])

    return (
        <Box sx={{ p: 2 }}>
            <PegaTable tableData={pegaList} loading={loadingPegaData}/>
        </Box>
    )
}
