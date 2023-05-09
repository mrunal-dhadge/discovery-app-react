import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: string | undefined;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  about?: string;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [
    
  ],
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(
        (c) => c.id === action.payload.id
      );
      state.contacts[index] = action.payload;
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload);
      state.contacts.splice(index, 1);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;