from fastapi import FastAPI
from routers.authentication import router  
from routers.user import router as user_router
from routers.admin import router as admin_router
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#give the permission to fetch the data from UI
app.add_middleware(
    CORSMiddleware,
    allow_origins = "http://localhost:3000",
    allow_credentials = True,
    allow_methods =  ["*"],
    allow_headers = ["*"]    
)

# Create and migrate a table
models.Base.metadata.create_all(bind=engine)

# Routers for the App
app.include_router(router)
app.include_router(user_router)
app.include_router(admin_router)



