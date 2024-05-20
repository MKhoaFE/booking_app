import React, { useState } from 'react';

function DateInputForm() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript tính từ 0
      const year = String(date.getFullYear()).slice(-2);

      setSelectedDate(`${day}-${month}-${year}`);
    } else {
      setSelectedDate('');
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="dateInput">Chọn ngày:</label>
        <input type="date" id="dateInput" onChange={handleDateChange} />
        <input type="text" value={selectedDate} disabled />
      </form>
    </div>
  );
}

export default DateInputForm;