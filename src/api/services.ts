import api from "./api";
import type { Pet, Food, Supplies, CustomerOrder } from "../models/entities";

// Pets
export const getPets = async (): Promise<Pet[]> => {
  const { data } = await api.get("/pets");
  return data;
};

// Foods
export const getFoods = async (): Promise<Food[]> => {
  const { data } = await api.get("/foods");
  return data;
};

// Supplies
export const getSupplies = async (): Promise<Supplies[]> => {
  const { data } = await api.get("/supplies");
  return data;
};

// Orders
export const getOrders = async (): Promise<CustomerOrder[]> => {
  const { data } = await api.get("/orders");
  return data;
};
