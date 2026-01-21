export default function HolidayList({ holidays }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  };

  if (!holidays) return null;
  const publicHolidays = holidays.filter((el) => el.type === "Public");
  console.log("publicHolidays:", publicHolidays);
  const holidaysList = publicHolidays.map((holiday) => {
    const holidayEn = holiday.name.find((el) => el.language == "EN");
    return {
      label: holidayEn ? holidayEn.text : holiday.name[0].text,
      holidayId: holiday.id,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
    };
  });
  return (
    <ul>
      {holidaysList.map((holiday) => (
        <li key={holiday.holidayId}>
          {formatDate(holiday.startDate)}-{holiday.label}
        </li>
      ))}
    </ul>
  );
}
