import React, { useState } from 'react';

const TimezonePicker = ({ onTimezoneChange }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Common timezones list
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Dubai',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];

  const handleChange = (e) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    if (onTimezoneChange) {
      onTimezoneChange(newTimezone);
    }
  };

  // Format timezone for display
  const formatTimezone = (timezone) => {
    try {
      const date = new Date();
      const timeString = date.toLocaleTimeString('en-US', { timeZone: timezone });
      const offset = date.toLocaleString('en-US', { timeZone: timezone, timeZoneName: 'short' }).split(' ').pop();
      return `${timezone.replace('_', ' ')} (${offset} - ${timeString})`;
    } catch (error) {
      return timezone;
    }
  };

  return (
    <div className="max-w-md">
      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
        Select Timezone
      </label>
      <select
        id="timezone"
        value={selectedTimezone}
        onChange={handleChange}
        className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
      >
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {formatTimezone(timezone)}
          </option>
        ))}
      </select>
      <div className="mt-2 text-sm text-gray-500">
        Current time in {selectedTimezone.replace('_', ' ')}:{' '}
        {new Date().toLocaleTimeString('en-US', { timeZone: selectedTimezone })}
      </div>
    </div>
  );
};

export default TimezonePicker;