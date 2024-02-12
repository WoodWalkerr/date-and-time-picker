import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const Datepicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [publishAsap, setPublishAsap] = useState(false);
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const formatDate = (date) => {
    return date
      ? `${date.toLocaleDateString(
          "en-GB"
        )} ${selectedTime} (${selectedTimezone})`
      : "";
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-sm mx-auto p-2 border-2 rounded-md">
      <div className="mt-1 w-[100%] mx-auto relative my-2">
        <h1 className="text-xl my-2 font-bold">
          Date and time<span className="text-red-500 mr-3">*</span>
        </h1>
        <p className="text-sm">
          <input
            type="checkbox"
            id="publishAsap"
            checked={publishAsap}
            onChange={(e) => setPublishAsap(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="publishAsap">Publish ASAP</label>
          <img
            src="/icons8-info.svg"
            alt="Info Icon"
            className="w-4 h-3 inline ml-1"
          />
        </p>
        <label className="block text-start text-sm font-medium text-gray-500 my-3">
          Publication Date :
        </label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            readOnly
            value={formatDate(selectedDate)}
            placeholder="Select release date"
            className="pl-10 pr-10 py-2 w-full text-base border-gray-500 border-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onClick={toggleCalendar}
          />
        </div>
        {showCalendar && (
          <div className="flex flex-col justify-center items-center rounded-md z-10 mt-2 bg-white shadow-lg border">
            <Calendar
              onChange={handleDateSelect}
              value={selectedDate}
              className="border w-full border-gray-300 rounded-md"
              type="date"
              formatShortWeekday={(locale, date) => {
                return date
                  .toLocaleDateString(locale, { weekday: "short" })
                  .charAt(0);
              }}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  return date.getDate() === selectedDate.getDate()
                    ? "bg-red-700 rounded-md"
                    : "";
                }
                return "";
              }}
            />
          </div>
        )}
        {showCalendar && (
          <div className="flex w-full mt-2 justify-center items-center">
            <div className="flex-1 mr-4">
              <div className="mb-4 rounded-md">
                <label className="block text-sm font-medium text-gray-700">
                  Publication Time
                  <select
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {Array.from({ length: 17 }, (_, i) => {
                      const hour = Math.floor(i / 2) + 9;
                      const minutes = i % 2 === 0 ? "00" : "30";
                      const time = `${
                        hour < 10 ? "0" + hour : hour
                      }:${minutes} ${hour < 12 ? "AM" : "PM"}`;
                      return (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4 rounded-md">
                <label className="block text-sm font-medium text-gray-700">
                  Publication Timezone
                  <select
                    value={selectedTimezone}
                    onChange={handleTimezoneChange}
                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Datepicker;
