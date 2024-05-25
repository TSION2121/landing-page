import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, IconButton, TextField, Button, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock API function to simulate fetching messages
const fetchMessages = async () => {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { id: 1, content: "I love snacks." },
        { id: 2, content: "I love candy. I love cookies. I love cupcakes." },
        // ... other messages
    ];
};

const MessagePage = () => {
    const { messageId } = useParams();
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessages, setSelectedMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages().then(setMessages);
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Filter messages based on the search term
        const filteredMessages = messages.filter(message =>
            message.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMessages(filteredMessages);
    };

    const handleSelectMessage = (id) => {
        setSelectedMessages(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(msgId => msgId !== id)
                : [...prevSelected, id]
        );
    };

    const handleReply = (id) => {
        // Implement reply logic here...
        const messageToReply = messages.find(message => message.id === id);
        console.log("Replying to message:", messageToReply);
        //maybe set the message content to a state and use it to send a reply
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', color: 'white', padding: 2, width: "100%" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ color: 'white' }}>
                    {`Message ${messageId}`}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ marginRight: 1 }}
                    />
                    <IconButton onClick={handleSearch} sx={{ color: 'white' }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            {messages.map((message) => (
                <Box key={message.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <Checkbox
                        checked={selectedMessages.includes(message.id)}
                        onChange={() => handleSelectMessage(message.id)}
                        sx={{ color: 'white' }}
                    />
                    <Typography sx={{ flexGrow: 1 }}>{message.content}</Typography>
                    <Button onClick={() => handleReply(message.id)} sx={{ color: 'white' }}>
                        Reply
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default MessagePage;
