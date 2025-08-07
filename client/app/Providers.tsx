import { Provider } from "react-redux";
import { store } from "../redux/store";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ilmo LMS",
  description: "A learning management system",
};
interface ProviderProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
