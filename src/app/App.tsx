import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { DeliveryProvider } from "./context/DeliveryContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <DeliveryProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" theme="dark" />
      </DeliveryProvider>
    </LanguageProvider>
  );
}
