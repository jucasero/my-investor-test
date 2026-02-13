import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../services/portfolioService";
import { Portfolio } from "../types/portfolio";

export const usePortfolio = () => {
  return useQuery<{ data: Portfolio[] }, Error>({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });
};
