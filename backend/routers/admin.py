import database, schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter,Depends
from repository import admin
from typing import List
router = APIRouter(
    prefix="/admin",
    tags=['Admins']
)

get_db = database.get_db

# Create Admin 
@router.post('/', response_model=schemas.ShowAdmin)
def create_admin(request: schemas.Admin,db: Session = Depends(get_db)):
    return admin.create(request,db)  

# Get individual admin
@router.get('/{id}',response_model=schemas.ShowAdmin)
def get_admin(id:int,db: Session = Depends(get_db)):
    return admin.show(id,db)

# Get all admins
@router.get('/',response_model=List[schemas.ShowAdmin])
def get_all_admin(db: Session = Depends(get_db)):
    return admin.showAll(db)

# Delete individula admin
@router.delete('/{id}')
def destroy_admin(id:int,db: Session = Depends(get_db)):
    return admin.deleteAdmin(id,db)