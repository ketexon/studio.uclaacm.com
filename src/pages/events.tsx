import * as React from "react";
import { useState } from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

import DateTimePicker from 'react-datetime-picker';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';

type EventProps = {};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
    shadowContainer: {
        boxShadow: `0px 6px 6px -3px rgba(0,0,0,0.3),
                  0px 2px 4px -1px rgba(0,0,0,0.1)`,
    },
}));

function getLastSunday(curDate: Date) {
    let year = curDate.getFullYear();
    let month = curDate.getMonth();
    let date = curDate.getDate();
    let day = curDate.getDay();
    return new Date(year, month, date - day);
}

function getCurMonth() {
    let curDate = new Date();
    curDate.setMonth(curDate.getMonth())
    return curDate.toLocaleString('en-US', { month: 'long' })
}

function getCurYear() {
    let curDate = new Date();
    let year = curDate.getFullYear();
    return year;
}

function getFirstDayOfMonth(curDate: Date): Date {
    return new Date(curDate.getFullYear(), curDate.getMonth());
}

export default function Events({ }: EventProps) {
    const classes = useStyles();
    //return <div>Hello</div>;
    /*React.useEffect(() => { console.log("hi") })
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");


    const session = useSession(); //tokens, when session exists, we have a user
    const supabase = useSupabaseClient(); //talk to supabase
    const { isLoading } = useSessionContext();

    if (isLoading) {
        return <></>
    }

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }
        });
        if (error) {
            alert("Error logging in to Google provider with Supabase");
            console.log(error);
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function createCalendarEvent() {
        console.log("Created calendar event");
        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': start.toISOString(), // Date.toISOString() ->
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(), // Date.toISOString() ->
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token //Access token for google
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            alert("Event created, check your Google Calendar");
        })
    }

    console.log(session);
    console.log(start);
    console.log(end);
    console.log(eventName);
    console.log(eventDescription);*/

    const numRows = 6;
    const numCols = 7;

    console.log(getLastSunday(getFirstDayOfMonth(new Date())))
    /*const renderCell = (rowIndex, colIndex) => {
        let lastSunDate = getLastSunday(getFirstDayOfMonth(new Date()));
        let currDate = new Date(lastSunDate.getFullYear(), lastSunDate.getMonth(),
            lastSunDate.getDate() + 7 * rowIndex + colIndex);
        return <div>{currDate.getDate()}</div>;
    };*/

    const renderCell = (index) => {
        let lastSunDate = getLastSunday(getFirstDayOfMonth(new Date()));
        let currDate = new Date(lastSunDate.getFullYear(), lastSunDate.getMonth(),
            lastSunDate.getDate() + index);
        return <div>{currDate.getDate()}</div>;
    };
    return (
        <Container maxWidth="lg">
            <Typography variant="h1">Our events! </Typography>

            {/*<Grid container spacing={1}>
                {Array.from({ length: numRows }, (_, rowIndex) => (
                    <Grid key={rowIndex} container xs={12} spacing={1}>
                {
                    Array.from({ length: numCols }, (_, colIndex) => (
                        <Grid key={colIndex} xs={1.5}>
                            <Item>{renderCell(rowIndex, colIndex)}</Item>
                        </Grid>
                    ))
                }
                    </Grid>
            </Grid > */}
            <Container className={classes.shadowContainer}>
                <Typography variant="h2" style={{ textAlign: 'center' }}>{getCurMonth() + " " + getCurYear()}</Typography>
                <Divider variant="middle" />
                <Grid container spacing={1} columns={14}>
                    <Grid xs={2} >
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Sun</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Mon</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Tue</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Wed</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Thu</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Fri</Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item sx={{
                            color: '#ffffff',
                            bgcolor: '#ed3266',
                        }}>Sat</Item>
                    </Grid>
                </Grid >
                <Grid container spacing={1} columns={14}>
                    {Array.from({ length: numRows * numCols }).map((_, i) => (
                        <Grid key={i} xs={2}>
                            <Item elevation={0}
                                sx={{
                                    //color: 'success.main',
                                }}>{renderCell(i)}</Item>
                        </Grid>
                    ))}
                </Grid >

                {/* <div style={{ width: "400px", margin: "30px auto" }}>
                {session ?
                    <>
                        <h2>Hey there {session.user.email}</h2>
                        <p>Start of your event</p>
                        <DateTimePicker onChange={setStart} value={start} />
                        <p>End of your event</p>
                        <DateTimePicker onChange={setEnd} value={end} />
                        <p>Event name</p>
                        <input type="text" onChange={(e) => setEventName(e.target.value)} />
                        <p>Event description</p>
                        <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
                        <hr />
                        <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
                        <p></p>
                        <button onClick={() => signOut()}>Sign Out</button>
                    </>
                    :
                    <>
                        <button onClick={() => googleSignIn()}>Sign In With Google</button>
                    </>
                }
            </div> */}
            </Container>
        </Container >
    );
}
