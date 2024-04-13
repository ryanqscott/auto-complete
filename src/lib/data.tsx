"use server";
import { DogData } from "@/app/types";
import axios from "axios";

let dogData: DogData[] = [];

export const loadData = async () => {
  if (dogData.length) return dogData;
  let totalDogs: DogData[] = [];
  for (let i = 1; i <= 10; i++) {
    let url = `https://dogapi.dog/api/v2/breeds?page[number]=${i}`;
    await axios.get(url).then((response) => {
      totalDogs = [...totalDogs, ...response.data.data];
    });
  }
  dogData = totalDogs;
  return totalDogs;
};

export const getData = () => {
  return dogData;
};
