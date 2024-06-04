import { createClient } from "@supabase/supabase-js";

class SupabaseClientUtil {
    constructor() {
        console.log("SupabaseClientUtil constructor called");
        console.log(import.meta.env.VITE_SUPABASE_URL);
        if (SupabaseClientUtil.instance == null) {
            this.supabaseClient = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
            SupabaseClientUtil.instance = this;
        }

        return SupabaseClientUtil.instance;
    }
}

const instance = new SupabaseClientUtil();

export default instance;