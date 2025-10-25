from fastapi import FastAPI

from mcp_financiero_backend.api.v1 import endpoint_chat, endpoint_simulate

app = FastAPI(title="Banorte MCP Financiero API", version="1.0.0")

app.include_router(endpoint_chat.router, prefix="/api/v1/chat", tags=["Asistente IA"])
app.include_router(
    endpoint_simulate.router, prefix="/api/v1/simulate", tags=["Simulador What-If"]
)


@app.get("/")
def read_root():
    return {"status": "MCP Financiero está activo"}
