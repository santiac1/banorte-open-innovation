import SimulatorClient from "@/app/components/simulator_client"
import { createSupabaseServerClient } from "@/lib/supabase"

export default async function SimulatorPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <SimulatorClient sessionToken={session?.access_token ?? ""} />
}
