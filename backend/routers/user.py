from typing import List
from fastapi import APIRouter,Depends,status
from oauth2 import get_current_user
import schemas, database
from sqlalchemy.orm import Session
from repository import user

router = APIRouter(
    prefix="/user",
    tags=['Users']
)


get_db = database.get_db

# Create User
@router.post('/', status_code=status.HTTP_201_CREATED,)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)
# current_user: schemas.Admin = Depends(get_current_user)

# get all users
@router.get('/',response_model=List[schemas.ShowUser])
def get_all_user(db: Session = Depends(get_db),):
    return user.get_all(db)

# get individual user
@router.get('/{id}', status_code=200)
def get_user(id:int, db: Session = Depends(get_db)):
    return user.show(id,db)


#Delete individual user  
@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy_user(id:int, db: Session = Depends(get_db)):
    return user.destroy(id,db)
      

# Update individual user 
@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update_user(id:int, request: schemas.User, db: Session = Depends(get_db)):
    return user.update(id,request, db)

