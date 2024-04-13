"use client";
import retrieveFilteredOptions from "@/lib/getOptions";
import React, { useEffect, useState } from "react";
import { matchingPrefixIndex } from "@/lib/utility";
import { loadData } from "@/lib/data";
import { DogData } from "./types";

const Autocomplete = () => {
  const [options, setOptions] = useState<DogData[]>([]);
  const [totalData, setTotalData] = useState<DogData[]>([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    loadData().then((response) => {
      setTotalData(response);
    });
  }, []);
  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
    }
  }, [inputValue]);
  useEffect(() => {
    // using setTimeout to debounce
    const fetchData = setTimeout(async () => {
      try {
        const filteredOptions = await retrieveFilteredOptions(
          inputValue,
          totalData
        );
        setOptions(filteredOptions);
      } catch (error) {
        console.error("Error encountered fetching filtered options: ", error);
      }
    }, 300);

    return () => clearTimeout(fetchData);
  }, [inputValue, totalData]);
  return (
    <div>
      <input
        className="text-black text-opacity-75"
        placeholder="enter"
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
      />
      {inputValue &&
        options.map((value) => {
          // We split each list item across the highlighted part and non-highlighted part in order to use different CSS for highlighting
          return (
            <li
              className="max-w-xl selection:bg-purple-600 display:inline list-none"
              key={value.id}
              onClick={() => setInputValue(value.attributes.name)}
            >
              <span className="bg-green-600 display:inline">
                {value.attributes.name.substring(
                  0,
                  matchingPrefixIndex(value.attributes.name, inputValue)
                )}
              </span>
              <span className="display:inline">
                {value.attributes.name.substring(
                  matchingPrefixIndex(value.attributes.name, inputValue)
                )}
              </span>
            </li>
          );
        })}
    </div>
  );
};
export default Autocomplete;
