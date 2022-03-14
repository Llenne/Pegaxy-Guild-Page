import React, { useEffect } from 'react';
import './App.scss';
import {PageLayout} from './components/layout/main/PageLayout';
import {Route, Routes} from "react-router";
import {Wallet} from "./pages/Profile/Wallet/wallet";
import {Guild} from "./pages/Profile/Guild/guild";
import {VerifiedPage} from "./pages/Personal/Verified/VerifiedPage";
import {ApplicationPage} from "./pages/Personal/Application/ApplicationPage";
import {LeaderboardPage} from "./pages/Metaverse/Leaderboard/LeaderboardPage";
import {NoMatchPage} from "./pages/Errors/NoMatchPage";
import usePageTracking from './hooks/usePageTracking';
import {usePreferencesDispatchContext} from "./contexts/preferences";
import {PreferencesActionType} from "./contexts/preferences/actions";

function App() {
    usePageTracking()

    const preferencesDispatch = usePreferencesDispatchContext();

    useEffect(() => {
        preferencesDispatch({ type: PreferencesActionType.InitPreferences })
    }, [])

    return (
        <div className="app-wrapper">
            <PageLayout>
                <Routes>
                    <Route index element={<Wallet/>}/>
                    <Route path="/profile/wallet" element={<Wallet/>}/>
                    <Route path="/profile/guild" element={<Guild/>}/>
                    <Route path="/personal/verified" element={<VerifiedPage/>}/>
                    <Route path="/leaderboard" element={<LeaderboardPage/>}/>
                    <Route path="/personal/application" element={<ApplicationPage/>}/>
                    <Route path="*" element={<NoMatchPage/>}/>
                </Routes>
            </PageLayout>
        </div>
    );
}

export default App;
