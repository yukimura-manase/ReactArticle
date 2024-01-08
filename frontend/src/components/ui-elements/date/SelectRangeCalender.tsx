import DatePicker from "react-datepicker";
// react-datepicker 専用の CSS を読み込む: これを読み込まないとカレンダーが正しく表示されない
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const SelectRangeCalender = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [start, end] = dateRange;

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <DatePicker
        selectsRange={true}
        startDate={start}
        endDate={end}
        onChange={(dates: [Date | null, Date | null]) => {
          setDateRange(dates);
        }}
        isClearable={true}
      />
    </div>
  );
};

export default SelectRangeCalender;
