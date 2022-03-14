import {Box, Button, Container, Grid, Card, TextField, Theme, Typography, useMediaQuery} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import { GuildInvitation } from "../wallet/GuildInvitation";