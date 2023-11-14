import os
from fastapi import FastAPI
from determine_employee import get_employee

app = FastAPI()

# Use the PORT environment variable with a default value of 10000
port = int(os.environ.get("PORT", 10000))

@app.get("/{task}")
async def say_hello(task: str):
    email = get_employee(task)
    return {f"Task assigned to :{email}"}


if __name__ == "__main__":
    import uvicorn

    # Use uvicorn.run directly without if __name__ condition for better compatibility
    uvicorn.run(app, host="0.0.0.0", port=port)
