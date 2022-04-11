from pydantic import BaseModel
from typing import Optional

from sqlalchemy import Integer, false


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    video_link: Optional[str]=""
    brushing_status: Optional[bool]= False
    gargaling_status: Optional[bool]= False
    validation_status: Optional[bool]= True


class User(UserBase):
    class Config():
          orm_mode = True 

# For user response model
class ShowUser(BaseModel):
    id: int 
    first_name: str
    last_name: str
    email: str
    phone: str
    video_link: Optional[str]=""
    brushing_status: Optional[bool]= False
    gargaling_status: Optional[bool]= False
    validation_status: Optional[bool]= True

    class Config():
        orm_mode = True 

class Admin(BaseModel):
    name: str
    password: str
    email: str
    class Config():
          orm_mode = True 
          
# For admin response model
class ShowAdmin(BaseModel):
      id: int 
      name: str
      email: str
      password: str

      class Config():
          orm_mode = True 
          
class AuthentedAdimn(BaseModel):
    name: str
    email: str
    class Config():
          orm_mode = True 

# For login credentials
class Login(BaseModel):
    useremail: str
    password:str

# For JWT token
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
          