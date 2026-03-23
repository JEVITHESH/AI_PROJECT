# ============================================================
# LangGraph + Tavily Web Search Agent + Groq LLM
# Graph Visualization Included
# ============================================================

# Install libraries
!pip install -q langgraph langchain-groq langchain-community tavily-python

# Imports
import os
from typing import Annotated, TypedDict

from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage, BaseMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from IPython.display import Image, display

# API Keys
GROQ_API_KEY = "YOUR_GROQ_KEY"
TAVILY_API_KEY = "YOUR_TAVILY_KEY"

os.environ["GROQ_API_KEY"] = GROQ_API_KEY
os.environ["TAVILY_API_KEY"] = TAVILY_API_KEY


# Tool
tavily_tool = TavilySearchResults(max_results=3)
tools = [tavily_tool]


# LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
)

llm_with_tools = llm.bind_tools(tools)


# Graph State
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


# Agent Node
def agent_node(state: AgentState) -> AgentState:
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}


# Tool Node
tool_node = ToolNode(tools)


# Router
def should_continue(state: AgentState):

    last_message = state["messages"][-1]

    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"

    return END


# Build Graph
graph_builder = StateGraph(AgentState)

graph_builder.add_node("agent", agent_node)
graph_builder.add_node("tools", tool_node)

graph_builder.set_entry_point("agent")

graph_builder.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        END: END
    },
)

graph_builder.add_edge("tools", "agent")

graph = graph_builder.compile()


# Show Graph Visualization
display(Image(graph.get_graph().draw_mermaid_png()))


# Ask Function
def ask(question: str):

    print("\n" + "="*60)
    print("Question:", question)
    print("="*60)

    final_state = graph.invoke(
        {"messages": [HumanMessage(content=question)]}
    )

    answer = final_state["messages"][-1].content

    print("\nAnswer:\n", answer)

    return answer


# Test Queries
ask("what is today date")

Output:
============================================================
Question: what is today date
============================================================

Answer:
 The current date is March 14, 2026.
The current date is March 14, 2026.
