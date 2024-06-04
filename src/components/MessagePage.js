import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Checkbox,
    Select,
    MenuItem,
    CircularProgress,
    Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import Avatar from "@mui/material/Avatar";

const fetchMessages = async () => {
    try {
        const response = await axios.get('http://localhost:3002/messages');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
};

const MessagePage = () => {
    const { messageId } = useParams();
    const [messages, setMessages] = useState([]);
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchMessages().then(data => {
            setMessages(data);
            setIsLoading(false);
        });
    }, []);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSelectMessage = (id) => {
        setSelectedMessages(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(msgId => msgId !== id)
                : [...prevSelected, id]
        );
    };

    const handleReplyChange = (event) => {
        setReplyMessage(event.target.value);
    };

    const handleSendReply = async () => {
        setIsLoading(true);
        // Implement reply logic here...
        const updatedMessages = [...messages];
        for (const id of selectedMessages) {
            try {
                const response = await axios.post('http://localhost:3002/messages', { messageId: id, content: replyMessage });
                const messageIndex = updatedMessages.findIndex(message => message.id === id);
                if (messageIndex !== -1) {
                    updatedMessages[messageIndex].replyMessage = response.data.content;
                }
            } catch (error) {
                console.error(`Failed to send reply to message ${id}:`, error);
            }
        }
        setMessages(updatedMessages);
        setReplyMessage('');
        setSelectedMessages([]);
        setIsLoading(false);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'cornflowerblue', color: 'white', padding: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ color: 'white' }}>
                    {`Message ${messageId}`}
                </Typography>
                <Select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    sx={{ marginRight: 1, color: 'white' }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Advisors">Advisors</MenuItem>
                    <MenuItem value="Students">Students</MenuItem>
                    <MenuItem value="Coordinators">Coordinators</MenuItem>
                </Select>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: 'cornflowerblue', color: 'white', padding: 2 }}>
                {messages.filter(message => message.role === selectedRole || selectedRole === 'All').map((message) => (
                    <Box key={message.id} sx={{ display: 'flex',justifyContent: message.sender ==='You' ?'flex-end'  : 'flex-start',
                        marginBottom: 1,  }}>
                        <Checkbox
                            checked={selectedMessages.includes(message.id)}
                            onChange={() => handleSelectMessage(message.id)}
                            sx={{ color: 'white', padding: '0 8px' }}
                        />
                        <Chip
                            avatar={<Avatar>{message.sender ? message.sender.charAt(0) : ''}</Avatar>}
                            label={`${message.sender}: ${message.content}`}
                            color={message.sender === "You" ? 'primary' : 'default'}
                        />
                        {/*<Typography sx={{ flexGrow: 1 }}>{`${message.sender}: ${message.content}`}</Typography>*/}
                        {message.replyMessage && <Typography sx={{ flexGrow: 1, marginLeft: 2 }}>{`Reply: ${message.replyMessage}`}</Typography>}
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'cornflowerblue', padding: 2 }}>
                <TextField
                    placeholder="Type your reply..."
                    value={replyMessage}
                    onChange={handleReplyChange}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
                <Button onClick={handleSendReply} sx={{ color: 'white' }}>
                    Send Reply
                </Button>
            </Box>
        </Box>
    );
};

export default MessagePage;
