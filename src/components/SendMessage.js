import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// Mock function to simulate fetching data from an API
const fetchRecipients = async () => {
    // This should be replaced with an actual API call
    return ['Advisors', 'Students','Coordinators' ,'All'];
};

const ChatInterface = () => {
    const { recipientId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState(recipientId || 'Default Recipient');
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        // Fetch recipients when the component mounts
        const getRecipients = async () => {
            const fetchedRecipients = await fetchRecipients();
            setRecipients(fetchedRecipients);
            // Set the recipient to the first one from the fetched list or keep the current one
            setRecipient(recipientId || fetchedRecipients[0]);
        };
        getRecipients();
    }, [recipientId]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    };

    const handleSendClick = () => {
        console.log(`Message sent to ${recipient}: ${message}`);
        setMessage('');
    };

    const handleAddRecipient = () => {
        // Logic to add a new recipient
        const newRecipient = `New Recipient ${recipients.length + 1}`;
        setRecipients([...recipients, newRecipient]);
        setRecipient(newRecipient);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                backgroundColor: 'lightblue',
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
                <IconButton onClick={handleAddRecipient} sx={{ color: 'white' }}>
                    <GroupAddIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    marginBottom: 2,
                    backgroundColor: '#1A2027',
                    borderRadius: '4px',
                    padding: 2,
                }}
            >
                {/* Messages will be displayed here */}
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
