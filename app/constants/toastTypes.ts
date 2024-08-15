export type ToastContextType = {
  showToast: (message: string, severity: "success" | "error") => void;
};
