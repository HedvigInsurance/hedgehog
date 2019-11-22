import {
  Button as MuiButton,
  List as MuiList,
  ListItem as MuiListItem,
  TextField as MuiTextField,
  Typography as MuiTypography,
  withStyles,
} from '@material-ui/core'
import { format, parseISO } from 'date-fns'

import { Field, FieldProps, Form, Formik } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'

import { Paper } from '../../../shared/Paper'

const ADD_CLAIM_NOTE_QUERY = gql`
  query AddClaimQuery($id: ID!) {
    claim(id: $id) {
      notes {
        text
        date
      }
      events {
        text
        date
      }
    }
  }
`

const ADD_CLAIM_NOTE_MUTATION = gql`
  mutation AddClaimNote($id: ID!, $note: ClaimNoteInput!) {
    addClaimNote(id: $id, note: $note) {
      notes {
        text
        date
      }
      events {
        text
        date
      }
    }
  }
`

interface Note {
  text: string
  date: string
}

interface Props {
  notes: Note[]
  claimId: string
}

const TextArea: React.SFC<FieldProps<HTMLTextAreaElement>> = ({
  field: { onChange, onBlur, name, value },
}) => (
  <MuiTextField
    onChange={onChange}
    onBlur={onBlur}
    name={name}
    value={value || ''}
    multiline
    fullWidth
    placeholder="Type note here..."
  />
)

const sortNotesByDate = (notes: Note[]) =>
  [...notes].sort((noteA, noteB) => {
    return new Date(noteB.date).getTime() - new Date(noteA.date).getTime()
  })

const ListItem = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  },
})(MuiListItem)

const ClaimNote = withStyles({
  root: {
    fontSize: '1rem',
    maxWidth: '80%',
  },
})(MuiTypography)

const ClaimNoteDate = withStyles({
  root: {
    fontSize: '0.875rem',
  },
})(MuiTypography)

const SubmitButton = withStyles({
  root: {
    marginTop: '1rem',
  },
})(MuiButton)

const ClaimNotes: React.SFC<Props> = ({ notes, claimId }) => (
  <Mutation
    mutation={ADD_CLAIM_NOTE_MUTATION}
    update={(cache, { data: updateData }) => {
      cache.writeQuery({
        query: ADD_CLAIM_NOTE_QUERY,
        variables: { id: claimId },
        data: {
          claim: {
            notes: updateData.addClaimNote.notes,
            events: updateData.addClaimNote.events,
            __typename: updateData.addClaimNote.__typename,
          },
        },
      })
    }}
  >
    {(addClaimNote) => (
      <Paper>
        <h3>Notes</h3>
        <MuiList>
          {sortNotesByDate(notes).map((note) => (
            <ListItem key={note.date}>
              <ClaimNote component="p">{note.text}</ClaimNote>
              <ClaimNoteDate component="span">
                {format(parseISO(note.date), 'yyyy-MM-dd hh:mm:ss')}
              </ClaimNoteDate>
            </ListItem>
          ))}
        </MuiList>
        <Formik<{ text: string }>
          initialValues={{ text: '' }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addClaimNote({
              variables: { id: claimId, note: { text: values.text } },
            })
            setSubmitting(false)
            resetForm()
          }}
        >
          {({ isValid }) => (
            <Form>
              <Field
                component={TextArea}
                placeholder="Type note content here"
                name="text"
              />
              <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Add note
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Paper>
    )}
  </Mutation>
)

export { ClaimNotes }
