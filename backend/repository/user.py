from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException,status


# Create user
def create(request: schemas.User,db: Session):
    new_user = models.User(first_name=request.first_name, last_name=request.last_name, email=request.email, phone=request.phone, video_link="", brushing_status=False, gargaling_status=False, validation_status=True)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Get all users
def get_all(db: Session, ):
    users = db.query(models.User).all()
    return users

# Get individual user
def show(id:int,db:Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user

# Delete particular blog
def destroy(id:int,db: Session):
    blog = db.query(models.User).filter(models.User.id == id)

    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")

    blog.delete(synchronize_session=False)
    db.commit()
    return {"Deleted Successfully"}

# Update particular blog
def update(id:int,request:schemas.User, db:Session):
    blog =  db.query(models.User).filter(models.User.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"This user id {id} is not found")
    print(request)
    blog.update({'first_name':request.first_name, 'last_name':request.last_name, 'email':request.email, 'phone':request.phone, 'video_link':request.video_link, 'brushing_status':request.brushing_status, 'gargaling_status':request.gargaling_status, 'validation_status':request.validation_status})  

    db.commit()
    return {"updated Successfully"}

