import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import api from "@/api/axios";
import socket from "@/utils/socket";

export interface Application {
  _id?: string;
  schemeId: string | number;
  schemeName: string;
  applicantName: string;
  appliedDate: string;
  status:
    | "Pending SAG"
    | "Approved by SAG"
    | "Rejected by SAG"
    | "Approved by Finance"
    | "Rejected by Finance"
    | "Money Transferred";
  urnNumber: string;
  urn?: string;
  amount?: string | number;
  sagRemarks?: string;
  financeRemarks?: string;
  paymentRemarks?: string;
  userId: string;
  [key: string]: any;
}

interface ApplicationContextType {
  applications: Application[];
  applyScheme: (data: any) => Promise<void>;
  updateSag: (appId: string, action: "approve" | "reject", remarks: string) => Promise<void>;
  updateFinance: (appId: string, action: "approve" | "reject", remarks: string, amount?: string | number) => Promise<void>;
  completePayment: (appId: string, paymentId?: string) => Promise<void>;
  refreshApplications: (userId: string) => Promise<void>;
  fetchApplications: (userId: string) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const normalizeApp = (app: any): Application => ({
  ...app,
  urnNumber: app.urnNumber || app.urn || "",
  urn: app.urnNumber || app.urn || "",
  status: app.status || "Pending SAG",
  appliedDate: app.appliedDate || app.createdAt || new Date().toISOString(),
});

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  // ✅ Fetch user applications from backend
  const refreshApplications = useCallback(async (userId: string) => {
    if (!userId) return;
    try {
      const resp = await api.get(`/applications/user/${userId}`);
      if (resp.data?.success && Array.isArray(resp.data.data)) {
        setApplications(resp.data.data.map(normalizeApp));
      }
    } catch (err) {
      console.warn("⚠️ refreshApplications failed:", err);
    }
  }, []);

  const fetchApplications = async (userId: string) => {
    return refreshApplications(userId);
  };

  // ✅ Apply for scheme
  const applyScheme = async (formData: FormData) => {
    try {
      const resp = await api.post("/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resp.data?.success) {
        const userId = localStorage.getItem("userId");
        if (userId) await refreshApplications(userId);
        alert(`✅ Application submitted! URN: ${resp.data.urn}`);
      } else {
        alert(resp.data?.message || "Failed to apply.");
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Network error while applying.");
    }
  };

  // ✅ SAG approve/reject
  const updateSag = async (appId: string, action: "approve" | "reject", remarks: string) => {
    try {
      const resp = await api.post("/applications/sag/action", { appId, action, remarks });
      if (resp.data?.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? normalizeApp(resp.data.data) : a))
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "SAG action failed.");
    }
  };

  // ✅ Finance approve/reject
  const updateFinance = async (appId: string, action: "approve" | "reject", remarks: string, amount?: string | number) => {
    try {
      const resp = await api.post("/applications/finance/action", { appId, action, remarks, amount });
      if (resp.data?.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? normalizeApp(resp.data.data) : a))
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Finance action failed.");
    }
  };

  // ✅ Complete payment / money transfer
  const completePayment = async (appId: string, paymentId?: string) => {
    try {
      const resp = await api.post("/applications/finance/transfer", { appId, paymentId });
      if (resp.data?.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? normalizeApp(resp.data.data) : a))
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Payment transfer failed.");
    }
  };

  // ✅ Socket.IO real-time listeners
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) socket.emit("joinRoom", role);

    const onNew = (app: any) => {
      const normalized = normalizeApp(app);
      setApplications((prev) => {
        const exists = prev.some((p) => p._id === normalized._id);
        return exists ? prev : [normalized, ...prev];
      });
    };

    const onUpdate = (updated: any) => {
      const normalized = normalizeApp(updated);
      setApplications((prev) =>
        prev.map((a) => (a._id === normalized._id ? normalized : a))
      );
    };

    socket.on("newApplication", onNew);
    socket.on("sagAction", onUpdate);
    socket.on("financeAction", onUpdate);
    socket.on("moneyTransferred", onUpdate);
    socket.on("applicationUpdated", onUpdate);

    return () => {
      socket.off("newApplication", onNew);
      socket.off("sagAction", onUpdate);
      socket.off("financeAction", onUpdate);
      socket.off("moneyTransferred", onUpdate);
      socket.off("applicationUpdated", onUpdate);
    };
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        applyScheme,
        updateSag,
        updateFinance,
        completePayment,
        refreshApplications,
        fetchApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error("useApplications must be used within ApplicationProvider");
  return context;
};