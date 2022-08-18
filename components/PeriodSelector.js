import periods from "../utils/periods";

function PeriodSelector({ handlePeriod }) {
  return (
    <div className="flex items-center justify-center mt-4 gap-3 scroll-smooth">
      <p>Top Tracks period:</p>
      <select onChange={handlePeriod} className="text-slate-900 rounded-md">
        {periods.map((period, index) => (
          <option key={index} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PeriodSelector;
