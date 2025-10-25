from supabase import Client

from mcp_financiero_backend.models.schemas import ChatResponse


async def get_ai_recommendation(user_id: str, query: str, db_client: Client) -> ChatResponse:
    transactions = (
        db_client.table("transactions")
        .select("*")
        .eq("user_id", user_id)
        .order("date", desc=True)
        .limit(100)
        .execute()
    )
    goals = (
        db_client.table("financial_goals")
        .select("*")
        .eq("user_id", user_id)
        .execute()
    )

    context = f"""
    Datos de transacciones del usuario: {transactions.data}
    Metas financieras del usuario: {goals.data}
    """

    ai_answer = (
        f"Respuesta simulada de IA para '{query}'. "
        f"El usuario tiene {len(goals.data or [])} metas registradas."
    )

    return ChatResponse(answer=ai_answer)
