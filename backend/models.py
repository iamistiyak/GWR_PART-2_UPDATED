from xmlrpc.client import Boolean
from sqlalchemy import Column, Integer, String,Boolean
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(255))
    video_link = Column(String(255))
    brushing_status = Column(Boolean)
    gargaling_status = Column(Boolean)
    validation_status = Column(Boolean)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))