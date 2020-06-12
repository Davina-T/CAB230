import React from "react"
import DatePicker from "reactstrap-date-picker"

function DateFromPicker({ date, setDate }) {
  return (
    <div>
      <DatePicker
        className="datepicker"
        value={date}
        onChange={(v, f) => {
          setDate(v, f)
        }}
      />
    </div>
  )
}

export default DateFromPicker
