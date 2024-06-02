import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from "axios";
import {Chip} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const ChatInterface = () => {
    const { recipientId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('You');
    const [recipient, setRecipient] = useState(recipientId || 'All');
    const [recipients, setRecipients] = useState(['Advisors', 'Students', 'Coordinators', 'All']);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get('http://localhost:3002/messages');
            return response.data;
        };

        const getMessages = async () => {
            const fetchedMessages = await fetchMessages();
            setMessages(fetchedMessages.filter(message => message.role === recipient || recipient === 'All'));
        };
        getMessages();
    }, [recipient]);

    const sendMessage = async (message) => {
        const response = await axios.post('http://localhost:3002/messages', message);
        return response.data;
    };

    const handleSendClick = async () => {
        const newMessage = { content: message, sender: sender, role: recipient };
        const sentMessage = await sendMessage(newMessage);
        setMessages([...messages, sentMessage]);
        console.log(`Message sent to ${recipient}: ${message}`);
        setMessage('');
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleAddRecipient = () => {
        const newRecipient = `New Recipient ${recipients.length + 1}`;
        setRecipients([...recipients, newRecipient]);
        setRecipient(newRecipient);
    };

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '70vh',
                backgroundColor: 'cornflowerblue',
                color: 'white',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 2,
                }}
            >
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ color: 'black' }}>
                    {recipient}
                </Typography>
                {/*<IconButton onClick={handleAddRecipient} sx={{ color: 'white' }}>*/}
                {/*    <GroupAddIcon />*/}
                {/*</IconButton>*/}
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    marginBottom: 2,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    padding: 2,
                }}
            >

                {messages.map((message, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: message.sender === sender ? 'flex-end' : 'flex-start', marginBottom: 1 }}>
                        <Chip
                            avatar={<Avatar>{message.sender ? message.sender.charAt(0) : ''}</Avatar>}
                            label={`${message.sender} to ${message.role}: ${message.content}`}
                            color={message.sender === sender ? 'primary' : 'default'}
                        />
                    </Box>
                ))}


            </Box>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSendClick();
                }}
            >
                <Select
                    value={recipient}
                    onChange={handleRecipientChange}
                    sx={{ color: "white", marginRight: 2, backgroundColor: '#2D3748' }}
                >
                    {recipients.map((recipientOption) => (
                        <MenuItem key={recipientOption} value={recipientOption}>{recipientOption}</MenuItem>
                    ))}
                </Select>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={handleInputChange}
                    sx={{
                        marginRight: 2,
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4A5568',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#A0AEC0',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#A0AEC0',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#3182CE',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2B6CB0',
                        },
                    }}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatInterface;
