from sqlalchemy import Column, String
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String(36), primary_key=True, index=True)
    text = Column(String(255), nullable=False)
    status = Column(String(20), nullable=False)
    color = Column(String(20), nullable=False)