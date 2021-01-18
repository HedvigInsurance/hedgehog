import enGB from 'date-fns/locale/en-GB'
import { FieldProps } from 'formik'
import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'react-emotion'
import { Input } from 'semantic-ui-react'
registerLocale('enGB', enGB)

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
  showTimePicker?: boolean
  maxDate?: Date
  minDate?: Date
  fullWidth?: boolean
  placeholder?: string
  disabled?: boolean
  name?: string
}

const StyledInput = styled(Input)<{ fullWidth?: boolean }>(
  ({ fullWidth = false }) => {
    return {
      '&&': {
        width: fullWidth ? '100%' : '150px',
      },
      '&& input:hover': {
        cursor: 'pointer !important',
      },
    }
  },
)

export const DateTimePicker: React.FunctionComponent<DatePickerProps> = ({
  date,
  setDate,
  maxDate,
  minDate,
  showTimePicker = false,
  fullWidth = false,
  placeholder,
  disabled = false,
  name,
}) => {
  return (
    <DatePicker
      autoComplete="off"
      locale={'enGB'}
      selected={date}
      disabled={disabled}
      placeholderText={placeholder}
      onChange={(newDate) => {
        setDate(newDate)
      }}
      showTimeSelect={showTimePicker}
      maxDate={maxDate}
      minDate={minDate}
      name={name}
      customInput={
        <StyledInput
          type="text"
          fullWidth={fullWidth}
          icon={showTimePicker ? 'clock outline' : 'calendar alternate outline'}
          iconPosition={'left'}
          maxLength={10}
        />
      }
      dateFormat={'yyyy-MM-dd'}
    />
  )
}

export const FormikDateTimePicker: React.FC<FieldProps & DatePickerProps> = ({
  field: { value, name },
  form: { setFieldValue },
  ...props
}) => {
  return (
    <DateTimePicker
      {...props}
      date={value}
      setDate={(newValue: Date) => setFieldValue(name, newValue)}
      name={name}
    />
  )
}
