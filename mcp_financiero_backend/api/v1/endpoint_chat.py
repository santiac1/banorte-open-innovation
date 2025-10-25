from fastapi import APIRouter, Depends

from mcp_financiero_backend.core.security import get_current_user_id, supabase_admin
from mcp_financiero_backend.models.schemas import ChatRequest, ChatResponse
from mcp_financiero_backend.services.assistant_service import get_ai_recommendation

router = APIRouter()


@router.post("/ask", response_model=ChatResponse)
async def ask_assistant(
    request: ChatRequest,
    user_id: str = Depends(get_current_user_id),
):
    response = await get_ai_recommendation(user_id, request.query, supabase_admin)
    return response
