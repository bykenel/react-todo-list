import * as Icons from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTodoLists } from '../hooks/useTodoLists.js';

export function NewListDialog({ dialogState }) {
  const [state, setState] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [icon, setIcon] = useState('');
  const { newList } = useTodoLists();

  const [filteredIcons, setFilteredIcons] = useState(Object.entries(Icons));

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))
        .filter(([name]) => (iconSearch ? name.includes(iconSearch) : true))
        .slice(0, 9)
    );
  }, [iconSearch]);

  return (
    <Dialog open={dialogState.isOpen} onClose={dialogState.close}>
      <DialogTitle>Create New List</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a new list</DialogContentText>
        <TextField
          onChange={event => {
            setState(event.target.value);
          }}
          value={state}
          autoFocus
          margin="dense"
          id="name"
          label="New List"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={event => {
            setIconSearch(event.target.value);
          }}
          value={iconSearch}
          autoFocus
          margin="dense"
          id="name"
          label="Icon Search"
          type="text"
          fullWidth
          variant="standard"
        />
        <Card
          variant="outlined"
          sx={{ mt: 1, p: 1, display: 'flex', justifyContent: 'center' }}
        >
          {filteredIcons.map(([name, Icon]) => (
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                width: 40,
                mx: 1,
              }}
              key={name}
            >
              <ToggleButton
                value={name}
                selected={name === icon}
                onClick={() => setIcon(name)}
              >
                <Icon />
              </ToggleButton>
              <Typography
                variant="caption"
                align="center"
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogState.close}>Cancel</Button>
        <Button
          onClick={() => {
            void newList(state, icon);
            dialogState.close();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
