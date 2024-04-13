"use server";

import { DogData } from "@/app/types";

const retrieveFilteredOptions = async (query: string, data: DogData[]) => {
  return data.filter((dog) =>
    query.length
      ? dog.attributes.name
          .toLowerCase()
          .substring(0, query.length)
          .includes(query.toLowerCase())
      : false
  );
};

export default retrieveFilteredOptions;
