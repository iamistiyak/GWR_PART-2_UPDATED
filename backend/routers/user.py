from typing import List
from fastapi import APIRouter,Depends,status, UploadFile, File
from pymysql import Date
import schemas, database
from sqlalchemy.orm import Session
from repository import user
import shutil
from datetime import datetime 

router = APIRouter(
    prefix="/user",
    tags=['Users']
)


get_db = database.get_db

# Create User
@router.post('/', status_code=status.HTTP_201_CREATED,)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)

# Upload User recording
# @router.post('/rec', status_code=status.HTTP_201_CREATED,)
# async def uploadFile(file: UploadFile = File(...)):
    
#     with open(f'{file.filename}', "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     return {"file_name": file.filename}


@router.post('/rec', status_code=status.HTTP_201_CREATED,)
async def uploadFile(file: UploadFile = File(...)):
    file_name =  datetime.now().time()

    file_location = f"files/{file_name}"

    with open(file_location, "wb") as buffer:
      shutil.copyfileobj(file.file, buffer)
      return {"file_name": file.filename}

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

