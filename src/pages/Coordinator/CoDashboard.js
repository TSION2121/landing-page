import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import GroupsLayout from "../Groups/GroupsLayout";
import GroupLayoutBox from "../Groups/GroupLayoutBox";
import TeamSeating from "../Groups/TeamSeating";
import GroupSeating from "../Groups/GroupSeating";
import {Typography} from "@mui/material";

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'goldenrod',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    color:'white',
}));

const MessageMenu = [
    {
        id: 'MessageLabel',
        label: ' Message',
        children: [

    {
        id: 'send',
        label: 'Send Message',
        children: [
            { id: 'Advisors-only', label: 'Send to Advisors' },
            { id: 'Students-only', label: 'Send to Students' },
            { id: 'All', label: 'Send to All Groups' },
            { id: 'specific-groups', label: 'Send to Group select' },


        ],
    },
    {
        id: 'read',
        label: 'Read Message',
        children: [
            { id: 'Read-Advisors-only', label: 'Read to Advisors' },
            { id: 'Read-Students-only', label: 'Read to Students' },
            { id: 'Read-specific-groups', label: 'Read to Group select' },
            { id: 'Read-specific-coordinator', label: 'Read from Coordinator select' },


        ],
    },
] }
];
const CalendarMenu = [
    {
        id: 'CalendarLabel',
        label: ' Calendar',
        children: [

            {
                id: 'add',
                label: 'Add Calendar',
                children: [
                    { id: 'To-Coordinators-only', label: 'To Coordinators' },
                    { id: 'To-Advisors-only', label: 'To Advisors' },
                    { id: 'To-All-only', label: 'To All' },



                ],
            },
            {
                id: 'view',
                label: 'View Calendar',

            },
            {
                id: 'Share',
                label: 'Share Calendar',
                children: [
                    { id: 'Share-Advisors-only', label: 'Share to Advisors' },
                    { id: 'Share-Coordinators-only', label: 'Share to Coordinators' },
                    { id: 'Share-All-only', label: 'Share to All' },
                ],
            },

        ] }
];

const getAllItemsWithChildrenItemIds = () => {
    const itemIds = [];
    const registerItemId = (item) => {
        if (item.children?.length) {//check for children items
            itemIds.push(item.id); // add to the created array
            item.children.forEach(registerItemId); //looping
        }
    };

    MessageMenu.forEach(registerItemId); //insert the arrays into the logic of th function

    return itemIds;
};

const CoDashboard = () => {
    const [expandedItems, setExpandedItems] = React.useState([]);

    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItems(itemIds);
    };

    const handleExpandClick = () => {
        setExpandedItems((oldExpanded) =>
            oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : [],
        );
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                        <Item>
                            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                                <Box sx={{ mb: 1 }}>
                                    {/*<Button>Message</Button>*/}
                                    <Button onClick={handleExpandClick}>
                                        {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
                                    </Button>
                                </Box>
                                <Box sx={{  flexGrow: 1 }}>
                                    <RichTreeView
                                        items={MessageMenu}
                                        expandedItems={expandedItems}
                                        onExpandedItemsChange={handleExpandedItemsChange}
                                    />
                                </Box>
                            </Box>

                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                                <Box sx={{ mb: 1 }}>
                                    {/*<Button>Message</Button>*/}
                                    <Button onClick={handleExpandClick}>
                                        {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
                                    </Button>
                                </Box>
                                <Box sx={{  flexGrow: 1 }}>
                                    <RichTreeView
                                        items={CalendarMenu}
                                        expandedItems={expandedItems}
                                        onExpandedItemsChange={handleExpandedItemsChange}
                                    />
                                </Box>
                            </Box>

                        </Item>
                    </Grid>
                </Grid>
            </Box>

            {/*<GroupsLayout />*/}
            <Typography variant="h5" gutterBottom color='goldenrod' bgcolor='#000000' margin=" 15px 0">
               List of  Groups</Typography>
            <GroupSeating />
        </>
    );

}
export default CoDashboard;