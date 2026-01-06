// hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { getUserProfile } from "../firebase/firestore";
import { useAuth } from "./useAuth";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      const data = await getUserProfile(user.uid);
      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  return { profile, loading };
}
