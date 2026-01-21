import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import HolidayList from "./HolidayList";

export default function Country() {
  const [selectCountryCode, setSelectCountryCode] = useState("NL"); //useState() returns an array, not an object.

  function handleChange(e) {
    setSelectCountryCode(e.target.value);
  }

  // For countries data:
  const {
    data: countries,
    isLoading: countriesLoading,
    error: countriesError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("https://openholidaysapi.org/Countries");
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }
      return res.json();
    },
  });

  // For holidays data
  const currentYear = new Date().getFullYear();
  const validFrom = `${currentYear}-01-01`;
  const validTo = `${currentYear}-12-31`;

  const {
    data: holidays,
    isLoading: holidaysLoading,
    error: holidaysError,
  } = useQuery({
    queryKey: ["holidays", selectCountryCode],
    queryFn: async () => {
      const res = await fetch(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectCountryCode}&validFrom=${validFrom}&validTo=${validTo}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch holidays");
      }
      return res.json();
    },
    enabled: !!selectCountryCode, // only fetch when country is selected
  });

  if (countriesLoading) return <div>Loading countries...</div>;
  if (countriesError) return <div>Error: {countriesError.message}</div>;

  // Display countries
  const names = countries.map((country) => {
    const enName = country.name.find((el) => el.language === "EN");
    return {
      label: enName ? enName.text : country.name[0].text,
      countryCode: country.isoCode,
    };
  });

  return (
    <div>
      <select value={selectCountryCode} onChange={handleChange}>
        {names.map((name) => (
          <option value={name.countryCode} key={name.countryCode}>
            {name.label}
          </option>
        ))}
      </select>
      {holidaysLoading && <p>Loading holidays...</p>}
      {holidaysError && <p>Failed loading holidays</p>}
      <HolidayList holidays={holidays} />
    </div>
  );
}

// 2. fetch country data
// 2.1 how to use react query to fetch  country data:wrapper the app with QueryClientProvider,useQuery
// 2.2 find endpoint for country data
// 2.3. Get country name (need a helper function? )
// 2.4. Display country names in a dropdown select element

// 3.1. set netherlands as default country
// 3.2. set netherlands as initial value in the select element(state)
// 3.3. fix <select> properly:
// 3.3.1 all options come from fetched country data
// 3.3.2 Select element value is controlled by state
// 3.3.3 each option has a stable key: country iso code
// 3.3.4 what determines each country is being selected: userEvent->isoCode
// 3.3.5 onChange event to update state when user selects a different country
// 3.4. test the select element: select value should match option selected by user

// 4. display holidays based on selected country(isoCode), and current year
// 4.1 find endpoint for holiday data
// 4.2 Show countries immediately, then load holidays in the background
// 4.3 create a new component for holidayList (accepts holidays as prop, displays holiday name and date in a list)
